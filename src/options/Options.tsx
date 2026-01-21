import { useState, useEffect } from 'react';
import { Settings } from '@/shared/types';
import { getSettings, updateSettings, exportData } from '@/shared/storage';
import { Download } from 'lucide-react';

export function Options() {
  const [settings, setSettings] = useState<Settings | null>(null);

  useEffect(() => {
    loadSettings();
  }, []);

  async function loadSettings() {
    const data = await getSettings();
    setSettings(data);
  }

  async function handleThemeChange(theme: Settings['theme']) {
    if (!settings) return;
    const updated = await updateSettings({ theme });
    setSettings(updated);
  }

  async function handleViewChange(defaultView: Settings['defaultView']) {
    if (!settings) return;
    const updated = await updateSettings({ defaultView });
    setSettings(updated);
  }

  async function handleExport() {
    const json = await exportData();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `linkhub-export-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  if (!settings) {
    return <div className="p-8">Loading...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-2xl font-bold text-primary-600 mb-8">LinkHub Settings</h1>

      <div className="space-y-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h2 className="text-lg font-semibold mb-4">Appearance</h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Theme
              </label>
              <select
                value={settings.theme}
                onChange={e => handleThemeChange(e.target.value as Settings['theme'])}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Default View
              </label>
              <select
                value={settings.defaultView}
                onChange={e => handleViewChange(e.target.value as Settings['defaultView'])}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="card">Card</option>
                <option value="list">List</option>
              </select>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h2 className="text-lg font-semibold mb-4">Data</h2>
          <button
            onClick={handleExport}
            className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors"
          >
            <Download className="w-4 h-4" />
            Export as JSON
          </button>
        </div>
      </div>
    </div>
  );
}
