"use client";

import { useActionState } from 'react';
import { loginAdmin, type AdminActionState } from '@/app/actions/admin';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Lock, Shield } from 'lucide-react';

const initialState: AdminActionState = { success: false, message: '' };

export default function AdminLoginPage() {
  const [state, formAction, pending] = useActionState(loginAdmin, initialState);

  return (
    <div className="min-h-screen flex items-center justify-center bg-silver-50 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-4">
            <Shield className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-2xl font-black text-silver-900">Brolytics Admin</h1>
          <p className="text-silver-500 mt-2">Sign in to manage website content</p>
        </div>

        <form action={formAction} className="bg-white rounded-2xl border border-silver-200 p-8 shadow-sm space-y-6">
          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm font-semibold text-silver-700">
              Admin Password
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-silver-400" />
              <Input
                id="password"
                name="password"
                type="password"
                required
                placeholder="Enter admin password"
                className="pl-10 h-12 rounded-xl"
              />
            </div>
          </div>

          {state.message && !state.success && (
            <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-4 py-3">
              {state.message}
            </p>
          )}

          <Button
            type="submit"
            disabled={pending}
            className="w-full h-12 bg-primary hover:bg-primary text-white font-bold rounded-xl"
          >
            {pending ? 'Signing in...' : 'Sign In'}
          </Button>
        </form>
      </div>
    </div>
  );
}
