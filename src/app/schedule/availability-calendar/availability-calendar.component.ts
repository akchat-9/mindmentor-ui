import { ChangeDetectorRef, Component } from '@angular/core';
import * as moment from 'moment';
import { ScheduleService } from 'src/app/_services/schedule.service';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
// import interactionPlugin from '@fullcalendar/interaction';

import {
  CalendarOptions,
  EventApi,
  EventClickArg,
  DateSelectArg,
} from '@fullcalendar/core';
import { AllSessionsViewModel } from 'src/app/ViewModel/AllSessionsViewModel';
@Component({
  selector: 'app-availability-calendar',
  templateUrl: './availability-calendar.component.html',
  styleUrls: ['./availability-calendar.component.css'],
})
export class AvailabilityCalendarComponent {
  sessions!: any[];
  eventGuid: number = 0;
  currentEvents: any[] = [];
  calendarOptions!: CalendarOptions;
  constructor(
    private scheduleService: ScheduleService,
    private changeDetector: ChangeDetectorRef
  ) {}
  ngOnInit(): void {
    // Fetch the sessions data from the backend API
    // Transform the sessions data into the format required by FullCalendar
    // const events = sessions.map(
    //   (session: {
    //     title: any;
    //     start_time: moment.MomentInput;
    //     end_time: moment.MomentInput;
    //   }) => ({
    //     title: session.title,
    //     start: moment(session.start_time),
    //     end: moment(session.end_time),
    //   })
    // );
    this.calendarOptions = {
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth',
      },
      initialView: 'dayGridMonth',
      plugins: [dayGridPlugin, timeGridPlugin, listPlugin],
    };

    this.loadEvent();
  }
  loadEvent() {
    this.scheduleService.getSessions().subscribe((sessions) => {
      this.currentEvents = sessions;
    });
    this.calendarOptions.events = this.currentEvents.map((event) => {
      const startDate = new Date(`${event.date} ${event.time}`);
      const endDate = new Date(startDate.getTime() + event.duration * 60000);
      return {
        id: event.id,
        title: `${event.course} - ${event.teacher}`,
        start: startDate,
        end: endDate,
      };
    });
  }
  // calendarVisible = true;
  // calendarOptions: CalendarOptions = {
  //   plugins: [interactionPlugin, dayGridPlugin],
  //   headerToolbar: {
  //     left: 'prev,next today',
  //     center: 'title',
  //     right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
  //   },
  //   initialView: 'dayGridMonth',
  //   initialEvents: this.sessions, // alternatively, use the `events` setting to fetch from a feed
  //   weekends: true,
  //   editable: true,
  //   selectable: true,
  //   selectMirror: true,
  //   dayMaxEvents: true,
  //   select: this.handleDateSelect.bind(this),
  //   eventClick: this.handleEventClick.bind(this),
  //   eventsSet: this.handleEvents.bind(this),
  //   /* you can update a remote database when these fire:
  //   eventAdd:
  //   eventChange:
  //   eventRemove:
  //   */
  // };
  handleWeekendsToggle() {
    const { calendarOptions } = this;
    calendarOptions.weekends = !calendarOptions.weekends;
  }
  // handleCalendarToggle() {
  //   this.calendarVisible = !this.calendarVisible;
  // }
  handleDateSelect(selectInfo: DateSelectArg) {
    const title = prompt('Please enter a new title for your event');
    const calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    if (title) {
      calendarApi.addEvent({
        id: this.createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
      });
    }
  }

  handleEventClick(clickInfo: EventClickArg) {
    if (
      confirm(
        `Are you sure you want to delete the event '${clickInfo.event.title}'`
      )
    ) {
      clickInfo.event.remove();
    }
  }

  handleEvents(events: any[]) {
    this.currentEvents = events;
    this.changeDetector.detectChanges();
  }

  createEventId() {
    return String(this.eventGuid++);
  }
}
