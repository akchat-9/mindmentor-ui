import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CoursesViewModel } from 'src/app/ViewModel/CoursesViewModel';
import { CoursesService } from 'src/app/_services/courses.service';

@Component({
  selector: 'app-course-settings',
  templateUrl: './course-settings.component.html',
  styleUrls: ['./course-settings.component.css'],
})
export class CourseSettingsComponent {
  courseForm!: FormGroup;
  course!: CoursesViewModel | null;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private courseService: CoursesService
  ) {}

  ngOnInit() {
    this.courseForm = this.formBuilder.group({
      name: ['', Validators.required],
      department: ['', Validators.required],
      description: ['', Validators.required],
      duration: ['', [Validators.required, Validators.pattern('[0-9]+$')]],
      format: ['', Validators.required],
      level: ['', Validators.required],
      prerequisites: [''],
      instructorName: ['', Validators.required],
      instructorBio: ['', Validators.required],
      // materials: [''],
      price: ['', [Validators.required, Validators.pattern('[0-9]+$')]],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      maxEnrollment: ['', [Validators.required, Validators.pattern('[0-9]+$')]],
    });

    this.route.params.subscribe((params) => {
      if (params['id']) {
        const courseId = params['id'];
        console.log(courseId);
        this.course = this.courseService.getCoursesById(courseId);
        if (this.course != null) {
          this.courseForm.patchValue({
            name: this.course.name,
            department: this.course.category,
            duration: this.course.duration,
            format: this.course.format,
            level: this.course.level,
            instructorName: this.course.instructor,
            price: this.course.fee,
          });
        }
      }
    });
  }

  get name() {
    return this.courseForm.get('name');
  }
  get department() {
    return this.courseForm.get('department');
  }
  // get description(){
  //   return this.courseForm.get('description')
  // }
  get duration() {
    return this.courseForm.get('duration');
  }
  get format() {
    return this.courseForm.get('format');
  }
  get level() {
    return this.courseForm.get('level');
  }
  get price() {
    return this.courseForm.get('price');
  }
  get prerequisites() {
    return this.courseForm.get('prerequisites');
  }
  get instructorName() {
    return this.courseForm.get('instructorName');
  }
  get instructorBio() {
    return this.courseForm.get('instructorBio');
  }
  get maxEnrollment() {
    return this.courseForm.get('maxEnrollment');
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
