export interface Tab {
  id: string;
  title: string;
  content: TabContent[];
}

export interface TabContent {
  type: 'text' | 'link' | 'image' | 'whatsapp';
  value: string;
  label?: string;
  icon?: string;
}

export interface AnalyticsData {
  _id?: string;
  type: 'visit' | 'click';
  linkId?: string;
  country?: string;
  device: string;
  browser: string;
  ip: string;
  timestamp: Date;
}

export interface AdminSession {
  isLoggedIn: boolean;
  token?: string;
}
