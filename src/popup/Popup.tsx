import { useState, useEffect } from 'react';
import { Link } from '@/shared/types';
import { getLinks, addLink, updateLink, deleteLink, getTags, deleteTag, searchLinks } from '@/shared/storage';
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

  async function handleDeleteTag(tag: string) {
    await deleteTag(tag);
    setSelectedTag(null);
    await loadData();
  }

  const filteredLinks = selectedTag
    ? links.filter(link => link.tags.includes(selectedTag))
    : links;

  return (
    <div className="flex flex-col h-full bg-ink-50">
      {/* Header */}
      <header className="px-5 pt-5 pb-4 border-b border-ink-200/60">
        <div className="flex items-center justify-between mb-4">
          <h1 className="font-serif text-2xl font-semibold text-ink-900 tracking-tight">
            LinkHub
          </h1>
          <button
            onClick={handleOpenSaveModal}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-ink-900 text-ink-50 text-sm font-medium rounded-full hover:bg-ink-800 transition-colors shadow-soft"
          >
            <Plus className="w-4 h-4" strokeWidth={2.5} />
            <span>Save</span>
          </button>
        </div>

        {/* Search */}
        <div className="relative mb-3">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-400" />
          <input
            type="text"
            placeholder="Search links..."
            value={searchQuery}
            onChange={e => handleSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 text-sm bg-white border border-ink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-400/40 focus:border-accent-500 transition-all placeholder:text-ink-400"
          />
        </div>

        {/* Tags */}
        <TagFilter
          tags={allTags}
          selectedTag={selectedTag}
          onSelect={handleTagFilter}
          onDelete={handleDeleteTag}
        />
      </header>

      {/* Content */}
      <main className="flex-1 overflow-y-auto px-5 py-4">
        {isLoading ? (
          <div className="flex items-center justify-center h-32">
            <p className="text-ink-400 text-sm">Loading...</p>
          </div>
        ) : filteredLinks.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-40 text-center">
            {links.length === 0 ? (
              <>
                <p className="text-ink-600 font-medium mb-1">No links yet</p>
                <p className="text-ink-400 text-sm">Click "Save" to add the current page</p>
              </>
            ) : (
              <p className="text-ink-500 text-sm">No links match your search</p>
            )}
          </div>
        ) : (
          <div className="space-y-2">
            {filteredLinks.map((link, index) => (
              <div
                key={link.id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 30}ms` }}
              >
                <LinkCard
                  link={link}
                  existingTags={allTags}
                  onUpdate={handleUpdateLink}
                  onDelete={handleDeleteLink}
                  onTagClick={handleTagClick}
                />
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="px-5 py-3 border-t border-ink-200/60">
        <p className="text-2xs text-ink-400 text-center">
          {links.length} link{links.length !== 1 ? 's' : ''} saved
        </p>
      </footer>

      {/* Modal */}
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
