import { EventEmitter, Output } from '@angular/core';
import { Component, Input, OnInit } from '@angular/core';
import { Post } from '../entities/Post';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
 @Input() post: Post;
 @Output() postClicked: EventEmitter<any> = new EventEmitter<any>();

  constructor(public auth: AuthService) { }

  ngOnInit(): void {
  }

  editPost(id: string): void {
    this.postClicked.emit(id);
  }
}
