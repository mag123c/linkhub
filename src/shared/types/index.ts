export interface Link {
  id: string;
  url: string;
  title: string;
  favicon?: string;
  tags: string[];
  memo?: string;
  isReadLater?: boolean;
  createdAt: number;
  updatedAt: number;
}

export interface Settings {
  theme: 'light' | 'dark';
  defaultView: 'card' | 'list';
}

export interface LinkHubData {
  links: Link[];
  tags: string[];
  settings: Settings;
}

export const DEFAULT_SETTINGS: Settings = {
  theme: 'light',
  defaultView: 'card',
};

export const DEFAULT_DATA: LinkHubData = {
  links: [],
  tags: [],
  settings: DEFAULT_SETTINGS,
};
