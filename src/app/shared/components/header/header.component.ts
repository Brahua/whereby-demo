import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateMeetingComponent } from '../create-meeting/create-meeting.component';
import { IMeeting, Meeting } from 'src/app/core/interfaces/whereby.interface';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() meetingCreated = new EventEmitter<Meeting>();

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  createMeeting(): void {
    const dialogRef = this.dialog.open(CreateMeetingComponent, {
      width: '600px',
      disableClose: true,
      data: {}
    });

    dialogRef.afterClosed().subscribe((dato: Meeting) => {
      if (dato !== null) {
        this.meetingCreated.emit(dato);
      }
    });
  }

}
