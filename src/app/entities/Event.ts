import {Collection} from './Collection';
import {Comment} from './Post';

export class Event{
  id;
  createdDate: Date;
  title: string;
  text: string;
  media?: string;
  collections: Collection[];
}
