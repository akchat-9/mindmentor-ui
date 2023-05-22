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
  ) { }

  ngOnInit(): void {
    this.coachingSessionForm = this.fb.group({
      date: ['', Validators.required],
      time: ['', Validators.required],
      duration: ['', Validators.required],
      course: ['', Validators.required],
      teacher: ['', Validators.required],
    });

    this.commonService
      .getAllCourses()
      .subscribe((courses) => (this.courses = courses));

    // this.commonService
    //   .getAllInstructors()
    //   .subscribe((teachers) => (this.teachers = teachers));
    this.getAllInstructors();
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.isEditing = true;
        // console.log('Is newwwwwwwww',this.isEditing)
        const coachingSessionId = +params['id'];
        this.CoachingSession =
          this.scheduleService.getCoachingSessionById(coachingSessionId);
        // console.log(this.CoachingSession)
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

  getAllInstructors() {
    this.commonService.getAllInstructors().subscribe((response) => {
      if (response.statusCode !== 200) {
        console.log(response)
        return;
      }
      this.teachers = response.data;
    });
  }
  get date() {
    return this.coachingSessionForm.get('date')
  }
  get time() {
    return this.coachingSessionForm.get('time')
  }
  get duration() {
    return this.coachingSessionForm.get('duration')
  }
  get course() {
    return this.coachingSessionForm.get('course')
  }
  get teacher() {
    return this.coachingSessionForm.get('teacher')
  }
  onSubmit() {
    if (this.coachingSessionForm.valid) {
      // console.log(this.coachingSessionForm.value)
      const formValue = this.coachingSessionForm.value;
      console.log(this.isEditing)
      if (this.isEditing) {
        console.log(formValue)
        this.scheduleService.updateCoachingSession(formValue);
      } else {
        console.log(formValue)
        this.scheduleService.addCoachingSession(formValue);
      }
      this.router.navigate(['/schedule/sessions']);
    }
  }

  onCancel() {
    this.router.navigate(['/schedule/sessions']);
  }
}
