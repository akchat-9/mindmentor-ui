import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { error } from 'jquery';
import { instructors } from 'src/app/FakeDb/teachers';
import { CategoryViewModel } from 'src/app/ViewModel/CategoryViewModel';
import { CoursesViewModel } from 'src/app/ViewModel/CoursesViewModel';
import { UsersDDLViewModel } from 'src/app/ViewModel/UsersDDLViewModel';
import { CommonService } from 'src/app/_services/common.service';
import { CoursesService } from 'src/app/_services/courses.service';
import Swal from 'sweetalert2';

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
    private commonService: CommonService
  ) {}

  ngOnInit() {
    this.courseForm = this.formBuilder.group({
      name: ['', Validators.required],
      category: [null, Validators.required],
      // description: ['', Validators.required],
      duration: ['', [Validators.required, Validators.pattern('[0-9]+$')]],
      format: ['', Validators.required],
      level: ['', Validators.required],
      prerequisites: [''],
      instructor: [null, Validators.required],
      instructorBio: ['', Validators.required],
      // materials: [''],
      price: ['', [Validators.required, Validators.pattern('[0-9]+$')]],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      maxEnrollment: ['', [Validators.required, Validators.pattern('[0-9]+$')]],
    });
    this.getAllCategories();
    this.getAllInstrutors();
  }

  getAllCategories() {
    this.courseService.getAllCategories().subscribe((categories) => {
      this.categoryList = categories;
    });
  }
  getAllInstrutors() {
    this.commonService.getAllInstrutors().subscribe((instructors) => {
      this.instructorList = instructors;
    });
  }

  onSubmit() {
    console.log(this.courseForm.value);

    if (this.courseForm.valid) {
      this.courseService.saveCourse(this.courseForm.value).subscribe({
        next: (v) => {
          Swal.fire('Success!', 'Course created successfully', 'success');
        },
        error: (e) => console.log(e),
      });
    }
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
  get instructor() {
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
}
