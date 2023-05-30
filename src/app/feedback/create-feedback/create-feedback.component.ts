// import { Component } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { ActivatedRoute, Router } from '@angular/router';
// import { DataTableDirective } from 'angular-datatables';
// import { Subject } from 'rxjs';
// // import { UsersViewModel } from 'src/app/ViewModel/UsersViewModel';
// import { CommonService } from 'src/app/_services/common.service';
// import { ScheduleService } from 'src/app/_services/schedule.service';
// import { CoachingSessionModel } from 'src/app/model/CoachingSessionModel';

// @Component({
//   selector: 'app-create-feedback',
//   templateUrl: './create-feedback.component.html',
//   styleUrls: ['./create-feedback.component.css'],
// })
// export class CreateFeedbackComponent {
//   coachingSessionForm!: FormGroup;
//   CoachingSession!: CoachingSessionModel | null;
//   courses: any[] = [];
//   teachers: any[] = [];
//   selectedOption: any;
//   selectedOption1: any;

//   private dtElement!: DataTableDirective;
//   dtOptions: DataTables.Settings = {};
//   dtTrigger: Subject<any> = new Subject();
//   // users!: UsersViewModel[];
//   // users!: UserViewModel[];
//   userRole: string = '';
//   IsAdminTeacher: boolean = false;
//   constructor(
//     private fb: FormBuilder,
//     private scheduleService: ScheduleService,
//     private route: ActivatedRoute,
//     private router: Router,
//     private commonService: CommonService
//   ) {}
//   ngOnInit(): void {
//     this.dtOptions = {
//       pagingType: 'full_numbers',
//       pageLength: 10,
//       processing: true,
//     };
//     this.coachingSessionForm = this.fb.group({
//       teacher: ['', Validators.required],
//       course: ['', Validators.required],
//       rating: [''],
//       feedback: [''],
//     });

//     this.commonService
//       .getAllCourses()
//       .subscribe((courses) => (this.courses = courses));

//     this.commonService
//       .getAllInstructors()
//       .subscribe((teachers) => (this.teachers = teachers));
//   }

//   onSubmit() {
//     if (this.coachingSessionForm.valid) {
//       const formValue = this.coachingSessionForm.value;
//       console.log(formValue);
//       this.scheduleService.addCoachingSession(formValue);

//       this.router.navigate(['/feedback/viewFeedback']);
//     }
//   }
//   onCancel() {
//     this.router.navigate(['/feedback/viewFeedback']);
//   }
// }
