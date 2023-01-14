import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MatDialog } from '@angular/material/dialog';
import { FormDialogComponent } from './form-dialog/form-dialog.component';
import { LocalStorageService } from './services/local-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  posts = [];
  theme: string = 'light';
  lang: string = 'en';
  currentDir: string = 'ltr';

  constructor(
    private translate: TranslateService,
    private dialog: MatDialog,
    private lsSrv: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.setDefaultTheme();
    this.setDefaultLang();
  }

  addedToFavorite(postId: number): boolean {
    return true;
  }

  openFormDialog(): void {
    const dialogRef = this.dialog.open(FormDialogComponent, {
      data: { name: 'ana hesham' },
      maxWidth: '425px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }

  setDefaultTheme() {
    this.theme = this.lsSrv.theme;
    if (this.theme === 'dark') {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  }
  setDefaultLang() {
    this.lang = this.lsSrv.lang;
    this.lang === 'en' ? (this.currentDir = 'ltr') : (this.currentDir = 'rtl');
    document.body.dir = this.currentDir;
    this.translate.use(this.lang);
  }

  toggleTheme() {
    this.theme = this.theme === 'dark' ? 'light' : 'dark';
    this.lsSrv.setTheme(this.theme);
    if (this.theme === 'dark') {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  }

  toggleLang() {
    this.lang = this.lang === 'en' ? 'ar' : 'en';
    this.currentDir = this.currentDir === 'ltr' ? 'rtl' : 'ltr';
    document.body.dir = this.currentDir;
    this.lsSrv.setLang(this.lang);
    this.translate.use(this.lang);
  }
}
