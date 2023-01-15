import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { Post } from '../services/posts.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {
  @Input() post!: Post;
  @Input() addedToFavorite: boolean = false;
  @Output() editPost = new EventEmitter();

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {}

  openFormDialog() {
    this.editPost.emit();
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
}
