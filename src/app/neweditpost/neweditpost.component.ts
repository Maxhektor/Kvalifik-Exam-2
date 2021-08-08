import { NgRedux } from '@angular-redux/store';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from '../entities/Post';
import { PostActions } from '../store/actions/PostActions';
import { AppState } from '../store/Store';
import {timeout} from 'rxjs/operators';

@Component({
  selector: 'app-neweditpost',
  templateUrl: './neweditpost.component.html',
  styleUrls: ['./neweditpost.component.scss']
})
export class NeweditpostComponent implements OnInit {
  public selectedPost: Post;
  public postForm: FormGroup;
  public headerTitle: String = 'Create New Post';
  public editMode = false;
  public showDeleteSpinner = false;
  public showLoadSpinner = false;
  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private postActions: PostActions,
    private ngRedux: NgRedux<AppState>) { }

  ngOnInit(): void {
    const id: string = this.route.snapshot.paramMap.get('myId');
    if (id !== null) {
      this.headerTitle = 'Edit Post';
      this.editMode = true;
    }


    this.ngRedux.select(state => state.posts).subscribe(res => {
      this.selectedPost = res.posts.find(post => post.id === id);
    });
    if (this.selectedPost === undefined) {
      this.selectedPost = new Post();
    }


    this.postForm = this.fb.group({
      title: [this.selectedPost.title, Validators.required],
      text: [this.selectedPost.text, Validators.required],
    });
  }
  //TODO: 'Sæt maximum længde på titel, 25char?
  //TODO: 'Fix overflow af text i cards
  onSubmitPost() {
    if (this.postForm.valid){

      if (!this.editMode) {
        this.selectedPost = this.postForm.value;
        this.selectedPost.createdDate = new Date();
        this.postActions.addPost(this.selectedPost);
      } else {
        this.selectedPost.title = this.postForm.value.title;
        this.selectedPost.text = this.postForm.value.text;
        this.postActions.updatePost(this.selectedPost);
        console.log(this.selectedPost);
      }
    }
    setTimeout(() => {
      this.router.navigate(['posts']);
    }, 1000);
  }

  deletePost(){
    this.postActions.deletePost(this.selectedPost);
    setTimeout(() => {
      this.router.navigate(['posts']);
    }, 1000);
  }

  cancelPost(){
    this.router.navigate(['posts']);
  }

  isInEditMode(){
    return this.editMode;
  }

  loadingDelete(){
    this.showDeleteSpinner = true;
    setTimeout(() => {
      this.showDeleteSpinner = false;
    }, 1000);
  }
  loadingSave(){
    this.showLoadSpinner = true;
    setTimeout(() => {
      this.showLoadSpinner = false;
    }, 1000);
  }
}
