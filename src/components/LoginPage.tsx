"use client";

import React, { useState } from "react";
import { Leaf, Loader2, Lock } from "lucide-react";
import { loginIoT } from "../lib/iotControl";

interface LoginPageProps {
  onSuccess: () => void;
}

export function LoginPage({ onSuccess }: LoginPageProps) {
  const [username, setUsername] = useState("superadmin");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await loginIoT(username.trim(), password);
      onSuccess();
    } catch (err: any) {
      setError(err?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f1410] px-4">
      <div
        className="absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% -20%, #3d5c2e 0%, transparent 55%), radial-gradient(ellipse 60% 40% at 100% 100%, #1a2e14 0%, transparent 50%)",
        }}
      />
      <div className="relative w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center h-14 w-14 rounded-2xl bg-[#7CFC00]/15 border border-[#7CFC00]/30 mb-4">
            <Leaf className="h-7 w-7 text-[#7CFC00]" />
          </div>
          <h1 className="text-3xl font-semibold tracking-tight text-white">
            Agrigate
          </h1>
          <p className="mt-2 text-sm text-zinc-400">
            Sign in to open the farm dashboard
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-zinc-700/80 bg-[#1a1f1a]/90 backdrop-blur px-6 py-7 shadow-2xl space-y-5"
        >
          <div className="flex items-center gap-2 text-[#7CFC00] text-sm font-medium">
            <Lock className="h-4 w-4" />
            Automation login
          </div>

          <div>
            <label className="block text-xs text-zinc-400 mb-1.5">
              Username
            </label>
            <input
              type="text"
              autoComplete="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full rounded-lg bg-zinc-900/80 border border-zinc-600 text-white px-3 py-2.5 text-sm outline-none focus:border-[#7CFC00]"
              placeholder="superadmin"
              required
            />
          </div>

          <div>
            <label className="block text-xs text-zinc-400 mb-1.5">
              Password
            </label>
            <input
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg bg-zinc-900/80 border border-zinc-600 text-white px-3 py-2.5 text-sm outline-none focus:border-[#7CFC00]"
              placeholder="Password"
              required
            />
          </div>

          {error && <p className="text-xs text-red-400">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-[#7CFC00] hover:bg-[#6de000] text-black font-semibold text-sm py-2.5 disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Signing in…
              </>
            ) : (
              "Login"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
