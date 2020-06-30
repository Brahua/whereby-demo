import { Component, OnInit, ViewChild } from '@angular/core';
import { EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGrigPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { WherebyService } from 'src/app/core/services/whereby.service';
import { Meeting } from 'src/app/core/interfaces/whereby.interface';
import { MatDialog } from '@angular/material/dialog';
import { CreateMeetingComponent } from 'src/app/shared/components/create-meeting/create-meeting.component';
import { DialogEventComponent } from './dialog-event/dialog-event.component';
import { MessageUtil } from 'src/app/core/util/util';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {


  @ViewChild('calendar', { static: false }) calendarComponent: FullCalendarComponent;
  calendarPlugins = [dayGridPlugin, timeGrigPlugin, interactionPlugin];
  meetings: Meeting[] = [];
  calendarEvents: EventInput[] = [];


  constructor(
    private wherebyService: WherebyService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.meetings = this.wherebyService.getMeetingData();
    this.meetings.forEach(meeting =>
      this.calendarEvents = this.calendarEvents.concat(this.meetingToEvent(meeting))
    );
  }

  handleDateClick(arg) {
    if (confirm('Would you like to add an event to ' + arg.dateStr + ' ?')) {
      this.calendarEvents = this.calendarEvents.concat({ // add new event data. must create new array
        title: 'New Event',
        start: arg.date,
        allDay: arg.allDay,
      });
    }
  }

  openDetailMeeting(arg: EventInput) {
    const dialogRef = this.dialog.open(DialogEventComponent, {
      width: '400px',
      disableClose: true,
      data: this.eventToMeeting(arg),
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe((dato: Meeting) => {
      if (dato !== null) {
        console.log(this.calendarEvents);
        const positionMeeting = this.meetings.indexOf(this.meetings.find(value => value.meetingId === dato.meetingId));
        this.meetings.splice(positionMeeting, 1);
        this.wherebyService.persistData(this.meetings);


        this.meetings.forEach(meeting =>
          this.calendarEvents = this.calendarEvents.concat(this.meetingToEvent(meeting))
        );

        /* const positionEvents = this.calendarEvents.indexOf(this.calendarEvents.find(value => value.id === dato.meetingId));
        this.calendarEvents.splice(positionEvents, 1);
        this.calendarEvents = this.calendarEvents.concat([... this.calendarEvents]); */
        console.log(this.calendarEvents);

        MessageUtil.success('Se eliminó correctamente la sala');
      }
    });
  }

  meetingCreated(meeting: Meeting) {
    this.meetings.push(meeting);
    this.wherebyService.persistData(this.meetings);
    this.calendarEvents = this.calendarEvents.concat(this.meetingToEvent(meeting));
  }

  gotoDate(date: string) {
    const calendarApi = this.calendarComponent.getApi();
    calendarApi.gotoDate(date);
  }

  esHoy(date) {
    const hoy = new Date();
    const diasIguales = hoy.getDate() === date.getDate();
    const mesesIguales = hoy.getMonth() === date.getMonth();
    const aniosIguales = hoy.getFullYear() === date.getFullYear();
    if (diasIguales && mesesIguales && aniosIguales) {
      console.log('es hoy');
    }
  }

  meetingToEvent(meeting: Meeting): EventInput {
    const event: EventInput = {
      title: meeting.roomNamePrefix,
      start: meeting.startDate,
      end: meeting.endDate,
      id: meeting.meetingId,
      /* url: meeting.roomUrl, */
      extendedProps: meeting
    };
    return event;
  }

  eventToMeeting(arg: EventInput): Meeting {
    const meeting: Meeting = { ...arg.event.extendedProps };
    return meeting;
  }

}
