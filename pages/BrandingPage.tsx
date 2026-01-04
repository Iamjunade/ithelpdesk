import React, { useState } from 'react';
import { useAuth } from '../services/auth';
import { supabase } from '../services/supabase';
import { Palette, Image, Save, Loader2, CheckCircle } from 'lucide-react';

export const BrandingPage: React.FC = () => {
  const { tenant, refreshProfile } = useAuth();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: tenant?.name || '',
    primary_color: tenant?.primary_color || '#3b82f6',
    secondary_color: tenant?.secondary_color || '#1e40af',
    logo_url: tenant?.logo_url || ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!tenant) return;

    setLoading(true);
    setSuccess(false);

    try {
      const { error } = await supabase
        .from('tenants')
        .update(formData)
        .eq('id', tenant.id);

      if (error) throw error;

      await refreshProfile();
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.error('Error updating branding:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Company Branding</h1>
        <p className="text-sm text-gray-500">Customize the look and feel of your helpdesk</p>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium flex items-center">
                <Palette className="h-5 w-5 mr-2 text-gray-400" />
                Theme Colors
              </h3>
              <div>
                <label className="block text-sm font-medium text-gray-700">Primary Color</label>
                <div className="mt-1 flex items-center space-x-3">
                  <input
                    type="color"
                    value={formData.primary_color}
                    onChange={(e) => setFormData({ ...formData, primary_color: e.target.value })}
                    className="h-10 w-20 border border-gray-300 rounded"
                  />
                  <input
                    type="text"
                    value={formData.primary_color}
                    onChange={(e) => setFormData({ ...formData, primary_color: e.target.value })}
                    className="flex-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 sm:text-sm"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Secondary Color</label>
                <div className="mt-1 flex items-center space-x-3">
                  <input
                    type="color"
                    value={formData.secondary_color}
                    onChange={(e) => setFormData({ ...formData, secondary_color: e.target.value })}
                    className="h-10 w-20 border border-gray-300 rounded"
                  />
                  <input
                    type="text"
                    value={formData.secondary_color}
                    onChange={(e) => setFormData({ ...formData, secondary_color: e.target.value })}
                    className="flex-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 sm:text-sm"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium flex items-center">
                <Image className="h-5 w-5 mr-2 text-gray-400" />
                Logo & Assets
              </h3>
              <div>
                <label className="block text-sm font-medium text-gray-700">Logo URL</label>
                <input
                  type="text"
                  placeholder="https://example.com/logo.png"
                  value={formData.logo_url}
                  onChange={(e) => setFormData({ ...formData, logo_url: e.target.value })}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 sm:text-sm"
                />
              </div>
              <div className="mt-4 p-4 border border-dashed border-gray-300 rounded-lg bg-gray-50 flex items-center justify-center">
                {formData.logo_url ? (
                  <img src={formData.logo_url} alt="Logo preview" className="h-12 object-contain" />
                ) : (
                  <span className="text-gray-400 text-sm">No logo provided</span>
                )}
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6 flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : success ? (
                <CheckCircle className="h-4 w-4 mr-2" />
              ) : (
                <Save className="h-4 w-4 mr-2" />
              )}
              {success ? 'Saved!' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>

      <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
        <div className="flex">
          <div className="ml-3">
            <p className="text-sm text-blue-700">
              Changes will be applied instantly to all users in your company.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
