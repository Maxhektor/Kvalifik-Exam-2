import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Event} from '../entities/Event';

@Component({
  selector: 'app-events',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {
  @Input() event: Event;
  @Output() eventClicked: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  editEvent(id: string): void{
    this.eventClicked.emit(id);
}

}
