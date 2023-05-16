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
      courseName: ['', Validators.required],
      courseCategoryId: [null, Validators.required],
      // description: ['', Validators.required],
      courseDuration: ['', [Validators.required, Validators.pattern('[0-9]+$')]],
      courseFormat: ['', Validators.required],
      courseLevel: ['', Validators.required],
      prerequisites: [''],
      instructorsIds: [null, Validators.required],
      // instructorBio: ['', Validators.required],
      // materials: [''],
      courseFees: ['', [Validators.required, Validators.pattern('[0-9]+$')]],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      enrollment: ['', [Validators.required, Validators.pattern('[0-9]+$')]],
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
}
