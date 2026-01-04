import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../services/auth';
import { Loader2 } from 'lucide-react';
import { RoleId } from '../types';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: RoleId[];
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
  const { user, profile, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && profile && !allowedRoles.includes(profile.role_id)) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};
