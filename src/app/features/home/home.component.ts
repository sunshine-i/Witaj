import { Component, computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ContentService } from '../../core/services/content.service';
import { SearchService } from '../../core/services/search.service';
import { SectionIconComponent } from '../../shared/section-icon/section-icon.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  imports: [SectionIconComponent],
})
export class HomeComponent {
  protected readonly content = inject(ContentService);
  protected readonly search = inject(SearchService);
  private readonly router = inject(Router);

  protected showAbout = false;

  protected readonly phraseCounts = computed(() => {
    const counts = new Map<string, number>();
    for (const p of this.content.allPhrases()) {
      counts.set(p.section_id, (counts.get(p.section_id) ?? 0) + 1);
    }
    return counts;
  });

  protected navigate(slug: string): void {
    this.router.navigate(['/section', slug]);
  }

  protected onSearchInput(event: Event): void {
    this.search.query.set((event.target as HTMLInputElement).value);
  }
}
