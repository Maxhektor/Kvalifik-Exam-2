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
        console.log('3 trying to update post in reducer');
        /*const newArray = [...state.posts]; // copy of the array.
        const index = state.posts.findIndex(post => post.id === action.payload.id);
        console.log(index);
        newArray[index] = action.payload;
        return tassign(state, {posts: newArray});*/

        const post = state.posts[action.payload.index];
        const updatedPost = {
          ...post,
          ...action.payload.post
        };

        const updatedPosts = [...state.posts];
        updatedPosts[action.payload.index] = updatedPost;
        return {
          ...state,
          posts: updatedPosts
        };


    case PostActions.ADD_POST:
        // add the action.payload (post) to the array of posts, but without mutating the array.
        // state.posts.push(action.payload);
        // return state;

        // return tassign(state, {posts: state.posts.concat(action.payload)});
        return tassign(state, {posts: [...state.posts, action.payload]});

   default:
    return state;
 }
}
