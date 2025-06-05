import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SpeechService {
  readonly supported = signal(
    typeof window !== 'undefined' && 'speechSynthesis' in window
  );

  // Held as a class property so Chrome's GC doesn't destroy it before it plays.
  private utterance: SpeechSynthesisUtterance | null = null;

  speak(text: string, onEnd?: () => void): void {
    if (!this.supported()) return;
    const synth = window.speechSynthesis;
    synth.cancel();

    this.utterance = new SpeechSynthesisUtterance(text);
    this.utterance.lang = 'pl-PL';
    this.utterance.rate = 0.85;
    this.utterance.onend   = () => onEnd?.();
    this.utterance.onerror = () => onEnd?.();

    // Chrome bug: cancel() leaves the synth in a stuck state when followed
    // by speak() in the same tick. The 100ms gap lets cancel settle.
    const u = this.utterance;
    setTimeout(() => {
      if (synth.paused) synth.resume();
      synth.speak(u);
    }, 100);
  }

  stop(): void {
    if (!this.supported()) return;
    window.speechSynthesis.cancel();
  }
}
