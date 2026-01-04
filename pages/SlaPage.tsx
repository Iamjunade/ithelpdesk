import React, { useEffect, useState } from 'react';
import { ticketService } from '../services/tickets';
import { useAuth } from '../services/auth';
import { SLA, TicketPriority } from '../types';
import { 
  Plus, 
  Clock, 
  Trash2, 
  Edit2, 
  Save, 
  X,
  Loader2,
  Shield
} from 'lucide-react';

export const SlaPage: React.FC = () => {
  const { tenant } = useAuth();
  const [slas, setSlas] = useState<SLA[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSla, setEditingSla] = useState<SLA | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    priority: 'medium' as TicketPriority,
    response_time_hours: 4,
    resolution_time_hours: 24
  });

  useEffect(() => {
    if (tenant) loadSlas();
  }, [tenant]);

  const loadSlas = async () => {
    if (!tenant) return;
    try {
      const data = await ticketService.getSlas(tenant.id);
      setSlas(data);
    } catch (error) {
      console.error('Error loading SLAs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!tenant) return;

    try {
      if (editingSla) {
        await ticketService.updateSla(editingSla.id, formData);
      } else {
        await ticketService.createSla({ ...formData, tenant_id: tenant.id });
      }
      setIsModalOpen(false);
      setEditingSla(null);
      setFormData({ name: '', priority: 'medium', response_time_hours: 4, resolution_time_hours: 24 });
      loadSlas();
    } catch (error) {
      console.error('Error saving SLA:', error);
    }
  };

  const handleEdit = (sla: SLA) => {
    setEditingSla(sla);
    setFormData({
      name: sla.name,
      priority: sla.priority,
      response_time_hours: sla.response_time_hours,
      resolution_time_hours: sla.resolution_time_hours
    });
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Service Level Agreements</h1>
          <p className="text-sm text-gray-500">Define response and resolution targets per priority</p>
        </div>
        <button
          onClick={() => {
            setEditingSla(null);
            setFormData({ name: '', priority: 'medium', response_time_hours: 4, resolution_time_hours: 24 });
            setIsModalOpen(true);
          }}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add SLA Policy
        </button>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        {loading ? (
          <div className="p-12 flex justify-center"><Loader2 className="animate-spin h-8 w-8 text-blue-600" /></div>
        ) : slas.length === 0 ? (
          <div className="p-12 text-center text-gray-500">No SLA policies defined yet.</div>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Policy Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Response Goal</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Resolution Goal</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {slas.map((sla) => (
                <tr key={sla.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{sla.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 uppercase">{sla.priority}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{sla.response_time_hours} hours</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{sla.resolution_time_hours} hours</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button onClick={() => handleEdit(sla)} className="text-blue-600 hover:text-blue-900 mr-4">
                      <Edit2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={() => setIsModalOpen(false)}></div>
            <div className="relative bg-white rounded-lg px-4 pt-5 pb-4 overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full sm:p-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">{editingSla ? 'Edit SLA Policy' : 'New SLA Policy'}</h3>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Policy Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Priority</label>
                  <select
                    value={formData.priority}
                    onChange={(e) => setFormData({ ...formData, priority: e.target.value as TicketPriority })}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 sm:text-sm"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Response (Hours)</label>
                    <input
                      type="number"
                      required
                      min="1"
                      value={formData.response_time_hours}
                      onChange={(e) => setFormData({ ...formData, response_time_hours: parseInt(e.target.value) })}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Resolution (Hours)</label>
                    <input
                      type="number"
                      required
                      min="1"
                      value={formData.resolution_time_hours}
                      onChange={(e) => setFormData({ ...formData, resolution_time_hours: parseInt(e.target.value) })}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 sm:text-sm"
                    />
                  </div>
                </div>
                <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3">
                  <button type="submit" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 sm:col-start-2 sm:text-sm">
                    {editingSla ? 'Update' : 'Create'}
                  </button>
                  <button type="button" onClick={() => setIsModalOpen(false)} className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 sm:mt-0 sm:col-start-1 sm:text-sm">
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
