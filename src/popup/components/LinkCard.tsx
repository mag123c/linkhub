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
      <div className="p-3 bg-gray-50 rounded-lg border-2 border-primary-300">
        <div className="space-y-3">
          <input
            type="text"
            value={editTitle}
            onChange={e => setEditTitle(e.target.value)}
            className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary-500"
            autoFocus
          />
          <TagInput
            tags={editTags}
            onChange={setEditTags}
            suggestions={existingTags}
          />
          <div className="flex justify-end gap-2">
            <button
              onClick={handleCancel}
              className="p-1.5 text-gray-500 hover:text-gray-700 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
            <button
              onClick={handleSave}
              className="p-1.5 text-primary-600 hover:text-primary-700 transition-colors"
            >
              <Check className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-3 bg-gray-50 rounded-lg border border-gray-200 hover:border-primary-300 transition-colors group">
      <div className="flex items-start gap-3">
        {link.favicon && (
          <img src={link.favicon} alt="" className="w-4 h-4 mt-1 flex-shrink-0" />
        )}
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-medium text-gray-900 truncate">
            {link.title}
          </h3>
          <p className="text-xs text-gray-500 truncate">{link.url}</p>
          {link.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {link.tags.map(tag => (
                <button
                  key={tag}
                  onClick={() => onTagClick(tag)}
                  className="px-2 py-0.5 text-xs bg-primary-100 text-primary-700 rounded-full hover:bg-primary-200 transition-colors"
                >
                  {tag}
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => setIsEditing(true)}
            className="p-1 text-gray-400 hover:text-primary-600 transition-colors"
            title="Edit"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <a
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1 text-gray-400 hover:text-primary-600 transition-colors"
            title="Open"
          >
            <ExternalLink className="w-4 h-4" />
          </a>
          <button
            onClick={() => onDelete(link.id)}
            className="p-1 text-gray-400 hover:text-red-600 transition-colors"
            title="Delete"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
