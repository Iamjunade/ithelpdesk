import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './services/auth';
import { ProtectedRoute } from './components/ProtectedRoute';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { DashboardLayout } from './components/DashboardLayout';
import { TicketList } from './pages/TicketList';
import { TicketDetails } from './pages/TicketDetails';
import { BrandingPage } from './pages/BrandingPage';
import { SlaPage } from './pages/SlaPage';
import { KbPage } from './pages/KbPage';
import { UsersPage } from './pages/UsersPage';
import { PlatformAdminPage } from './pages/PlatformAdminPage';

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          
          <Route path="/" element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }>
            <Route index element={<Navigate to="/tickets" replace />} />
            <Route path="tickets" element={<TicketList />} />
            <Route path="tickets/:id" element={<TicketDetails />} />
            <Route path="kb" element={<KbPage />} />
            <Route path="users" element={
              <ProtectedRoute allowedRoles={['platform_admin', 'company_admin', 'it_manager']}>
                <UsersPage />
              </ProtectedRoute>
            } />
            <Route path="slas" element={
              <ProtectedRoute allowedRoles={['platform_admin', 'company_admin', 'it_manager']}>
                <SlaPage />
              </ProtectedRoute>
            } />
            <Route path="branding" element={
              <ProtectedRoute allowedRoles={['platform_admin', 'company_admin']}>
                <BrandingPage />
              </ProtectedRoute>
            } />
            <Route path="admin" element={
              <ProtectedRoute allowedRoles={['platform_admin']}>
                <PlatformAdminPage />
              </ProtectedRoute>
            } />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
