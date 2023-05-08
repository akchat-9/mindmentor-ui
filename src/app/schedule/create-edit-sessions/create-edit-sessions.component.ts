import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/app/_services/common.service';
import { ScheduleService } from 'src/app/_services/schedule.service';
import { CoachingSessionModel } from 'src/app/model/CoachingSessionModel';

@Component({
  selector: 'app-create-edit-sessions',
  templateUrl: './create-edit-sessions.component.html',
  styleUrls: ['./create-edit-sessions.component.css'],
})
export class CreateEditSessionsComponent {
  coachingSessionForm!: FormGroup;
  CoachingSession!: CoachingSessionModel | null;
  isEditing!: boolean;
  courses: any[] = [];
  teachers: any[] = [];

  constructor(
    private fb: FormBuilder,
    private scheduleService: ScheduleService,
    private route: ActivatedRoute,
    private router: Router,
    private commonService: CommonService
  ) {}

  ngOnInit(): void {
    this.coachingSessionForm = this.fb.group({
      date: ['', Validators.required],
      time: ['', Validators.required],
      duration: ['', Validators.required],
      course: ['', Validators.required],
      teacher: ['', Validators.required],
      student: ['', Validators.required],
    });

    this.commonService
      .getAllCourses()
      .subscribe((courses) => (this.courses = courses));

    this.commonService
      .getAllTeachers()
      .subscribe((teachers) => (this.teachers = teachers));

    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.isEditing = true;
        console.log('Is newwwwwwwww',this.isEditing)
        const coachingSessionId = +params['id'];
        this.CoachingSession =
          this.scheduleService.getCoachingSessionById(coachingSessionId);
          console.log(this.CoachingSession)
        if (this.CoachingSession != null) {
          this.coachingSessionForm.patchValue({
            date: this.CoachingSession.date,
            time: this.CoachingSession.time,
            duration: this.CoachingSession.duration,
            course: this.CoachingSession.course,
            teacher: this.CoachingSession.teacher,
          });
        }
      } else {
        this.isEditing = false;
        this.CoachingSession = null;
      }
    });
  }

  onSubmit() {
    if (this.coachingSessionForm.valid) {
      const formValue = this.coachingSessionForm.value;
      if (this.isEditing) {
        this.scheduleService.updateCoachingSession(formValue);
      } else {
        this.scheduleService.addCoachingSession(formValue);
      }
      this.router.navigate(['/schedule/sessions']);
    }
  }

  onCancel() {
    this.router.navigate(['/schedule/sessions']);
  }
}
