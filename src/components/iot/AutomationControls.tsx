"use client";

import React, { useCallback, useEffect, useState } from "react";
import { Clock, Loader2, RefreshCw, Wifi, WifiOff } from "lucide-react";
import {
  CONTROL_CHANNELS,
  CONTROL_LABELS,
  ControlChannel,
  DeviceControls,
  clearControlToken,
  fetchDeviceControls,
  getControlToken,
  setDeviceControl,
} from "../../lib/iotControl";

const DEFAULT_CONTROLS: DeviceControls = {
  light1: false,
  light2: false,
  fan1: false,
  fan2: false,
  fan3: false,
};

interface AutomationControlsProps {
  deviceId: string;
  onSessionExpired?: () => void;
}

function formatLastReported(iso?: string | null) {
  if (!iso) return "—";
  const diff = Date.now() - new Date(iso).getTime();
  if (diff < 15_000) return "Just now";
  if (diff < 60_000) return `${Math.floor(diff / 1000)}s ago`;
  if (diff < 3_600_000) return `${Math.floor(diff / 60_000)}m ago`;
  return new Date(iso).toLocaleTimeString();
}

export function AutomationControls({
  deviceId,
  onSessionExpired,
}: AutomationControlsProps) {
  const [controls, setControls] = useState<DeviceControls>(DEFAULT_CONTROLS);
  const [loading, setLoading] = useState(true);
  const [online, setOnline] = useState(false);
  const [lastReported, setLastReported] = useState<string | null>(null);
  const [pending, setPending] = useState<Partial<Record<ControlChannel, boolean>>>(
    {},
  );
  const [error, setError] = useState<string | null>(null);

  const expireSession = useCallback(() => {
    clearControlToken();
    onSessionExpired?.();
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event("iot-auth-expired"));
    }
  }, [onSessionExpired]);

  const load = useCallback(async () => {
    if (!getControlToken()) {
      setLoading(false);
      expireSession();
      return;
    }
    try {
      setError(null);
      const result = await fetchDeviceControls(deviceId);
      setControls({ ...DEFAULT_CONTROLS, ...result.controls });
      setOnline(true);
      setLastReported(new Date().toISOString());
    } catch (e: any) {
      if (e.message === "Login required") {
        expireSession();
      } else {
        setOnline(false);
        setError(e.message || "Failed to load controls");
      }
    } finally {
      setLoading(false);
    }
  }, [deviceId, expireSession]);

  useEffect(() => {
    load();
    const interval = setInterval(load, 15_000);
    return () => clearInterval(interval);
  }, [load]);

  const toggle = async (channel: ControlChannel, next: boolean) => {
    const prev = controls[channel];
    setControls((c) => ({ ...c, [channel]: next }));
    setPending((p) => ({ ...p, [channel]: true }));
    setError(null);

    try {
      const result = await setDeviceControl(deviceId, channel, next);
      setControls({ ...DEFAULT_CONTROLS, ...result.controls });
      setOnline(true);
      setLastReported(new Date().toISOString());
    } catch (e: any) {
      setControls((c) => ({ ...c, [channel]: prev }));
      if (e.message === "Login required") {
        expireSession();
      } else {
        setError(e.message || "Failed to toggle control");
      }
    } finally {
      setPending((p) => {
        const copy = { ...p };
        delete copy[channel];
        return copy;
      });
    }
  };

  return (
    <div className="rounded-xl overflow-hidden border border-zinc-700 shadow-lg">
      <div className="bg-[#7CFC00] px-4 py-3 text-black">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold leading-tight">Automation</h2>
            <div className="mt-1 flex flex-wrap items-center gap-3 text-xs font-medium">
              <span className="inline-flex items-center gap-1.5">
                {online ? (
                  <Wifi className="h-3.5 w-3.5" />
                ) : (
                  <WifiOff className="h-3.5 w-3.5" />
                )}
                {online ? "Online" : "Offline"}
              </span>
              <span className="inline-flex items-center gap-1.5 opacity-80">
                <Clock className="h-3.5 w-3.5" />
                Last reported: {formatLastReported(lastReported)}
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={load}
            className="rounded-lg bg-black/10 hover:bg-black/20 p-2 transition-colors"
            title="Refresh"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
          </button>
        </div>
        <p className="mt-1 text-[11px] font-mono opacity-70">{deviceId}</p>
      </div>

      <div className="bg-[#2a2a2a] px-4 py-5">
        {loading && !lastReported ? (
          <div className="flex items-center justify-center py-10 text-zinc-400 text-sm gap-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            Loading controls…
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-x-8 gap-y-8 max-w-md mx-auto">
            {CONTROL_CHANNELS.map((channel) => {
              const on = !!controls[channel];
              const busy = !!pending[channel];
              return (
                <div key={channel} className="flex flex-col items-center gap-3">
                  <button
                    type="button"
                    disabled={busy}
                    aria-pressed={on}
                    aria-label={`${CONTROL_LABELS[channel]} ${on ? "on" : "off"}`}
                    onClick={() => toggle(channel, !on)}
                    className={`
                      relative h-8 w-[4.5rem] rounded-full transition-colors duration-200
                      disabled:opacity-60
                      ${on ? "bg-zinc-900" : "bg-zinc-800"}
                    `}
                  >
                    <span
                      className={`
                        absolute top-1 h-6 w-6 rounded-full shadow transition-all duration-200
                        ${on ? "left-1 bg-[#7CFC00]" : "left-[calc(100%-1.75rem)] bg-zinc-500"}
                      `}
                    />
                    {busy && (
                      <Loader2 className="absolute inset-0 m-auto h-3.5 w-3.5 animate-spin text-white/70" />
                    )}
                  </button>
                  <span className="text-white text-base font-medium tracking-wide">
                    {CONTROL_LABELS[channel]}
                  </span>
                </div>
              );
            })}
          </div>
        )}

        {error && (
          <p className="mt-4 text-center text-xs text-red-400">{error}</p>
        )}
      </div>
    </div>
  );
}
