const BASE_URL = process.env.NEXT_PUBLIC_IOT_API_URL || 'https://dev-iot.agrigate.network';

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

export async function fetchDeviceControls(deviceId: string): Promise<{
  deviceId: string;
  controls: DeviceControls;
}> {
  const res = await fetch(`${BASE_URL}/iot/control/${encodeURIComponent(deviceId)}`, {
    cache: 'no-store',
  });
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
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ deviceId, channel, state }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || 'Failed to set device control');
  }
  return res.json();
}
