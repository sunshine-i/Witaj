import { Injectable, computed, inject, signal } from '@angular/core';
import { PhraseWithSection } from '../models/content.models';
import { ContentService } from './content.service';

function normalize(str: string): string {
  return str
    .toLowerCase()
    .replace(/ą/g, 'a')
    .replace(/ę/g, 'e')
    .replace(/ó/g, 'o')
    .replace(/ś/g, 's')
    .replace(/ł/g, 'l')
    .replace(/ź/g, 'z')
    .replace(/ż/g, 'z')
    .replace(/ć/g, 'c')
    .replace(/ń/g, 'n');
}

@Injectable({ providedIn: 'root' })
export class SearchService {
  private readonly content = inject(ContentService);

  readonly query = signal('');

  readonly results = computed<PhraseWithSection[]>(() => {
    const q = this.query().trim();
    if (!q) return [];
    const norm = normalize(q);
    return this.content.allPhrases().filter(
      p => normalize(p.polish).includes(norm) || normalize(p.english).includes(norm)
    );
  });
}
