import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/app/_services/common.service';
import { ScheduleService } from 'src/app/_services/schedule.service';
import { CoachingSessionModel } from 'src/app/model/CoachingSessionModel';

@Component({
  selector: 'app-create-feedback',
  templateUrl: './create-feedback.component.html',
  styleUrls: ['./create-feedback.component.css'],
})
export class CreateFeedbackComponent {
  coachingSessionForm!: FormGroup;
  CoachingSession!: CoachingSessionModel | null;
  courses: any[] = [];
  teachers: any[] = [];
  selectedOption: any;
  selectedOption1: any;
  constructor(
    private fb: FormBuilder,
    private scheduleService: ScheduleService,
    private route: ActivatedRoute,
    private router: Router,
    private commonService: CommonService
  ) {}
  ngOnInit(): void {
    this.coachingSessionForm = this.fb.group({
      teacher: ['', Validators.required],
      course: ['', Validators.required],
      rating: [''],
      feedback: [''],
    });

    this.commonService
      .getAllCourses()
      .subscribe((courses) => (this.courses = courses));

    this.commonService
      .getAllInstructors()
      .subscribe((teachers) => (this.teachers = teachers));
  }

  onSubmit() {
    if (this.coachingSessionForm.valid) {
      const formValue = this.coachingSessionForm.value;
      console.log(formValue);
      this.scheduleService.addCoachingSession(formValue);

      this.router.navigate(['/feedback/viewFeedback']);
    }
  }
  onCancel() {
    this.router.navigate(['/feedback/viewFeedback']);
  }
}
