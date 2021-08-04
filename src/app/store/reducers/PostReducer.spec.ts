declare var require: any;
const deepFreeze = require('deep-freeze');
import { postsReducer, posts } from './../reducers/PostReducer';
import * as types from './../actions/PostActions';
import { Post } from 'src/app/entities/Post';

describe('posts reducer', () => {
    it('should return the initial state', () => {
        expect(postsReducer(undefined, {})).toEqual({ posts});
    });



    it('Add a new post to empty posts array', () => {
        const oldState = { posts: [] };
        const newPost: Post = {
            id: 8888,
            createdDate: new Date(),
            title: 'test title',
            text: 'test text',
            media: 'empty media',
            collections: [],
            comments: []
        };
        deepFreeze(oldState);

        const actionObj = { type: types.PostActions.ADD_POST, payload: newPost };

         // Act
        const result = postsReducer(oldState, actionObj);

        // Assert (expect)
        expect(result.posts).toHaveSize(oldState.posts.length + 1);
        expect(result.posts[result.posts.length - 1]).toEqual(newPost);
    });

    it('Add a new post to non-empty posts array', () => {
        // Arrange, Act, Assert

        // Arrange
        const oldState = { posts };
        const newPost: Post = {
            id: 8888,
            createdDate: new Date(),
            title: 'test title',
            text: 'test text',
            media: 'empty media',
            collections: [],
            comments: []
        };
        deepFreeze(oldState);

        const actionObj = { type: types.PostActions.ADD_POST, payload: newPost };

         // Act
        const result = postsReducer(oldState, actionObj);

        // Assert (expect)
        expect(result.posts).toHaveSize(oldState.posts.length + 1);
        expect(result.posts[result.posts.length - 1]).toEqual(newPost);
        // console.log(result.posts);
    });

    it('update a post in the posts array', () => {
        const oldState = {  posts };
        const updatedPost: Post = {
            id: '3',
            createdDate: new Date(2021, 2, 2),
            title: 'What other good questions are there?',
            text: 'abc'
        } as Post;

        deepFreeze(oldState);

        const actionObj = { type: types.PostActions.UPDATE_POST, payload: updatedPost };

         // Act
        const result = postsReducer(oldState, actionObj);
        const post = result.posts.find(post => post.id === updatedPost.id);

        // Assert (expect)
        expect(post.text).toEqual('abc');
    });

});
