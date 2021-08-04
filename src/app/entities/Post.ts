import { Collection } from './Collection';
import { User } from './User';

export class Post {
    id;
    createdDate: Date;
    title: string;
    text: string;
    media?: string;
    collections: Collection[];
    comments: Comment[];

}

export class Comment {
    id;
    author: UserVm;
    createdDate: Date;
    text: string;
}

export class UserVm {
    firstName: string;
    lastName: string;
}
