import { Component, OnInit, ViewChild } from '@angular/core';
import { EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGrigPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { FullCalendarComponent } from '@fullcalendar/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  /* calendarPlugins = [dayGridPlugin];
  calendarEvents = [
    { title: 'event 1', date: '2019-06-01' }
  ]; */

  @ViewChild('calendar', { static: false }) calendarComponent: FullCalendarComponent; // the #calendar in the template

  calendarVisible = true;
  calendarPlugins = [dayGridPlugin, timeGrigPlugin, interactionPlugin];
  calendarWeekends = true;
  calendarEvents: EventInput[] = [
    { title: 'Event Now', start: '2020-06-10' },
    {
      title: 'BCH237',
      start: '2020-06-12T10:30:00',
      end: '2020-06-12T11:30:00',
      extendedProps: {
        department: 'BioChemistry'
      },
      description: 'Lecture'
    }
  ];


  constructor() {
  }

  ngOnInit() {
    console.log(this.calendarComponent);
  }

  toggleVisible() {
    this.calendarVisible = !this.calendarVisible;
  }

  toggleWeekends() {
    this.calendarWeekends = !this.calendarWeekends;
  }

  gotoPast() {
    const calendarApi = this.calendarComponent.getApi();
    calendarApi.gotoDate('2000-01-01'); // call a method on the Calendar object
  }

  handleDateClick(arg) {
    console.log(arg);
    if (confirm('Would you like to add an event to ' + arg.dateStr + ' ?')) {
      this.calendarEvents = this.calendarEvents.concat({ // add new event data. must create new array
        title: 'New Event',
        start: arg.date,
        allDay: arg.allDay,
      });
    }
  }

  prueba(arg) {
    console.log('prueba', arg);
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

}
