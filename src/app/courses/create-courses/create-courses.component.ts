import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { instructors } from 'src/app/FakeDb/teachers';
import { CategoryViewModel } from 'src/app/ViewModel/CategoryViewModel';
import { CourseListViewModel } from 'src/app/ViewModel/CourseListViewModel';
import { UsersDDLViewModel } from 'src/app/ViewModel/UsersDDLViewModel';
import { CommonService } from 'src/app/_services/common.service';
import { CoursesService } from 'src/app/_services/courses.service';
import { CourseModel } from 'src/app/model/CourseModel';
import Swal from 'sweetalert2';
import * as moment from 'moment';
import { Router } from '@angular/router';


@Component({
  selector: 'app-create-courses',
  templateUrl: './create-courses.component.html',
  styleUrls: ['./create-courses.component.css'],
})
export class CreateCoursesComponent {
  courseForm!: FormGroup;
  categoryList!: CategoryViewModel[];
  instructorList!: UsersDDLViewModel[];
  constructor(
    private formBuilder: FormBuilder,
    private courseService: CoursesService,
    private commonService: CommonService,
    private router:Router
  ) { }

  ngOnInit() {
    this.courseForm = this.formBuilder.group({
      courseName: ['', Validators.required],
      courseCategoryId: [null, Validators.required],
      courseDescription: ['', Validators.required],
      courseDuration: [
        '',
        [Validators.required, Validators.pattern('[0-9]+$')],
      ],
      courseFormat: ['', Validators.required],
      courseLevel: ['', Validators.required],
      prerequisites: [''],
      instructorIds: [null, Validators.required],
      courseFees: ['', [Validators.required, Validators.pattern('[0-9]+$')]],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      enrollment: ['', [Validators.required, Validators.pattern('[0-9]+$')]],
    });
    this.getAllCategories();
    this.getAllInstructors();
  }

  getAllCategories() {
    this.courseService.getAllCategories().subscribe((categories) => {
      this.categoryList = categories;
    });
  }
  getAllInstructors() {
    this.commonService.getAllInstructors().subscribe((response) => {
      if (response.statusCode !== 200) {
        console.log(response)
        return;
      }
      this.instructorList = response.data;
    });
  }

  onSubmit() {
    console.log(this.courseForm.value);

    if (this.courseForm.invalid) {
      console.log('course is invalid');
    }
    const formValue = this.courseForm.value;
    let courseDetails: CourseModel = {
      ...formValue,
      instructorIds: Array.isArray(formValue.instructorIds) ? formValue.instructorIds : [parseInt(formValue.instructorIds)],
      organisationId: 1,
      startDate: moment(formValue.startDate, 'DD-MM-YYYY').format('DD-MM-YYYY'),
      endDate: moment(formValue.endDate, 'DD-MM-YYYY').format('DD-MM-YYYY'),
      courseCategoryId: parseInt(formValue.courseCategoryId),
      courseDuration: parseInt(formValue.courseDuration),
      courseFees: parseFloat(formValue.courseFees),
      enrollment: parseInt(formValue.enrollment)
    }
    console.log('courseDetails --- component ', courseDetails);
    this.courseService.saveCourse(courseDetails).subscribe((response) => {
      const responseBody = response.body;
      if (response.statusCode === 201) {
        Swal.fire('Success!', 'Course created successfully', 'success').then(()=>{
          this.router.navigate(['/courses/all'])
        });
      }
    });
  }

  get courseName() {
    return this.courseForm.get('courseName');
  }
  get courseCategoryId() {
    return this.courseForm.get('courseCategoryId');
  }
  // get description(){
  //   return this.courseForm.get('description')
  // }
  get courseDuration() {
    return this.courseForm.get('courseDuration');
  }
  get courseFormat() {
    return this.courseForm.get('courseFormat');
  }
  get courseLevel() {
    return this.courseForm.get('courseLevel');
  }
  get courseFees() {
    return this.courseForm.get('courseFees');
  }
  get prerequisites() {
    return this.courseForm.get('prerequisites');
  }
  get instructorIds() {
    return this.courseForm.get('instructorIds');
  }
  // get instructorBio() {
  //   return this.courseForm.get('instructorBio');
  // }
  get enrollment() {
    return this.courseForm.get('enrollment');
  }
  get startDate() {
    return this.courseForm.get('startDate');
  }
  get endDate() {
    return this.courseForm.get('endDate');
  }
}
