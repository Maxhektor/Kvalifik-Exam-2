import { NgRedux } from '@angular-redux/store';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Post } from './entities/Post';
import { AppState } from './store/Store';

@Injectable({
  providedIn: 'root'
})
export class PostsService extends ApiService {

  constructor(private http: HttpClient, private ngRedux: NgRedux<AppState>) {
    super();
  }

  savePost(post: Post) {
    console.log('saving to firebase');
    const url = 'https://kvalifik-exam-project-default-rtdb.firebaseio.com/posts.json';

    return this.http.post(url, post, this.getHttpOptions());
  }


  readPosts() {
    const url = 'https://kvalifik-exam-project-default-rtdb.firebaseio.com/posts.json';

    return this.http.get(url, this.getHttpOptions());
  }

  updatePost(post: Post){
    console.log('trying to send to firebase');
    const url = 'https://kvalifik-exam-project-default-rtdb.firebaseio.com/posts.json';
    return this.http.put(url, post, this.getHttpOptions());
  }
}
