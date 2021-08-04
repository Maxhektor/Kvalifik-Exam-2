import { NgRedux } from '@angular-redux/store';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from '../entities/Post';
import { PostActions } from '../store/actions/PostActions';
import { AppState } from '../store/Store';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  public posts: Post[];
  public search = '';

  constructor(private router: Router,
              private ngRedux: NgRedux<AppState>, private postActions: PostActions) { }

  ngOnInit(): void {
    this.postActions.readPosts();

    this.ngRedux.select(state => state.posts).subscribe(res => {
      this.posts = res.posts;
    });

  }

  editPost(id: any) {
    this.router.navigate(['neweditpost', {myId: id}]);
  }

}
