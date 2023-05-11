import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/app/_services/common.service';
import { ScheduleService } from 'src/app/_services/schedule.service';
import { CoachingSessionModel } from 'src/app/model/CoachingSessionModel';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css'],
})
export class BookingsComponent {
  coachingSessionForm!: FormGroup;
  CoachingSession!: CoachingSessionModel | null;
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
        // student: ['', Validators.required],`
      });

      this.commonService
        .getAllCourses()
        .subscribe((courses) => (this.courses = courses));

      this.commonService
        .getAllTeachers()
        .subscribe((teachers) => (this.teachers = teachers));
    }
  onSubmit() {
    if (this.coachingSessionForm.valid) {
      // console.log(this.coachingSessionForm.value)
      const formValue = this.coachingSessionForm.value;
      this.scheduleService.addCoachingSession(formValue);
      this.router.navigate(['/schedule/sessions']);
    }
  }
  onCancel() {
    this.router.navigate(['/schedule/sessions']);
  }
}
