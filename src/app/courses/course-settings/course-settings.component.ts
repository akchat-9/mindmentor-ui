import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CourseViewModel } from 'src/app/ViewModel/CourseViewModel';
import { CoursesService } from 'src/app/_services/courses.service';
import { CourseModel } from 'src/app/model/CourseModel';

@Component({
  selector: 'app-course-settings',
  templateUrl: './course-settings.component.html',
  styleUrls: ['./course-settings.component.css'],
})
export class CourseSettingsComponent {
  courseForm!: FormGroup;
  courseData!: CourseViewModel | null;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private courseService: CoursesService
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
      instructorsIds: [null, Validators.required],
      courseFees: ['', [Validators.required, Validators.pattern('[0-9]+$')]],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      enrollment: ['', [Validators.required, Validators.pattern('[0-9]+$')]],
    });

    this.route.params.subscribe((params) => {
      if (params['id']) {
        const courseId = params['id'];
        console.log(courseId);
        this.courseService.getCourseById(courseId).subscribe(response => {
          console.log('course: ', response)
          if (response.statusCode === 200) {
            if (response.data !== null) {
              this.courseData = response.data
              this.courseForm.patchValue({
                courseName: this.courseData.courseName,
                instructorsIds: this.courseData.instructorId[0],
                courseFormat: this.courseData.courseFormat,
                courseDuration: this.courseData.courseDuration,
                courseFees: this.courseData.courseFees,
                courseLevel: this.courseData.courseLevel,
                enrollment: this.courseData.enrollment,
                endDate: this.courseData.endDate,
                prerequisites: this.courseData.prerequisites,
                startDate: this.courseData.startDate, 
                courseDescription: this.courseData.courseDescription,
                courseCategoryId: this.courseData.courseCategoryId,
              });
            }
          }
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
  get instructorsIds() {
    return this.courseForm.get('instructorsIds');
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

  onSubmit() {
    console.log(this.courseForm.value);
  }
}
