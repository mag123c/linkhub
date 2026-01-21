import { Link, LinkHubData, Settings, DEFAULT_DATA } from '../types';
import { generateId } from '../utils/id';

const STORAGE_KEY = 'linkhub_data';

export async function getData(): Promise<LinkHubData> {
  const result = await chrome.storage.local.get(STORAGE_KEY);
  return result[STORAGE_KEY] ?? DEFAULT_DATA;
}

export async function setData(data: LinkHubData): Promise<void> {
  await chrome.storage.local.set({ [STORAGE_KEY]: data });
}

export async function getLinks(): Promise<Link[]> {
  const data = await getData();
  return data.links;
}

export async function addLink(link: Omit<Link, 'id' | 'createdAt' | 'updatedAt'>): Promise<Link> {
  const data = await getData();
  const now = Date.now();

  const newLink: Link = {
    ...link,
    id: generateId(),
    createdAt: now,
    updatedAt: now,
  };

  data.links.unshift(newLink);

  link.tags.forEach(tag => {
    if (!data.tags.includes(tag)) {
      data.tags.push(tag);
    }
  });

  await setData(data);
  return newLink;
}

export async function updateLink(id: string, updates: Partial<Omit<Link, 'id' | 'createdAt'>>): Promise<Link | null> {
  const data = await getData();
  const index = data.links.findIndex(link => link.id === id);

  if (index === -1) return null;

  const updatedLink: Link = {
    ...data.links[index],
    ...updates,
    updatedAt: Date.now(),
  };

  data.links[index] = updatedLink;

  if (updates.tags) {
    updates.tags.forEach(tag => {
      if (!data.tags.includes(tag)) {
        data.tags.push(tag);
      }
    });
  }

  await setData(data);
  return updatedLink;
}

export async function deleteLink(id: string): Promise<boolean> {
  const data = await getData();
  const index = data.links.findIndex(link => link.id === id);

  if (index === -1) return false;

  data.links.splice(index, 1);
  await setData(data);
  return true;
}

export async function getTags(): Promise<string[]> {
  const data = await getData();
  return data.tags;
}

export async function getSettings(): Promise<Settings> {
  const data = await getData();
  return data.settings;
}

export async function updateSettings(updates: Partial<Settings>): Promise<Settings> {
  const data = await getData();
  data.settings = { ...data.settings, ...updates };
  await setData(data);
  return data.settings;
}

export async function searchLinks(query: string): Promise<Link[]> {
  const data = await getData();
  const lowerQuery = query.toLowerCase();

  return data.links.filter(link =>
    link.title.toLowerCase().includes(lowerQuery) ||
    link.url.toLowerCase().includes(lowerQuery) ||
    link.tags.some(tag => tag.toLowerCase().includes(lowerQuery)) ||
    (link.memo?.toLowerCase().includes(lowerQuery) ?? false)
  );
}

export async function exportData(): Promise<string> {
  const data = await getData();
  return JSON.stringify(data, null, 2);
}
