import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../services/firebase';
import { createTenant, createUserProfile } from '../services/firestore';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../services/firebase';
import { Building2, Mail, Loader2, ArrowRight, ChevronRight, Shield } from 'lucide-react';

export const RegisterPage: React.FC = () => {
  const [companyName, setCompanyName] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (password !== confirmPassword) {
      setError("Passwords don't match");
      setLoading(false);
      return;
    }

    if (!acceptTerms) {
      setError("Please accept the Terms of Service and Privacy Policy");
      setLoading(false);
      return;
    }

    try {
      // 1. Create Firebase Auth User FIRST (so we're authenticated for Firestore writes)
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // 2. Create Tenant in Firestore (now user is authenticated)
      const tenantData = await createTenant({
        name: companyName,
        primary_color: '#9213ec',
        secondary_color: '#7a10c4'
      });

      // 3. Create User Profile in Firestore
      await setDoc(doc(db, 'users', user.uid), {
        tenant_id: tenantData.id,
        full_name: fullName,
        email: email,
        role_id: 'company_admin',
        phone: phone || null,
        created_at: new Date().toISOString()
      });

      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Failed to register');
    } finally {
      setLoading(false);
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
              "Empower your organization with a platform built for{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-200 to-indigo-200 font-bold">
                scale, security, and velocity
              </span>
              ."
            </p>
            <footer className="mt-6 flex items-center gap-4">
              <div className="h-10 w-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/10">
                <Shield className="text-white h-5 w-5" />
              </div>
              <div className="text-sm font-medium text-white/80">
                <div className="text-white font-semibold">Enterprise Grade Security</div>
                <div className="text-xs text-white/60">SOC2 Type II Certified</div>
              </div>
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
              <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative h-16 w-16 rounded-2xl bg-white dark:bg-surface-dark flex items-center justify-center shadow-sm border border-slate-100 dark:border-white/10">
                <Building2 className="h-8 w-8 text-primary" />
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-bold leading-9 tracking-tight text-slate-900 dark:text-white">
                Register Organization
              </h2>
              <p className="mt-2 text-base leading-6 text-slate-500 dark:text-slate-400">
                Create a premium tenant account to begin.
              </p>
            </div>
          </div>

          {/* Form */}
          <div>
            <form onSubmit={handleRegister} className="space-y-6">
              {/* Company Name */}
              <div className="group">
                <label htmlFor="company_name" className="block text-sm font-semibold leading-6 text-slate-700 dark:text-slate-300 ml-1">
                  Company Name
                </label>
                <div className="mt-2 relative">
                  <input
                    id="company_name"
                    name="company_name"
                    type="text"
                    autoComplete="organization"
                    required
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="e.g. Acme Industries"
                    className="block w-full rounded-xl border-0 py-3.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-200 dark:ring-white/10 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-primary dark:bg-white/5 dark:text-white sm:text-sm sm:leading-6 pl-4 transition-all duration-200 ease-in-out hover:ring-slate-300 dark:hover:ring-white/20 bg-slate-50/30"
                  />
                </div>
              </div>

              {/* Admin Name */}
              <div>
                <label htmlFor="full_name" className="block text-sm font-semibold leading-6 text-slate-700 dark:text-slate-300 ml-1">
                  Administrator Name
                </label>
                <div className="mt-2 relative">
                  <input
                    id="full_name"
                    name="full_name"
                    type="text"
                    autoComplete="name"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="John Doe"
                    className="block w-full rounded-xl border-0 py-3.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-200 dark:ring-white/10 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-primary dark:bg-white/5 dark:text-white sm:text-sm sm:leading-6 pl-4 transition-all duration-200 hover:ring-slate-300 dark:hover:ring-white/20 bg-slate-50/30"
                  />
                </div>
              </div>

              {/* Administrator Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-semibold leading-6 text-slate-700 dark:text-slate-300 ml-1">
                  Administrator Email
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

              {/* Contact Phone */}
              <div>
                <label htmlFor="phone" className="block text-sm font-semibold leading-6 text-slate-700 dark:text-slate-300 ml-1">
                  Contact Phone
                </label>
                <div className="mt-2 relative">
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 (555) 000-0000"
                    className="block w-full rounded-xl border-0 py-3.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-200 dark:ring-white/10 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-primary dark:bg-white/5 dark:text-white sm:text-sm sm:leading-6 pl-4 transition-all duration-200 hover:ring-slate-300 dark:hover:ring-white/20 bg-slate-50/30"
                  />
                </div>
              </div>

              {/* Password Grid */}
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="password" className="block text-sm font-semibold leading-6 text-slate-700 dark:text-slate-300 ml-1">
                    Password
                  </label>
                  <div className="mt-2 relative rounded-xl shadow-sm">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="new-password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="block w-full rounded-xl border-0 py-3.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-200 dark:ring-white/10 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-primary dark:bg-white/5 dark:text-white sm:text-sm sm:leading-6 pl-4 transition-all duration-200 hover:ring-slate-300 dark:hover:ring-white/20 bg-slate-50/30"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="password_confirmation" className="block text-sm font-semibold leading-6 text-slate-700 dark:text-slate-300 ml-1">
                    Confirm
                  </label>
                  <div className="mt-2 relative rounded-xl shadow-sm">
                    <input
                      id="password_confirmation"
                      name="password_confirmation"
                      type="password"
                      autoComplete="new-password"
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="••••••••"
                      className="block w-full rounded-xl border-0 py-3.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-200 dark:ring-white/10 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-primary dark:bg-white/5 dark:text-white sm:text-sm sm:leading-6 pl-4 transition-all duration-200 hover:ring-slate-300 dark:hover:ring-white/20 bg-slate-50/30"
                    />
                  </div>
                </div>
              </div>

              {/* Terms Checkbox */}
              <div className="flex items-start pt-2">
                <div className="flex h-6 items-center">
                  <input
                    id="terms"
                    name="terms"
                    type="checkbox"
                    checked={acceptTerms}
                    onChange={(e) => setAcceptTerms(e.target.checked)}
                    className="h-4 w-4 rounded border-slate-300 dark:border-slate-600 text-primary focus:ring-primary dark:bg-white/10 cursor-pointer"
                  />
                </div>
                <div className="ml-3 text-sm leading-6">
                  <label htmlFor="terms" className="font-medium text-slate-600 dark:text-slate-400">
                    I agree to the{' '}
                    <a href="#" className="font-semibold text-primary hover:text-primary-dark underline decoration-2 decoration-primary/30 underline-offset-2 transition-colors">
                      Terms
                    </a>{' '}
                    and{' '}
                    <a href="#" className="font-semibold text-primary hover:text-primary-dark underline decoration-2 decoration-primary/30 underline-offset-2 transition-colors">
                      Privacy Policy
                    </a>
                    .
                  </label>
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
                  className="group relative flex w-full justify-center rounded-xl bg-gradient-to-r from-primary to-secondary px-3 py-3.5 text-sm font-bold leading-6 text-white shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:from-primary-dark hover:to-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin mr-2" />
                      Creating Account...
                    </>
                  ) : (
                    <>
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <ArrowRight className="h-5 w-5 text-white/90" />
                      </span>
                      Create Tenant Account
                    </>
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
                  Already have an account?
                </span>
              </div>
            </div>

            {/* Sign In Link */}
            <div className="mt-6 text-center">
              <Link
                to="/login"
                className="group inline-flex items-center text-sm font-semibold text-primary hover:text-secondary transition-colors"
              >
                Sign in to your dashboard
                <ChevronRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
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
