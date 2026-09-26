export type Language = 'fr' | 'ar';

export type PageId =
  | 'accueil'
  | 'particuliers'
  | 'professionnels'
  | 'douane'
  | 'sinda'
  | 'eservices'
  | 'news'
  | 'douanetv'
  | 'contact'
  | 'support';

export type NavSubItem = {
  title: { fr: string; ar: string };
  desc?: { fr: string; ar: string };
  page: PageId;
  subpage?: string;
  action?: string;
  badge?: { fr: string; ar: string };
};

export type NavItem = {
  id: PageId;
  label: { fr: string; ar: string };
  hasDropdown?: boolean;
  sections?: {
    category: { fr: string; ar: string };
    items: NavSubItem[];
  }[];
  children?: NavSubItem[];
};

export type FeatureService = {
  id: string;
  title: { fr: string; ar: string };
  description: { fr: string; ar: string };
  iconName: string;
  tag?: { fr: string; ar: string };
  actionType: 'modal_taxation' | 'modal_wadh3iati' | 'modal_tarif' | 'modal_dac' | 'modal_devise' | 'page';
  pageTarget?: PageId;
  subpageTarget?: string;
};

export type StatItem = {
  number: string;
  numberAr: string;
  label: { fr: string; ar: string };
  sublabel?: { fr: string; ar: string };
};

export type NewsArticle = {
  id: string;
  title: { fr: string; ar: string };
  category: { fr: string; ar: string };
  date: string;
  dateAr: string;
  excerpt: { fr: string; ar: string };
  content: { fr: string; ar: string };
  imageUrl: string;
  commentsCount: number;
};

export type VideoItem = {
  id: string;
  title: { fr: string; ar: string };
  date: string;
  duration?: string;
  thumbnailUrl: string;
  embedUrl: string;
};

export type EServiceItem = {
  id: string;
  name: { fr: string; ar: string };
  desc: { fr: string; ar: string };
  audience: 'particulier' | 'entreprise';
  badge?: { fr: string; ar: string };
  action: string;
  page?: PageId;
  subpage?: string;
};
