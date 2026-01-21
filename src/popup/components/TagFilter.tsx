import { Tag } from 'lucide-react';

interface TagFilterProps {
  tags: string[];
  selectedTag: string | null;
  onSelect: (tag: string | null) => void;
}

export function TagFilter({ tags, selectedTag, onSelect }: TagFilterProps) {
  if (tags.length === 0) return null;

  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
      <Tag className="w-4 h-4 text-gray-400 flex-shrink-0" />
      <button
        onClick={() => onSelect(null)}
        className={`px-2.5 py-1 text-xs font-medium rounded-full whitespace-nowrap transition-colors ${
          selectedTag === null
            ? 'bg-primary-600 text-white'
            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
        }`}
      >
        All
      </button>
      {tags.map(tag => (
        <button
          key={tag}
          onClick={() => onSelect(selectedTag === tag ? null : tag)}
          className={`px-2.5 py-1 text-xs font-medium rounded-full whitespace-nowrap transition-colors ${
            selectedTag === tag
              ? 'bg-primary-600 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          {tag}
        </button>
      ))}
    </div>
  );
}
