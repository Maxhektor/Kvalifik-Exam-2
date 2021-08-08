import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { AppState } from './../Store';
import { Post } from 'src/app/entities/Post';
import { PostsService } from 'src/app/posts.service';
import {Observable} from 'rxjs';

@Injectable({ providedIn: 'root'})
export class PostActions {

  constructor(private ngRedux: NgRedux<AppState>, private postService: PostsService)
  {}

  static ADD_POST = 'ADD_POST';
  static UPDATE_POST = 'UPDATE_POST';
  static READ_POSTS = 'READ_POSTS';
  static DELETE_POST = 'DELETE_POST';


  readPosts() {
    this.postService.readPosts().subscribe((result: any) => {
      const posts: Post[] = [];
      // tslint:disable-next-line:forin
      for (const id in result) {
        const postObj = result[id];
        postObj.id = id;

        posts.push(postObj as Post);
      }

      this.ngRedux.dispatch({
        type: PostActions.READ_POSTS,
        payload: posts
      });
    });
  }



  addPost(newPost: Post): void {
    this.postService.savePost(newPost).subscribe((result: any) => {
      newPost.id = result.name;
      this.ngRedux.dispatch({
        type: PostActions.ADD_POST,
        payload: newPost
      });
    });


  }

  updatePost(updatedPost: Post): void{
    this.postService.updatePost(updatedPost).subscribe((result: any) => {
      updatedPost.id = result.name;
      this.ngRedux.dispatch({
        type: PostActions.UPDATE_POST,
        payload: updatedPost
      });
    });
  }

  deletePost(deletedPost: Post): void{
    this.postService.deletePost(deletedPost).subscribe((result: any) => {
      this.ngRedux.dispatch({
        type: PostActions.DELETE_POST,
        payload: deletedPost
      });
    });
  }
}

