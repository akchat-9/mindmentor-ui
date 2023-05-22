import { Component } from '@angular/core';
import { AllSessionsViewModel } from 'src/app/ViewModel/AllSessionsViewModel';
import { ScheduleService } from 'src/app/_services/schedule.service';
import { DataTablesModule, DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { ScheduleViewModel } from 'src/app/ViewModel/ScheduleViewModel';

@Component({
  selector: 'app-coaching-sessions',
  templateUrl: './coaching-sessions.component.html',
  styleUrls: ['./coaching-sessions.component.css'],
})
export class CoachingSessionsComponent {
  sessionList!: ScheduleViewModel[];
  organisationId: number = 1
  private dtElement!: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  constructor(
    private scheduleService: ScheduleService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
    };
    this.scheduleService.getAllSessions(this.organisationId).subscribe((response) => {
      if (response.statusCode !== 200) {
        console.log(response);
        return;
      }
      this.sessionList = response.data
      this.dtTrigger.next(null);
    });
  }

  editCoachingSession(sessionId: number) {
    this.router.navigate(['/schedule/customize', sessionId]);
  }

  createCoachingSession() {
    this.router.navigate(['/schedule/customize']);
  }
}
