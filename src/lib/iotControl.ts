const BASE_URL =
  process.env.NEXT_PUBLIC_IOT_API_URL ||
  (process.env.NODE_ENV === "development"
    ? "http://localhost:8004"
    : "https://dev-iot.agrigate.network");
const TOKEN_KEY = "iot_control_token";

export const CONTROL_CHANNELS = [
  'light1',
  'light2',
  'fan1',
  'fan2',
  'fan3',
] as const;

export type ControlChannel = (typeof CONTROL_CHANNELS)[number];

export type DeviceControls = Record<ControlChannel, boolean>;

export const CONTROL_LABELS: Record<ControlChannel, string> = {
  light1: 'Light 1',
  light2: 'Light 2',
  fan1: 'Fan 1',
  fan2: 'Fan 2',
  fan3: 'Fan 3',
};

export function getControlToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(TOKEN_KEY);
}

export function setControlToken(token: string) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function clearControlToken() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(TOKEN_KEY);
}

function authHeaders(extra?: HeadersInit): HeadersInit {
  const token = getControlToken();
  return {
    ...(extra || {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

export async function loginIoT(
  username: string,
  password: string,
): Promise<{ accessToken: string; username: string }> {
  const res = await fetch(`${BASE_URL}/iot/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || 'Invalid username or password');
  }
  const data = await res.json();
  setControlToken(data.accessToken);
  return data;
}

export async function logoutIoT() {
  const token = getControlToken();
  try {
    if (token) {
      await fetch(`${BASE_URL}/iot/auth/logout`, {
        method: 'POST',
        headers: authHeaders({ 'Content-Type': 'application/json' }),
      });
    }
  } finally {
    clearControlToken();
  }
}

export async function fetchDeviceControls(deviceId: string): Promise<{
  deviceId: string;
  controls: DeviceControls;
}> {
  const res = await fetch(`${BASE_URL}/iot/control/${encodeURIComponent(deviceId)}`, {
    cache: 'no-store',
    headers: authHeaders(),
  });
  if (res.status === 401) {
    clearControlToken();
    throw new Error('Login required');
  }
  if (!res.ok) {
    throw new Error('Failed to fetch device controls');
  }
  return res.json();
}

export async function setDeviceControl(
  deviceId: string,
  channel: ControlChannel,
  state: boolean,
): Promise<{
  status: string;
  deviceId: string;
  channel: ControlChannel;
  state: boolean;
  controls: DeviceControls;
}> {
  const res = await fetch(`${BASE_URL}/iot/control`, {
    method: 'POST',
    headers: authHeaders({ 'Content-Type': 'application/json' }),
    body: JSON.stringify({ deviceId, channel, state }),
  });
  if (res.status === 401) {
    clearControlToken();
    throw new Error('Login required');
  }
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || 'Failed to set device control');
  }
  return res.json();
}
