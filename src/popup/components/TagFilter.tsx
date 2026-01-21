import { Hash, X } from 'lucide-react';

interface TagFilterProps {
  tags: string[];
  selectedTag: string | null;
  onSelect: (tag: string | null) => void;
  onDelete?: (tag: string) => void;
}

export function TagFilter({ tags, selectedTag, onSelect, onDelete }: TagFilterProps) {
  if (tags.length === 0) return null;

  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
      <Hash className="w-3.5 h-3.5 text-ink-300 flex-shrink-0" />
      <button
        onClick={() => onSelect(null)}
        className={`px-2.5 py-1 text-xs font-medium rounded-full whitespace-nowrap transition-all ${
          selectedTag === null
            ? 'bg-ink-800 text-ink-50 shadow-soft'
            : 'bg-ink-100 text-ink-500 hover:bg-ink-200 hover:text-ink-600'
        }`}
      >
        All
      </button>
      {tags.map(tag => (
        <div key={tag} className="relative group flex-shrink-0">
          <button
            onClick={() => onSelect(selectedTag === tag ? null : tag)}
            className={`px-2.5 py-1 text-xs font-medium rounded-full whitespace-nowrap transition-all ${
              selectedTag === tag
                ? 'bg-accent-500 text-white shadow-soft pr-7'
                : 'bg-ink-100 text-ink-500 hover:bg-ink-200 hover:text-ink-600'
            }`}
          >
            {tag}
          </button>
          {selectedTag === tag && onDelete && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete(tag);
              }}
              className="absolute right-1.5 top-1/2 -translate-y-1/2 p-0.5 text-white/70 hover:text-white transition-colors"
              title="Delete tag"
            >
              <X className="w-3 h-3" />
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
