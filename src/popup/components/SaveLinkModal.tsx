import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { TagInput } from './TagInput';

interface TabInfo {
  url: string;
  title: string;
  favicon?: string;
}

interface SaveLinkModalProps {
  tab: TabInfo;
  existingTags: string[];
  onSave: (data: { url: string; title: string; favicon?: string; tags: string[] }) => void;
  onClose: () => void;
}

export function SaveLinkModal({ tab, existingTags, onSave, onClose }: SaveLinkModalProps) {
  const [title, setTitle] = useState(tab.title);
  const [tags, setTags] = useState<string[]>([]);

  useEffect(() => {
    function handleEscape(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSave({
      url: tab.url,
      title: title.trim() || tab.title,
      favicon: tab.favicon,
      tags,
    });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink-900/40 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-sm mx-4 bg-white rounded-xl shadow-lifted animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-ink-100">
          <h2 className="font-serif text-lg font-semibold text-ink-900">Save Link</h2>
          <button
            onClick={onClose}
            className="p-1.5 text-ink-400 hover:text-ink-600 hover:bg-ink-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          {/* Title */}
          <div>
            <label className="block text-xs font-medium text-ink-500 uppercase tracking-wide mb-1.5">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="w-full px-3 py-2.5 text-sm border border-ink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-400/40 focus:border-accent-500 transition-all"
            />
          </div>

          {/* URL */}
          <div>
            <label className="block text-xs font-medium text-ink-500 uppercase tracking-wide mb-1.5">
              URL
            </label>
            <p className="text-sm text-ink-600 truncate px-3 py-2.5 bg-ink-50 rounded-lg border border-ink-100">
              {tab.url.replace(/^https?:\/\/(www\.)?/, '')}
            </p>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-xs font-medium text-ink-500 uppercase tracking-wide mb-1.5">
              Tags
            </label>
            <TagInput
              tags={tags}
              onChange={setTags}
              suggestions={existingTags}
              placeholder="Enter to add tag"
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2.5 text-sm font-medium text-ink-600 bg-ink-100 rounded-lg hover:bg-ink-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2.5 text-sm font-medium text-white bg-ink-900 rounded-lg hover:bg-ink-800 transition-colors shadow-soft"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
