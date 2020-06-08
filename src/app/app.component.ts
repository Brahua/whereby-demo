import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateMeetingComponent } from './shared/components/create-meeting/create-meeting.component';
import { Meeting } from './core/interfaces/whereby.interface';
import { WherebyService } from './core/services/whereby.service';
import { MessageUtil } from './core/util/util';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'demo-whereby';

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
        MessageUtil.success('Se eliminó correctamente la sala');
      }, error => MessageUtil.error('Ocurrió un error al eliminar la sala ' + meeting.meetingId));
  }

}
