import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { CategoryViewModel } from 'src/app/ViewModel/CategoryViewModel';
import { CourseViewModel } from 'src/app/ViewModel/CourseViewModel';
import { UsersDDLViewModel } from 'src/app/ViewModel/UsersDDLViewModel';
import { CommonService } from 'src/app/_services/common.service';
import { CoursesService } from 'src/app/_services/courses.service';
import { CourseModel } from 'src/app/model/CourseModel';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-course-settings',
  templateUrl: './course-settings.component.html',
  styleUrls: ['./course-settings.component.css'],
})
export class CourseSettingsComponent {
  courseForm!: FormGroup;
  courseData!: CourseViewModel | null;
  categoryList!: CategoryViewModel[];
  instructorList!: UsersDDLViewModel[];
  courseId: number = 0;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private courseService: CoursesService,
    private router: Router,
    private commonService: CommonService
  ) { }

  ngOnInit() {
    this.courseForm = this.formBuilder.group({
      courseName: ['', Validators.required],
      courseCategoryId: [null, Validators.required],
      courseDescription: ['', Validators.required],
      courseDuration: ['', [Validators.required, Validators.pattern('[0-9]+$')]],
      courseFormat: [null, Validators.required],
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

    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.courseId = +params['id'];
        console.log(this.courseId);
        this.courseService.getCourseById(this.courseId).subscribe(response => {
          console.log('course: ', response)
          if (response.statusCode === 200) {
            if (response.data !== null) {
              this.courseData = response.data
              this.courseForm.patchValue({
                courseName: this.courseData.courseName,
                instructorIds: this.courseData.instructorIds[0],
                courseFormat: this.courseData.courseFormat,
                courseDuration: this.courseData.courseDuration,
                courseFees: this.courseData.courseFees,
                courseLevel: this.courseData.courseLevel,
                enrollment: this.courseData.enrollment,
                endDate: moment(this.courseData.endDate, 'YYYY-MM-DD').format('YYYY-MM-DD'),
                prerequisites: this.courseData.prerequisites,
                startDate: moment(this.courseData.startDate, 'YYYY-MM-DD').format('YYYY-MM-DD'),
                courseDescription: this.courseData.courseDescription,
                courseCategoryId: this.courseData.courseCategoryId,
              });
            }
          }
        });
      }
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
    this.courseService.updateCourseDetails(courseDetails, this.courseId).subscribe(response => {
      if (response.statusCode !== 200) {
        console.log(response)
        Swal.fire('Error!', 'Error while updating course details', 'error')
        return
      }
      Swal.fire('Error!', 'Course details updated successfully', 'success').then(() => {
        this.router.navigate(['/courses/all'])
      })
    })

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
