import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { CommonService } from 'src/app/_services/common.service';
import { ScheduleService } from 'src/app/_services/schedule.service';
import { CoachingSessionModel } from 'src/app/model/CoachingSessionModel';
import { ScheduleModel } from 'src/app/model/ScheduleModel';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css'],
})
export class BookingsComponent {
  coachingSessionForm!: FormGroup;
  // CoachingSession!: Sche | null;
  ScheduleModel!: ScheduleModel
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
      courseId: ['', Validators.required],
      instructorId: ['', Validators.required],
    });
    this.commonService
      .getAllCourses()
      .subscribe((courses) => (this.courses = courses));

    this.commonService
      .getAllInstructors()
      .subscribe((teachers) => (this.teachers = teachers));
  }
  onSubmit() {

    console.log(this.coachingSessionForm.value)
    if (this.coachingSessionForm.valid) {
      console.log(this.coachingSessionForm.value)
      this.ScheduleModel = this.coachingSessionForm.value;
      const scheduleDetails: ScheduleModel = {
        organisationId: 1,
        date: moment(this.ScheduleModel.date, 'DD-MM-YYYY').format('DD-MM-YYYY'),
        time: this.ScheduleModel.time,
        duration: this.ScheduleModel.duration.toString(),
        courseId: this.ScheduleModel.courseId,
        instructorId: this.ScheduleModel.instructorId
      }
      this.scheduleService.addCoachingSession(scheduleDetails).subscribe(response => {
        if (response.statusCode !== 201) {
          console.log(response)
          Swal.fire('Error!', 'Error while creating schedule', 'error')
          return;
        }
        Swal.fire('Success!', response.data, 'success').then(() => {
          this.router.navigate(['/schedule/sessions'])
        })
      });

    }
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
  get courseId() {
    return this.coachingSessionForm.get('courseId')
  }
  get instructorId() {
    return this.coachingSessionForm.get('instructorId')
  }
  onCancel() {
    this.router.navigate(['/schedule/sessions']);
  }
}
