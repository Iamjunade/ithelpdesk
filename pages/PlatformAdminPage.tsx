import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, where, getCountFromServer } from 'firebase/firestore';
import { db } from '../services/firestore';
import { Building2, Users, Ticket, TrendingUp, Loader2 } from 'lucide-react';

interface TenantStats {
  id: string;
  name: string;
  userCount: number;
  ticketCount: number;
  created_at: string;
}

export const PlatformAdminPage: React.FC = () => {
  const [tenants, setTenants] = useState<TenantStats[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTenants = async () => {
      try {
        const tenantsSnapshot = await getDocs(collection(db, 'tenants'));
        const tenantsData = await Promise.all(
          tenantsSnapshot.docs.map(async (doc) => {
            const tenantData = doc.data();

            // Get user count for this tenant
            const usersQuery = query(collection(db, 'users'), where('tenant_id', '==', doc.id));
            const usersCount = await getCountFromServer(usersQuery);

            // Get ticket count for this tenant
            const ticketsQuery = query(collection(db, 'tickets'), where('tenant_id', '==', doc.id));
            const ticketsCount = await getCountFromServer(ticketsQuery);

            return {
              id: doc.id,
              name: tenantData.name,
              userCount: usersCount.data().count,
              ticketCount: ticketsCount.data().count,
              created_at: tenantData.created_at?.toDate?.()?.toISOString() || new Date().toISOString(),
            };
          })
        );

        setTenants(tenantsData);
      } catch (error) {
        console.error('Error fetching tenants:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTenants();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
            <Building2 className="h-7 w-7 text-primary" />
            Platform Administration
          </h1>
          <p className="mt-2 text-sm text-gray-700 dark:text-gray-400">
            Overview of all tenants and platform statistics
          </p>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Building2 className="h-6 w-6 text-primary" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                    Total Tenants
                  </dt>
                  <dd className="text-lg font-semibold text-gray-900 dark:text-white">
                    {tenants.length}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Users className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                    Total Users
                  </dt>
                  <dd className="text-lg font-semibold text-gray-900 dark:text-white">
                    {tenants.reduce((sum, t) => sum + t.userCount, 0)}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Ticket className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                    Total Tickets
                  </dt>
                  <dd className="text-lg font-semibold text-gray-900 dark:text-white">
                    {tenants.reduce((sum, t) => sum + t.ticketCount, 0)}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Tenant Details</h2>
        <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            {tenants.map((tenant) => (
              <li key={tenant.id} className="px-6 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white truncate">
                      {tenant.name}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                      {tenant.userCount} users • {tenant.ticketCount} tickets
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
                      Active
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
