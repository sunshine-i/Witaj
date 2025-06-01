import { Component, computed, inject, signal } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { ContentService } from '../../core/services/content.service';
import { SpeechService } from '../../core/services/speech.service';
import { Phrase } from '../../core/models/content.models';

function copyText(text: string): Promise<void> {
  if (navigator.clipboard) {
    return navigator.clipboard.writeText(text);
  }
  const ta = document.createElement('textarea');
  ta.value = text;
  ta.style.position = 'fixed';
  ta.style.opacity = '0';
  document.body.appendChild(ta);
  ta.focus();
  ta.select();
  document.execCommand('copy');
  document.body.removeChild(ta);
  return Promise.resolve();
}

@Component({
  selector: 'app-section-detail',
  templateUrl: './section-detail.component.html',
  styleUrl: './section-detail.component.scss',
  imports: [],
})
export class SectionDetailComponent {
  protected readonly content = inject(ContentService);
  protected readonly speech = inject(SpeechService);
  private readonly location = inject(Location);
  private readonly route = inject(ActivatedRoute);

  private readonly slug = toSignal(
    this.route.paramMap.pipe(map(p => p.get('slug') ?? '')),
    { initialValue: '' }
  );

  protected readonly section = computed(() =>
    this.content.sectionBySlug(this.slug())
  );

  protected readonly copiedIds = signal(new Set<string>());

  protected goBack(): void {
    this.location.back();
  }

  protected async copyPhrase(phrase: Phrase): Promise<void> {
    try {
      await copyText(phrase.polish);
    } catch {
      return;
    }
    this.copiedIds.update(set => new Set([...set, phrase.id]));
    setTimeout(() => {
      this.copiedIds.update(set => {
        const next = new Set(set);
        next.delete(phrase.id);
        return next;
      });
    }, 1500);
  }

  protected speak(phrase: Phrase): void {
    this.speech.speak(phrase.polish);
  }
}
