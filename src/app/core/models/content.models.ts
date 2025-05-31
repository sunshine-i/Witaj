export interface Section {
  id: string;
  slug: string;
  name_pl: string;
  name_en: string;
  color: string;
  color_soft: string;
  intro: string | null;
  sort_order: number;
}

export interface Phrase {
  id: string;
  section_id: string;
  polish: string;
  english: string;
  sort_order: number;
}

export interface Tip {
  id: string;
  section_id: string;
  content: string;
  sort_order: number;
}

export interface ContentLink {
  id: string;
  section_id: string;
  url: string;
  title: string;
  description: string;
  sort_order: number;
}

export interface EmergencyNumber {
  id: string;
  number: string;
  label: string;
  sort_order: number;
}

export interface SectionDetail extends Section {
  phrases: Phrase[];
  tips: Tip[];
  links: ContentLink[];
}

export interface PhraseWithSection extends Phrase {
  section: Section;
}
