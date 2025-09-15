// src/app/login/page.tsx
'use client';
import { createClient } from '@/lib/supabase/client';
import { useState } from 'react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const supabase = createClient();

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: { emailRedirectTo: `${location.origin}/auth/callback` },
      });
      if (error) throw error;
      setSubmitted(true);
    } catch (error) {
      alert('Error logging in. Please check the console for details.');
    }
  };

  if (submitted) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center p-4">
          <h1 className="text-2xl font-bold">Check your email!</h1>
          <p>We've sent a magic login link to {email}.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form onSubmit={handleLogin} className="p-8 border rounded-lg shadow-md w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-4">Buyer Lead App</h1>
        <p className="mb-4 text-gray-600">Enter your email for a magic link.</p>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
          <input
            id="email" type="email" value={email}
            onChange={(e) => setEmail(e.target.value)} required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700">
          Send Magic Link
        </button>
      </form>
    </div>
  );
}