import { Injectable, computed, inject, signal } from '@angular/core';
import {
  ContentLink,
  EmergencyNumber,
  Phrase,
  PhraseWithSection,
  Section,
  SectionDetail,
  Tip,
} from '../models/content.models';
import { SupabaseService } from './supabase.service';

@Injectable({ providedIn: 'root' })
export class ContentService {
  private readonly supabase = inject(SupabaseService);

  readonly sections = signal<Section[]>([]);
  readonly emergencyNumbers = signal<EmergencyNumber[]>([]);

  private readonly _phrases = signal<Phrase[]>([]);
  private readonly _tips = signal<Tip[]>([]);
  private readonly _links = signal<ContentLink[]>([]);

  private loaded = false;

  readonly allPhrases = computed<PhraseWithSection[]>(() => {
    const sectionMap = new Map(this.sections().map(s => [s.id, s]));
    return this._phrases()
      .map(p => ({ ...p, section: sectionMap.get(p.section_id)! }))
      .filter(p => p.section != null);
  });

  async loadAll(): Promise<void> {
    if (this.loaded) return;

    const [sections, phrases, tips, links, emergencyNumbers] = await Promise.all([
      this.supabase.client.from('sections').select('*').order('sort_order'),
      this.supabase.client.from('phrases').select('*').order('sort_order'),
      this.supabase.client.from('tips').select('*').order('sort_order'),
      this.supabase.client.from('links').select('*').order('sort_order'),
      this.supabase.client.from('emergency_numbers').select('*').order('sort_order'),
    ]);

    this.sections.set(sections.data ?? []);
    this._phrases.set(phrases.data ?? []);
    this._tips.set(tips.data ?? []);
    this._links.set(links.data ?? []);
    this.emergencyNumbers.set(emergencyNumbers.data ?? []);
    this.loaded = true;
  }

  sectionBySlug(slug: string): SectionDetail | undefined {
    const section = this.sections().find(s => s.slug === slug);
    if (!section) return undefined;
    return {
      ...section,
      phrases: this._phrases().filter(p => p.section_id === section.id),
      tips: this._tips().filter(t => t.section_id === section.id),
      links: this._links().filter(l => l.section_id === section.id),
    };
  }
}
