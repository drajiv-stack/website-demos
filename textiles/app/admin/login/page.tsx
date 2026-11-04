'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { createBrowserSupabase } from '@/lib/supabase/browser';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  useEffect(() => {
    document.title = 'Sign in | NoolWeave Admin';
    if (new URLSearchParams(window.location.search).get('error') === 'not-admin') {
      setError('This account is not on the admin list.');
    }
  }, []);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setPending(true);
    setError(null);
    const supabase = createBrowserSupabase();
    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
    setPending(false);
    if (signInError) {
      setError('Email or password is incorrect.');
      return;
    }
    router.push('/admin/products');
    router.refresh();
  }

  return (
    <div className="linen-weave-surface flex min-h-[80vh] items-center justify-center px-4 py-16">
      <div className="w-full max-w-md rounded-sm border border-stone/60 bg-alabaster p-8 shadow-md">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo">
          NoolWeave Exports · Catalogue admin
        </p>
        <h1 className="mt-2 font-display text-4xl font-normal text-ink">Sign in</h1>
        <p className="mt-2 text-sm text-stone-dark">
          Edit bilingual product content. Changes publish to the static site instantly.
        </p>
        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <div>
            <label htmlFor="admin-email" className="block text-xs font-semibold uppercase tracking-wider">
              Email
            </label>
            <input
              id="admin-email"
              type="email"
              required
              autoComplete="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1.5 w-full rounded-xs border border-stone/80 bg-linen px-3.5 py-2.5 text-sm focus:border-indigo"
            />
          </div>
          <div>
            <label htmlFor="admin-password" className="block text-xs font-semibold uppercase tracking-wider">
              Password
            </label>
            <input
              id="admin-password"
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1.5 w-full rounded-xs border border-stone/80 bg-linen px-3.5 py-2.5 text-sm focus:border-indigo"
            />
          </div>
          {error && (
            <p role="alert" className="rounded-xs border border-red-700/40 bg-red-50 px-3 py-2 text-xs font-semibold text-red-900">
              {error}
            </p>
          )}
          <button
            type="submit"
            disabled={pending}
            className="w-full rounded-full bg-indigo py-3 text-xs font-semibold uppercase tracking-[0.16em] text-alabaster hover:bg-indigo-hover disabled:opacity-60"
          >
            {pending ? 'Signing in…' : 'Sign in'}
          </button>
        </form>
      </div>
    </div>
  );
}
