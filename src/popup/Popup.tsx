import { useState, useEffect } from 'react';
import { Link } from '@/shared/types';
import { getLinks, addLink, updateLink, deleteLink, getTags, searchLinks } from '@/shared/storage';
import { Plus, Search } from 'lucide-react';
import { TagFilter, LinkCard, SaveLinkModal } from './components';

interface CurrentTab {
  url: string;
  title: string;
  favicon?: string;
}

export function Popup() {
  const [links, setLinks] = useState<Link[]>([]);
  const [allTags, setAllTags] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [currentTab, setCurrentTab] = useState<CurrentTab | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    setIsLoading(true);
    const [linksData, tagsData] = await Promise.all([getLinks(), getTags()]);
    setLinks(linksData);
    setAllTags(tagsData);
    setIsLoading(false);
  }

  async function handleSearch(query: string) {
    setSearchQuery(query);
    setSelectedTag(null);
    if (query.trim()) {
      const results = await searchLinks(query);
      setLinks(results);
    } else {
      const data = await getLinks();
      setLinks(data);
    }
  }

  function handleTagFilter(tag: string | null) {
    setSelectedTag(tag);
    setSearchQuery('');
  }

  async function handleOpenSaveModal() {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (tab.url && tab.title) {
      setCurrentTab({
        url: tab.url,
        title: tab.title,
        favicon: tab.favIconUrl,
      });
      setShowSaveModal(true);
    }
  }

  async function handleSaveLink(data: { url: string; title: string; favicon?: string; tags: string[] }) {
    await addLink(data);
    setShowSaveModal(false);
    setCurrentTab(null);
    await loadData();
  }

  async function handleUpdateLink(id: string, updates: { title?: string; tags?: string[] }) {
    await updateLink(id, updates);
    await loadData();
  }

  async function handleDeleteLink(id: string) {
    await deleteLink(id);
    await loadData();
  }

  function handleTagClick(tag: string) {
    setSelectedTag(tag);
    setSearchQuery('');
  }

  const filteredLinks = selectedTag
    ? links.filter(link => link.tags.includes(selectedTag))
    : links;

  return (
    <div className="flex flex-col h-full bg-white">
      <header className="p-4 border-b border-gray-200 space-y-3">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-primary-600">LinkHub</h1>
          <button
            onClick={handleOpenSaveModal}
            className="flex items-center gap-1 px-3 py-1.5 bg-primary-600 text-white text-sm font-medium rounded-lg hover:bg-primary-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Save
          </button>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search links..."
            value={searchQuery}
            onChange={e => handleSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>

        <TagFilter
          tags={allTags}
          selectedTag={selectedTag}
          onSelect={handleTagFilter}
        />
      </header>

      <main className="flex-1 overflow-y-auto p-4">
        {isLoading ? (
          <div className="flex items-center justify-center h-32">
            <div className="text-gray-500">Loading...</div>
          </div>
        ) : filteredLinks.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-32 text-gray-500">
            {links.length === 0 ? (
              <>
                <p>No links saved yet</p>
                <p className="text-sm">Click "Save" to add the current page</p>
              </>
            ) : (
              <p>No links match your filter</p>
            )}
          </div>
        ) : (
          <div className="space-y-3">
            {filteredLinks.map(link => (
              <LinkCard
                key={link.id}
                link={link}
                existingTags={allTags}
                onUpdate={handleUpdateLink}
                onDelete={handleDeleteLink}
                onTagClick={handleTagClick}
              />
            ))}
          </div>
        )}
      </main>

      {showSaveModal && currentTab && (
        <SaveLinkModal
          tab={currentTab}
          existingTags={allTags}
          onSave={handleSaveLink}
          onClose={() => {
            setShowSaveModal(false);
            setCurrentTab(null);
          }}
        />
      )}
    </div>
  );
}
