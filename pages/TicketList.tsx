import React from 'react';
import { AlertCircle } from 'lucide-react';

// Temporary stub - Ticket system not yet migrated to Firebase
export const TicketList: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-96">
      <div className="text-center">
        <AlertCircle className="h-12 w-12 text-amber-500 mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          Ticket System Migration In Progress
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          The ticket list is being migrated to Firebase.
          <br />
          This functionality will be available soon.
        </p>
      </div>
    </div>
  );
};
