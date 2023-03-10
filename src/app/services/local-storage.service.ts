import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {
    this.getPreferredTheme();
    this.getCurrentLanguage();
  }

  getPreferredTheme() {
    if (this.theme) return this.theme;
    if (window.matchMedia) {
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return this.setTheme('dark');
      } else {
        return this.setTheme('light');
      }
    }
    return this.setTheme('light');
  }

  getCurrentLanguage() {
    if (this.lang) return this.lang;
    return this.setLang('en');
  }

  setTheme(mode: string) {
    localStorage.setItem('theme', JSON.stringify(mode));
  }

  get theme(): string {
    return JSON.parse(localStorage.getItem('theme') as string);
  }

  setLang(lang: string) {
    localStorage.setItem('lang', JSON.stringify(lang));
  }

  get lang(): string {
    return JSON.parse(<string>localStorage.getItem('lang'));
  }
}
