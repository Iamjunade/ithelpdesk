import React, { useEffect, useState } from 'react';
import { supabase } from '../services/supabase';
import { Tenant } from '../types';
import { 
  Building2, 
  Users, 
  Ticket, 
  Settings, 
  Activity, 
  Loader2,
  ExternalLink,
  ShieldAlert
} from 'lucide-react';

export const PlatformAdminPage: React.FC = () => {
  const [tenants, setTenants] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalTenants: 0,
    totalUsers: 0,
    totalTickets: 0
  });

  useEffect(() => {
    loadPlatformData();
  }, []);

  const loadPlatformData = async () => {
    try {
      // Fetch all tenants
      const { data: tenantData } = await supabase.from('tenants').select('*');
      
      // For each tenant, fetch user and ticket counts
      // (In a production app, we'd use a more efficient query or a materialized view)
      const enrichedTenants = await Promise.all((tenantData || []).map(async (t) => {
        const { count: userCount } = await supabase.from('profiles').select('*', { count: 'exact', head: true }).eq('tenant_id', t.id);
        const { count: ticketCount } = await supabase.from('tickets').select('*', { count: 'exact', head: true }).eq('tenant_id', t.id);
        return { ...t, userCount, ticketCount };
      }));

      setTenants(enrichedTenants);
      
      setStats({
        totalTenants: enrichedTenants.length,
        totalUsers: enrichedTenants.reduce((acc, t) => acc + (t.userCount || 0), 0),
        totalTickets: enrichedTenants.reduce((acc, t) => acc + (t.ticketCount || 0), 0)
      });
    } catch (error) {
      console.error('Error loading platform data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Platform Super Admin</h1>
        <p className="text-sm text-gray-500">Global overview and multi-tenant management</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 font-medium">Total Companies</p>
              <h3 className="text-2xl font-bold text-gray-900">{stats.totalTenants}</h3>
            </div>
            <Building2 className="h-8 w-8 text-blue-100" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 font-medium">Total Users</p>
              <h3 className="text-2xl font-bold text-gray-900">{stats.totalUsers}</h3>
            </div>
            <Users className="h-8 w-8 text-green-100" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow border-l-4 border-purple-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 font-medium">Total Tickets</p>
              <h3 className="text-2xl font-bold text-gray-900">{stats.totalTickets}</h3>
            </div>
            <Ticket className="h-8 w-8 text-purple-100" />
          </div>
        </div>
      </div>

      {/* Tenant List */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-lg font-medium text-gray-900">Active Tenants</h2>
          <button className="text-sm text-blue-600 font-medium hover:text-blue-500">Onboard New Company</button>
        </div>

        {loading ? (
          <div className="p-12 flex justify-center"><Loader2 className="animate-spin h-8 w-8 text-blue-600" /></div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subdomain</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Users</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tickets</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {tenants.map((t) => (
                  <tr key={t.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-8 w-8 rounded bg-gray-100 flex items-center justify-center mr-3">
                          {t.logo_url ? <img src={t.logo_url} className="h-6 w-6 object-contain" /> : <Building2 className="h-4 w-4 text-gray-400" />}
                        </div>
                        <div className="text-sm font-medium text-gray-900">{t.name}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {t.subdomain || 'Not set'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {t.userCount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {t.ticketCount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">Active</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-gray-400 hover:text-blue-600 mr-4">
                        <ExternalLink className="h-4 w-4" />
                      </button>
                      <button className="text-gray-400 hover:text-red-600">
                        <ShieldAlert className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
        <div className="flex items-center space-x-3 text-gray-600">
          <Activity className="h-5 w-5" />
          <h3 className="font-medium">System Health: All systems operational</h3>
        </div>
      </div>
    </div>
  );
};
