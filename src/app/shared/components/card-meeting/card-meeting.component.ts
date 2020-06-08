import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Meeting } from 'src/app/core/interfaces/whereby.interface';
import { MessageUtil } from 'src/app/core/util/util';

@Component({
  selector: 'app-card-meeting',
  templateUrl: './card-meeting.component.html',
  styleUrls: ['./card-meeting.component.scss']
})
export class CardMeetingComponent implements OnInit {

  @Input() meeting: Meeting;
  @Output() deleteMeeting = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  delete() {
    MessageUtil.deleteOption()
      .then((result) => {
        if (result.value) {
          this.deleteMeeting.emit(result.value as boolean);
        }
      });
  }

}
