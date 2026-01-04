import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../services/supabase';
import { Zap, Mail, Loader2, Eye, EyeOff } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error: loginError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (loginError) {
      setError(loginError.message);
      setLoading(false);
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <div className="flex min-h-screen w-full font-display">
      {/* Left Side - Hero Section */}
      <div className="relative hidden w-0 flex-1 lg:block">
        <div
          className="absolute inset-0 h-full w-full bg-cover bg-center"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=2000&q=80")'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-purple-900/80 to-primary-hover/90 mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-black/10 backdrop-brightness-100"></div>
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'4\' height=\'4\'%3E%3Crect width=\'4\' height=\'4\' fill=\'%23fff\' fill-opacity=\'0.05\'/%3E%3C/svg%3E")'
            }}
          ></div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-16 text-white z-10 flex flex-col justify-end h-full bg-gradient-to-t from-black/60 via-transparent to-transparent">
          <blockquote className="max-w-2xl relative">
            <div className="w-12 h-1 bg-gradient-to-r from-primary to-purple-400 mb-6 rounded-full"></div>
            <p className="text-3xl font-medium leading-tight tracking-tight text-white/95 drop-shadow-sm">
              "Welcome back to your{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-200 to-indigo-200 font-bold">
                enterprise support hub
              </span>
              ."
            </p>
            <footer className="mt-6 text-sm font-medium text-white/80">
              Sign in to continue managing your IT support
            </footer>
          </blockquote>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-32 bg-white dark:bg-background-dark w-full lg:w-[48%] xl:w-[45%] relative overflow-y-auto max-h-screen shadow-2xl shadow-black/10 z-20">
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-primary via-purple-500 to-primary-hover lg:hidden"></div>

        <div className="mx-auto w-full max-w-sm lg:w-[28rem] py-8">
          {/* Header */}
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left gap-6 mb-10">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary to-purple-500 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative h-16 w-16 rounded-2xl bg-white dark:bg-surface-dark flex items-center justify-center shadow-sm border border-slate-100 dark:border-white/10">
                <Zap className="h-8 w-8 text-primary" />
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-bold leading-9 tracking-tight text-slate-900 dark:text-white">
                Sign in to HelpDesk Pro
              </h2>
              <p className="mt-2 text-base leading-6 text-slate-500 dark:text-slate-400">
                Enter your credentials to access your dashboard
              </p>
            </div>
          </div>

          {/* Form */}
          <div>
            <form onSubmit={handleLogin} className="space-y-6">
              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-semibold leading-6 text-slate-700 dark:text-slate-300 ml-1">
                  Email Address
                </label>
                <div className="mt-2 relative">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@company.com"
                    className="block w-full rounded-xl border-0 py-3.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-200 dark:ring-white/10 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-primary dark:bg-white/5 dark:text-white sm:text-sm sm:leading-6 pl-4 pr-10 transition-all duration-200 hover:ring-slate-300 dark:hover:ring-white/20 bg-slate-50/30"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-slate-400">
                    <Mail className="h-5 w-5" />
                  </div>
                </div>
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className="block text-sm font-semibold leading-6 text-slate-700 dark:text-slate-300 ml-1">
                  Password
                </label>
                <div className="mt-2 relative rounded-xl shadow-sm">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="block w-full rounded-xl border-0 py-3.5 pr-10 text-slate-900 ring-1 ring-inset ring-slate-200 dark:ring-white/10 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-primary dark:bg-white/5 dark:text-white sm:text-sm sm:leading-6 pl-4 transition-all duration-200 hover:ring-slate-300 dark:hover:ring-white/20 bg-slate-50/30"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-600 dark:text-gray-500 hover:text-primary transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="rounded-xl bg-red-50 dark:bg-red-900/20 p-3 text-sm text-red-600 dark:text-red-400">
                  {error}
                </div>
              )}

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="group relative flex w-full justify-center rounded-xl bg-gradient-to-r from-primary to-purple-500 px-3 py-3.5 text-sm font-bold leading-6 text-white shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:from-primary-hover hover:to-purple-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin mr-2" />
                      Signing in...
                    </>
                  ) : (
                    'Sign In'
                  )}
                </button>
              </div>
            </form>

            {/* Divider */}
            <div className="relative mt-10">
              <div aria-hidden="true" className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200 dark:border-white/10"></div>
              </div>
              <div className="relative flex justify-center text-sm font-medium leading-6">
                <span className="bg-white dark:bg-background-dark px-4 text-slate-500 dark:text-slate-400">
                  New to HelpDesk Pro?
                </span>
              </div>
            </div>

            {/* Register Link */}
            <div className="mt-6 text-center">
              <Link
                to="/register"
                className="text-sm font-semibold text-primary hover:text-primary-hover transition-colors"
              >
                Register your organization →
              </Link>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-12 border-t border-slate-100 dark:border-white/5 pt-6 text-center lg:text-left">
            <p className="text-xs leading-5 text-slate-400 dark:text-slate-500">
              © {new Date().getFullYear()} HelpDesk Pro. Secure Enterprise Systems.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
