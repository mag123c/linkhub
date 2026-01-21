import { useState } from 'react';
import { ExternalLink, Trash2, Edit2, Check, X } from 'lucide-react';
import { Link } from '@/shared/types';
import { TagInput } from './TagInput';

interface LinkCardProps {
  link: Link;
  existingTags: string[];
  onUpdate: (id: string, updates: { title?: string; tags?: string[] }) => void;
  onDelete: (id: string) => void;
  onTagClick: (tag: string) => void;
}

export function LinkCard({ link, existingTags, onUpdate, onDelete, onTagClick }: LinkCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(link.title);
  const [editTags, setEditTags] = useState(link.tags);

  function handleSave() {
    onUpdate(link.id, {
      title: editTitle.trim() || link.title,
      tags: editTags,
    });
    setIsEditing(false);
  }

  function handleCancel() {
    setEditTitle(link.title);
    setEditTags(link.tags);
    setIsEditing(false);
  }

  if (isEditing) {
    return (
      <div className="p-4 bg-white rounded-lg border-2 border-accent-400 shadow-soft">
        <div className="space-y-3">
          <input
            type="text"
            value={editTitle}
            onChange={e => setEditTitle(e.target.value)}
            className="w-full px-3 py-2 text-sm border border-ink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-400/40 focus:border-accent-500"
            autoFocus
          />
          <TagInput
            tags={editTags}
            onChange={setEditTags}
            suggestions={existingTags}
          />
          <div className="flex justify-end gap-2 pt-1">
            <button
              onClick={handleCancel}
              className="p-2 text-ink-400 hover:text-ink-600 hover:bg-ink-100 rounded-lg transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
            <button
              onClick={handleSave}
              className="p-2 text-accent-600 hover:text-accent-700 hover:bg-accent-50 rounded-lg transition-colors"
            >
              <Check className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="group p-4 bg-white rounded-lg border border-ink-200/80 hover:border-ink-300 hover:shadow-soft transition-all">
      <div className="flex items-start gap-3">
        {/* Favicon */}
        {link.favicon ? (
          <img
            src={link.favicon}
            alt=""
            className="w-5 h-5 mt-0.5 flex-shrink-0 rounded"
          />
        ) : (
          <div className="w-5 h-5 mt-0.5 flex-shrink-0 rounded bg-ink-100" />
        )}

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-medium text-ink-800 leading-snug line-clamp-2">
            {link.title}
          </h3>
          <p className="mt-1 text-xs text-ink-400 truncate">
            {link.url.replace(/^https?:\/\/(www\.)?/, '')}
          </p>

          {/* Tags */}
          {link.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-2.5">
              {link.tags.map(tag => (
                <button
                  key={tag}
                  onClick={() => onTagClick(tag)}
                  className="px-2 py-0.5 text-2xs font-medium bg-ink-100 text-ink-600 rounded-full hover:bg-accent-100 hover:text-accent-700 transition-colors"
                >
                  {tag}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => setIsEditing(true)}
            className="p-1.5 text-ink-300 hover:text-ink-600 hover:bg-ink-100 rounded-md transition-colors"
            title="Edit"
          >
            <Edit2 className="w-3.5 h-3.5" />
          </button>
          <a
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 text-ink-300 hover:text-ink-600 hover:bg-ink-100 rounded-md transition-colors"
            title="Open"
          >
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
          <button
            onClick={() => onDelete(link.id)}
            className="p-1.5 text-ink-300 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors"
            title="Delete"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
