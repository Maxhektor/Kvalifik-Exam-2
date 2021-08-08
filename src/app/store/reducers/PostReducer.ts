import { tassign } from 'tassign';
import { PostState } from '../Store';
import { PostActions } from '../actions/PostActions';
import { Post } from 'src/app/entities/Post';


const INITIAL_STATE: PostState = { posts: []};

export function postsReducer(state: PostState = INITIAL_STATE, action: any) {

 switch (action.type) {

   case PostActions.READ_POSTS:
        return tassign(state, {posts: action.payload});

   case PostActions.UPDATE_POST:
     const oldPost = state.posts[action.payload.index];
     const newPost = {
       ...oldPost,
       post: action.payload.post
     };
     const updatedPosts = [...state.posts];
     updatedPosts[action.payload.index] = newPost;

     return tassign(state, {posts: updatedPosts});

     case PostActions.ADD_POST:
        return tassign(state, {posts: [...state.posts, action.payload]});

   case PostActions.DELETE_POST:
        return tassign(state, {posts: [...state.posts, action.payload]});


   default:
    return state;
 }
}
