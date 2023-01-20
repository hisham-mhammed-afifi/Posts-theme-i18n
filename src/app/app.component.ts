import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MatDialog } from '@angular/material/dialog';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { FormDialogComponent } from './form-dialog/form-dialog.component';
import { LocalStorageService } from './services/local-storage.service';
import { Post, PostsService } from './services/posts.service';

@Component({
  selector: 'app-root',
  animations: [
    trigger('addRemove', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(50%)' }),
        animate('500ms', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
      transition(':leave', [
        animate('500ms', style({ opacity: 0, transform: 'translateX(100%)' })),
      ]),
    ]),
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  posts: Post[] = [];
  theme: string = 'light';
  lang: string = 'en';
  currentDir: string = 'ltr';

  constructor(
    private translate: TranslateService,
    private dialog: MatDialog,
    private lsSrv: LocalStorageService,
    private postsSrv: PostsService
  ) {}

  ngOnInit(): void {
    this.setDefaultTheme();
    this.setDefaultLang();
    this.getAllPosts();
  }

  getAllPosts() {
    this.postsSrv.allPosts().subscribe((res) => {
      this.posts = res.data;
    });
  }

  addedToFavorite(postId: string): boolean {
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

  deletePost(postId: string) {
    this.posts = this.posts.filter((p) => p._id !== postId);
    // this.postsSrv.deletePost(postId).subscribe((res) => {
    // });
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
