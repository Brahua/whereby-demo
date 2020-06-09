import { Component, OnInit } from '@angular/core';
import { Meeting } from 'src/app/core/interfaces/whereby.interface';
import { WherebyService } from 'src/app/core/services/whereby.service';
import { MessageUtil } from 'src/app/core/util/util';

@Component({
  selector: 'app-meetings',
  templateUrl: './meetings.component.html',
  styleUrls: ['./meetings.component.scss']
})
export class MeetingsComponent implements OnInit {

  meetings: Meeting[] = [];

  constructor(private wherebyService: WherebyService) {

  }

  ngOnInit() {
    this.meetings = this.wherebyService.getMeetingData();
  }

  meetingCreated(meeting: Meeting) {
    this.meetings.push(meeting);
    this.wherebyService.persistData(this.meetings);
  }

  deleteMeeting(pos: number, meeting: Meeting) {
    MessageUtil.loading();
    this.wherebyService.deleteMeeting(meeting.meetingId)
      .subscribe(response => {
        this.meetings.splice(pos, 1);
        this.wherebyService.persistData(this.meetings);
        MessageUtil.success('Se eliminó correctamente la sala');
      }, error => MessageUtil.error('Ocurrió un error al eliminar la sala ' + meeting.meetingId));
  }

}
