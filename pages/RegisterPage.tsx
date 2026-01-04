import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../services/supabase';
import { Building2, Eye, EyeOff, Loader2 } from 'lucide-react';

export const RegisterPage: React.FC = () => {
  const [companyName, setCompanyName] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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
      // 1. Create Tenant
      const { data: tenantData, error: tenantError } = await supabase
        .from('tenants')
        .insert([{
          name: companyName,
          primary_color: '#137fec',
          secondary_color: '#0f5bb5'
        }])
        .select()
        .single();

      if (tenantError) throw tenantError;

      // 2. Sign up User
      const { error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            tenant_id: tenantData.id,
            full_name: fullName,
            role_id: 'company_admin',
            phone: phone || null
          }
        }
      });

      if (signUpError) throw signUpError;

      navigate('/login', { state: { message: 'Registration successful! Please check your email for verification.' } });
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full">
      {/* Left Side - Image */}
      <div className="relative hidden w-0 flex-1 lg:block">
        <div
          className="absolute inset-0 h-full w-full bg-cover bg-center"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=2000&q=80")'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-background-dark/80 to-primary/20 mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-[#111418]/10 backdrop-brightness-95"></div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-12 text-white z-10">
          <blockquote className="max-w-xl">
            <p className="text-xl font-medium leading-relaxed">
              "Scalable, secure, and ready for your enterprise growth."
            </p>
            <footer className="mt-4 text-sm font-medium text-white/80">
              Start your journey today
            </footer>
          </blockquote>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24 bg-white dark:bg-background-dark w-full lg:w-[45%] xl:w-[40%] relative overflow-y-auto max-h-screen">
        <div className="absolute top-0 left-0 w-full h-2 bg-primary lg:hidden"></div>

        <div className="mx-auto w-full max-w-sm lg:w-96 py-8">
          {/* Header */}
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left gap-6 mb-8">
            <div className="h-16 w-16 rounded-xl bg-primary/10 flex items-center justify-center shadow-sm border border-primary/20">
              <Building2 className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl font-bold leading-9 tracking-tight text-[#111418] dark:text-white">
                Register your Organization
              </h2>
              <p className="mt-2 text-sm leading-6 text-[#617589] dark:text-gray-400">
                Create a new tenant account to get started
              </p>
            </div>
          </div>

          {/* Form */}
          <div>
            <form onSubmit={handleRegister} className="space-y-5">
              {/* Company Name */}
              <div>
                <label htmlFor="company_name" className="block text-sm font-medium leading-6 text-[#111418] dark:text-gray-200">
                  Company Name
                </label>
                <div className="mt-2">
                  <input
                    id="company_name"
                    name="company_name"
                    type="text"
                    autoComplete="organization"
                    required
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="Acme Inc."
                    className="block w-full rounded-lg border-0 py-2.5 text-[#111418] shadow-sm ring-1 ring-inset ring-[#dbe0e6] dark:ring-gray-700 placeholder:text-[#617589] dark:placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-primary dark:bg-[#1a2632] dark:text-white sm:text-sm sm:leading-6 pl-3"
                  />
                </div>
              </div>

              {/* Admin Name */}
              <div>
                <label htmlFor="full_name" className="block text-sm font-medium leading-6 text-[#111418] dark:text-gray-200">
                  Administrator Name
                </label>
                <div className="mt-2">
                  <input
                    id="full_name"
                    name="full_name"
                    type="text"
                    autoComplete="name"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="John Doe"
                    className="block w-full rounded-lg border-0 py-2.5 text-[#111418] shadow-sm ring-1 ring-inset ring-[#dbe0e6] dark:ring-gray-700 placeholder:text-[#617589] dark:placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-primary dark:bg-[#1a2632] dark:text-white sm:text-sm sm:leading-6 pl-3"
                  />
                </div>
              </div>

              {/* Administrator Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-[#111418] dark:text-gray-200">
                  Administrator Email
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@company.com"
                    className="block w-full rounded-lg border-0 py-2.5 text-[#111418] shadow-sm ring-1 ring-inset ring-[#dbe0e6] dark:ring-gray-700 placeholder:text-[#617589] dark:placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-primary dark:bg-[#1a2632] dark:text-white sm:text-sm sm:leading-6 pl-3"
                  />
                </div>
              </div>

              {/* Contact Phone */}
              <div>
                <label htmlFor="phone" className="block text-sm font-medium leading-6 text-[#111418] dark:text-gray-200">
                  Contact Phone Number
                </label>
                <div className="mt-2">
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 (555) 000-0000"
                    className="block w-full rounded-lg border-0 py-2.5 text-[#111418] shadow-sm ring-1 ring-inset ring-[#dbe0e6] dark:ring-gray-700 placeholder:text-[#617589] dark:placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-primary dark:bg-[#1a2632] dark:text-white sm:text-sm sm:leading-6 pl-3"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-[#111418] dark:text-gray-200">
                  Password
                </label>
                <div className="mt-2 relative rounded-lg shadow-sm">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Create a strong password"
                    className="block w-full rounded-lg border-0 py-2.5 pr-10 text-[#111418] ring-1 ring-inset ring-[#dbe0e6] dark:ring-gray-700 placeholder:text-[#617589] dark:placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-primary dark:bg-[#1a2632] dark:text-white sm:text-sm sm:leading-6 pl-3"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-[#617589] dark:text-gray-500 hover:text-primary transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label htmlFor="password_confirmation" className="block text-sm font-medium leading-6 text-[#111418] dark:text-gray-200">
                  Confirm Password
                </label>
                <div className="mt-2 relative rounded-lg shadow-sm">
                  <input
                    id="password_confirmation"
                    name="password_confirmation"
                    type={showConfirmPassword ? "text" : "password"}
                    autoComplete="new-password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Repeat your password"
                    className="block w-full rounded-lg border-0 py-2.5 pr-10 text-[#111418] ring-1 ring-inset ring-[#dbe0e6] dark:ring-gray-700 placeholder:text-[#617589] dark:placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-primary dark:bg-[#1a2632] dark:text-white sm:text-sm sm:leading-6 pl-3"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-[#617589] dark:text-gray-500 hover:text-primary transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              {/* Terms Checkbox */}
              <div className="flex items-start">
                <div className="flex h-6 items-center">
                  <input
                    id="terms"
                    name="terms"
                    type="checkbox"
                    checked={acceptTerms}
                    onChange={(e) => setAcceptTerms(e.target.checked)}
                    className="h-4 w-4 rounded border-[#dbe0e6] dark:border-gray-700 text-primary focus:ring-primary dark:bg-[#1a2632]"
                  />
                </div>
                <div className="ml-3 text-sm leading-6">
                  <label htmlFor="terms" className="font-medium text-[#111418] dark:text-gray-200">
                    I agree to the{' '}
                    <a href="#" className="text-primary hover:text-primary/80">
                      Terms of Service
                    </a>{' '}
                    and{' '}
                    <a href="#" className="text-primary hover:text-primary/80">
                      Privacy Policy
                    </a>
                    .
                  </label>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="rounded-lg bg-red-50 dark:bg-red-900/20 p-3 text-sm text-red-600 dark:text-red-400">
                  {error}
                </div>
              )}

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex w-full justify-center rounded-lg bg-primary px-3 py-3 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin mr-2" />
                      Creating Account...
                    </>
                  ) : (
                    'Create Tenant Account'
                  )}
                </button>
              </div>
            </form>

            {/* Divider */}
            <div className="relative mt-8">
              <div aria-hidden="true" className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#dbe0e6] dark:border-gray-800"></div>
              </div>
              <div className="relative flex justify-center text-sm font-medium leading-6">
                <span className="bg-white dark:bg-background-dark px-4 text-[#617589] dark:text-gray-500">
                  Already registered?
                </span>
              </div>
            </div>

            {/* Sign In Link */}
            <div className="mt-6 text-center">
              <Link
                to="/login"
                className="text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
              >
                Sign in to your account
              </Link>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-10 text-center lg:text-left">
            <p className="text-xs leading-5 text-[#617589] dark:text-gray-500">
              © {new Date().getFullYear()} IT Helpdesk. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
