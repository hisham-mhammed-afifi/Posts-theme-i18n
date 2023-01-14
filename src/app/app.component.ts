import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MatDialog } from '@angular/material/dialog';
import { FormDialogComponent } from './form-dialog/form-dialog.component';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  ayhaga = { value: 'world' };
  isDarkTheme: boolean = false;
  currentDir: string = 'ltr';
  currentLang: string = 'en';

  constructor(private translate: TranslateService, private dialog: MatDialog) {
    translate.use(this.currentLang);
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

  confirmDelete(): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: { name: 'ana hesham' },
      maxWidth: '425px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }

  toggleTheme() {
    this.isDarkTheme = !this.isDarkTheme;
    this.isDarkTheme
      ? document.body.classList.add('dark-theme')
      : document.body.classList.remove('dark-theme');
  }

  toggleLang() {
    this.currentDir = this.currentDir === 'ltr' ? 'rtl' : 'ltr';
    this.currentLang = this.currentLang === 'en' ? 'ar' : 'en';
    document.body.dir = this.currentDir;
    this.translate.use(this.currentLang);
  }
}
