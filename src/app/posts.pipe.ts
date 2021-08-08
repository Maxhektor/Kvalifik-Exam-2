import { Pipe, PipeTransform } from '@angular/core';
import { Post } from './entities/Post';

@Pipe({
  name: 'filterPosts'
})
export class PostsPipe implements PipeTransform {

  transform(posts: Post[], searchInput: string): Post[] {
    return posts.filter(postelement => postelement.title.toLowerCase().includes(searchInput.toLowerCase())
      || postelement.text.toLowerCase().includes(searchInput.toLowerCase()));
  }

}
