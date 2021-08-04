import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { AppState } from './../Store';
import { Post } from 'src/app/entities/Post';
import { PostsService } from 'src/app/posts.service';

@Injectable({ providedIn: 'root'})
export class PostActions {

  constructor(private ngRedux: NgRedux<AppState>, private postService: PostsService)
  {}

  static ADD_POST = 'ADD_POST';
  static UPDATE_POST = 'UPDATE_POST';
  static READ_POSTS = 'READ_POSTS';


  readPosts() {
    this.postService.readPosts().subscribe((result: any) => {
      console.log('posts fetched from server:');
      console.log(result);

      const posts: Post[] = [];
      for(const id in result) {
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
      console.log('result from saving');
      console.log(result);

      newPost.id = result.name;

      this.ngRedux.dispatch({
        type: PostActions.ADD_POST,
        payload: newPost
      });
    });


  }

  updatePost(updatedPost: Post): void {
    console.log('2 passed to Post Actions: ');
    console.log(updatedPost);
    this.ngRedux.dispatch({
        type: PostActions.UPDATE_POST,
        payload: updatedPost
    });
  }

}
