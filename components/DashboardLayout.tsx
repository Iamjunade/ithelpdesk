import React from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../services/auth';
import { 
  LayoutDashboard, 
  Ticket, 
  BookOpen, 
  Settings, 
  LogOut, 
  Users,
  ShieldCheck,
  Menu,
  X
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const DashboardLayout: React.FC = () => {
  const { profile, tenant, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
  };

  const navigation = [
    { name: 'Dashboard', href: '/', icon: LayoutDashboard, roles: ['platform_admin', 'company_admin', 'it_manager', 'support_agent', 'employee'] },
    { name: 'Tickets', href: '/tickets', icon: Ticket, roles: ['platform_admin', 'company_admin', 'it_manager', 'support_agent', 'employee'] },
    { name: 'Knowledge Base', href: '/kb', icon: BookOpen, roles: ['platform_admin', 'company_admin', 'it_manager', 'support_agent', 'employee'] },
    { name: 'Users', href: '/users', icon: Users, roles: ['platform_admin', 'company_admin', 'it_manager'] },
    { name: 'Branding', href: '/branding', icon: Settings, roles: ['platform_admin', 'company_admin'] },
    { name: 'Platform Admin', href: '/admin', icon: ShieldCheck, roles: ['platform_admin'] },
  ];

  const filteredNavigation = navigation.filter(item => 
    profile && item.roles.includes(profile.role_id)
  );

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar for desktop */}
      <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 bg-white border-r border-gray-200">
        <div className="flex flex-col flex-grow pt-5 pb-4 overflow-y-auto">
          <div className="flex items-center flex-shrink-0 px-4 mb-5">
            {tenant?.logo_url ? (
              <img className="h-8 w-auto" src={tenant.logo_url} alt={tenant.name} />
            ) : (
              <span className="text-xl font-bold text-gray-900">{tenant?.name || 'HelpDesk'}</span>
            )}
          </div>
          <nav className="mt-5 flex-1 px-2 space-y-1">
            {filteredNavigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  location.pathname === item.href
                    ? 'bg-gray-100 text-gray-900'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                  'group flex items-center px-2 py-2 text-sm font-medium rounded-md'
                )}
                style={location.pathname === item.href ? { borderLeft: `4px solid ${tenant?.primary_color || '#3b82f6'}` } : {}}
              >
                <item.icon
                  className={cn(
                    location.pathname === item.href ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-500',
                    'mr-3 flex-shrink-0 h-6 w-6'
                  )}
                  aria-hidden="true"
                />
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
          <div className="flex-shrink-0 w-full group block">
            <div className="flex items-center">
              <div>
                <img
                  className="inline-block h-9 w-9 rounded-full"
                  src={profile?.avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(profile?.full_name || '')}`}
                  alt=""
                />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                  {profile?.full_name}
                </p>
                <p className="text-xs font-medium text-gray-500 group-hover:text-gray-700 uppercase">
                  {profile?.role_id.replace('_', ' ')}
                </p>
              </div>
              <button 
                onClick={handleSignOut}
                className="ml-auto text-gray-400 hover:text-gray-600"
              >
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="md:pl-64 flex flex-col flex-1">
        <div className="sticky top-0 z-10 md:hidden pl-1 pt-1 sm:pl-3 sm:pt-3 bg-white border-b border-gray-200">
          <button
            type="button"
            className="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <Menu className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <main className="flex-1">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
