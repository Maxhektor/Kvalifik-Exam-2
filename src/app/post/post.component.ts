import { EventEmitter, Output } from '@angular/core';
import { Component, Input, OnInit } from '@angular/core';
import { Post } from '../entities/Post';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
 @Input() post: Post;
 @Output() postClicked: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  editPost(id: string): void {
    this.postClicked.emit(id);
  }

  deletePost(id: string): void {
    this.postClicked.emit(id);
  }

}
