'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    // Phase 3 placeholder auth: create a local session flag.
    try {
      if (!email.trim() || password.trim().length < 6) {
        setError('Enter a valid email and password (min 6 chars).');
        return;
      }

      if (typeof window !== 'undefined') {
        const raw = window.localStorage.getItem('truthlens_accounts');
        const accounts = raw ? (JSON.parse(raw) as Array<{ email: string }>) : [];

        const exists = accounts.some((a) => a.email.toLowerCase() === email.toLowerCase());
        const nextAccounts = exists ? accounts : [...accounts, { email }];
        window.localStorage.setItem('truthlens_accounts', JSON.stringify(nextAccounts));

        // Set cookie so middleware can protect dashboard routes.
        document.cookie = `scamshield_session=${encodeURIComponent(
          JSON.stringify({ email, at: Date.now() })
        )}; path=/; max-age=86400; SameSite=Lax`;
      }

      router.push('/dashboard');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto w-full max-w-md px-4 py-14 sm:px-6">
      <div className="rounded-3xl bg-white/5 p-6 ring-1 ring-white/10">
        <div className="mb-6">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1 ring-1 ring-white/10">
            <span className="h-2 w-2 rounded-full bg-purple-400" />
            <span className="text-xs font-medium text-purple-200">TruthLens</span>

            <span className="text-xs text-zinc-400">Create account</span>
          </div>
          <h1 className="mt-4 text-2xl font-semibold tracking-tight">Get started</h1>
          <p className="mt-2 text-sm text-zinc-400">Create an account to scan and save trust reports.</p>
        </div>

        {error ? <div className="mb-4 rounded-xl bg-red-500/10 p-3 text-sm text-red-200 ring-1 ring-red-500/20">{error}</div> : null}

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-medium text-zinc-300">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              autoComplete="email"
              className="mt-2 w-full rounded-xl bg-black/30 p-3 text-sm text-zinc-100 ring-1 ring-white/10 placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-pink-400/40"
              placeholder="you@company.com"
            />
          </div>

          <div>
            <label className="text-xs font-medium text-zinc-300">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              autoComplete="new-password"
              className="mt-2 w-full rounded-xl bg-black/30 p-3 text-sm text-zinc-100 ring-1 ring-white/10 placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-purple-400/40"
              placeholder="At least 6 characters"
            />
          </div>

          <button
            disabled={loading}
            className="w-full rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 px-4 py-3 text-sm font-semibold text-black shadow-[0_0_24px_rgba(236,72,153,0.25)] ring-1 ring-white/10 hover:opacity-95 disabled:opacity-60"
          >
            {loading ? 'Creating…' : 'Create account'}
          </button>

          <div className="text-center text-sm text-zinc-400">
            Already have an account?{' '}
            <Link className="text-purple-200 hover:underline" href="/auth/login">
              Sign in
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}

