import React, { useState } from 'react';
import { useAuth } from '../services/auth';
import { updateTenant } from '../services/firestore';
import { Palette, Save, Loader2 } from 'lucide-react';

export const BrandingPage: React.FC = () => {
  const { tenant, refreshProfile } = useAuth();
  const [primaryColor, setPrimaryColor] = useState(tenant?.primary_color || '#9213ec');
  const [secondaryColor, setSecondaryColor] = useState(tenant?.secondary_color || '#7a10c4');
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!tenant?.id) return;

    setSaving(true);
    setMessage(null);

    try {
      await updateTenant(tenant.id, {
        primary_color: primaryColor,
        secondary_color: secondaryColor,
      });

      await refreshProfile();
      setMessage({ type: 'success', text: 'Branding updated successfully!' });
    } catch (error: any) {
      setMessage({ type: 'error', text: error.message || 'Failed to update branding' });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-2xl">
        <div className="flex items-center gap-3 mb-6">
          <Palette className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Branding</h1>
            <p className="mt-1 text-sm text-gray-700 dark:text-gray-400">
              Customize your organization's color scheme
            </p>
          </div>
        </div>

        {message && (
          <div
            className={`mb-6 rounded-lg p-4 ${message.type === 'success'
                ? 'bg-green-50 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                : 'bg-red-50 text-red-800 dark:bg-red-900/20 dark:text-red-400'
              }`}
          >
            {message.text}
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-6">
          <div>
            <label htmlFor="primary_color" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Primary Color
            </label>
            <div className="mt-2 flex items-center gap-4">
              <input
                type="color"
                id="primary_color"
                value={primaryColor}
                onChange={(e) => setPrimaryColor(e.target.value)}
                className="h-12 w-24 rounded-lg border-2 border-gray-300 dark:border-gray-600 cursor-pointer"
              />
              <input
                type="text"
                value={primaryColor}
                onChange={(e) => setPrimaryColor(e.target.value)}
                className="block flex-1 rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                placeholder="#9213ec"
              />
            </div>
          </div>

          <div>
            <label htmlFor="secondary_color" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Secondary Color
            </label>
            <div className="mt-2 flex items-center gap-4">
              <input
                type="color"
                id="secondary_color"
                value={secondaryColor}
                onChange={(e) => setSecondaryColor(e.target.value)}
                className="h-12 w-24 rounded-lg border-2 border-gray-300 dark:border-gray-600 cursor-pointer"
              />
              <input
                type="text"
                value={secondaryColor}
                onChange={(e) => setSecondaryColor(e.target.value)}
                className="block flex-1 rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                placeholder="#7a10c4"
              />
            </div>
          </div>

          <div className="flex items-center gap-4 pt-4">
            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-hover disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </form>

        <div className="mt-8 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Preview</h3>
          <div className="flex gap-4">
            <div
              className="h-16 w-16 rounded-lg shadow-md"
              style={{ backgroundColor: primaryColor }}
            />
            <div
              className="h-16 w-16 rounded-lg shadow-md"
              style={{ backgroundColor: secondaryColor }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
