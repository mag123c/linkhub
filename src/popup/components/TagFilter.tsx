import { Hash } from 'lucide-react';

interface TagFilterProps {
  tags: string[];
  selectedTag: string | null;
  onSelect: (tag: string | null) => void;
}

export function TagFilter({ tags, selectedTag, onSelect }: TagFilterProps) {
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
        <button
          key={tag}
          onClick={() => onSelect(selectedTag === tag ? null : tag)}
          className={`px-2.5 py-1 text-xs font-medium rounded-full whitespace-nowrap transition-all ${
            selectedTag === tag
              ? 'bg-accent-500 text-white shadow-soft'
              : 'bg-ink-100 text-ink-500 hover:bg-ink-200 hover:text-ink-600'
          }`}
        >
          {tag}
        </button>
      ))}
    </div>
  );
}
