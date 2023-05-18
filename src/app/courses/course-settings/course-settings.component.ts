import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CoursesViewModel } from 'src/app/ViewModel/CoursesViewModel';
import { CoursesService } from 'src/app/_services/courses.service';
import { CourseModel } from 'src/app/model/CourseModel';

@Component({
  selector: 'app-course-settings',
  templateUrl: './course-settings.component.html',
  styleUrls: ['./course-settings.component.css'],
})
export class CourseSettingsComponent {
  courseForm!: FormGroup;
  course!: CourseModel | null;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private courseService: CoursesService
  ) { }

  ngOnInit() {
    this.courseForm = this.formBuilder.group({
      courseName: ['', Validators.required],
      courseCategoryId: ['', Validators.required],
      courseDescription: ['', Validators.required],
      courseDuration: ['', [Validators.required, Validators.pattern('[0-9]+$')]],
      courseFormat: ['', Validators.required],
      courseLevel: ['', Validators.required],
      prerequisites: [''],
      instructorsIds: ['', Validators.required],
      // instructorBio: ['', Validators.required],
      // materials: [''],
      courseFees: ['', [Validators.required, Validators.pattern('[0-9]+$')]],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      enrollment: ['', [Validators.required, Validators.pattern('[0-9]+$')]],
    });

    // this.route.params.subscribe((params) => {
    //   if (params['id']) {
    //     const courseId = params['id'];
    //     console.log(courseId);
    //     // this.course = this.courseService.getCoursesById(courseId);
    //     if (this.course != null) {
    //       this.courseForm.patchValue({
    //         courseName: this.course.courseName,
    //         courseCategoryId: this.course.courseCategoryId,
    //         courseDuration: this.course.courseDuration,
    //         courseFormat: this.course.courseFormat,
    //         courseLevel: this.course.courseLevel,
    //         instructorsIds: this.course.instructorsIds,
    //         courseFees: this.course.courseFees,
    //       });
    //     }
    //   }
    // });
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
