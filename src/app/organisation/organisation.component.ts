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
  selector: 'app-organisation',
  templateUrl: './organisation.component.html',
  styleUrls: ['./organisation.component.css']
})
export class OrganisationComponent {
  organisationForm!: FormGroup;
  categoryList!: CategoryViewModel[];
  instructorList!: UsersDDLViewModel[];
  constructor(
    private formBuilder: FormBuilder,
    private courseService: CoursesService,
    private commonService: CommonService
  ) {}

  ngOnInit() {
    this.organisationForm = this.formBuilder.group({
      organisationName: ['', Validators.required],
      organisationAddress: [null, Validators.required],
      // description: ['', Validators.required],
      courseDuration: ['', [Validators.required, Validators.pattern('[0-9]+$')]],
      courseFormat: ['', Validators.required],
      courseLevel: ['', Validators.required],
      prerequisites: [''],
      instructorsIds: [null, Validators.required],
      // instructorBio: ['', Validators.required],
      // materials: [''],
      courseFees: ['', [Validators.required, Validators.pattern('[0-9]+$')]],
      subscriptionDate: ['', Validators.required],
      dueDate: ['', Validators.required],
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
    this.commonService.getAllInstructors().subscribe((instructors) => {
      this.instructorList = instructors;
    });
  }

  onSubmit() {
    console.log(this.organisationForm.value);

    if (this.organisationForm.valid) {
      this.courseService.saveCourse(this.organisationForm.value).subscribe({
        next: (v) => {
          Swal.fire('Success!', 'Course created successfully', 'success');
        },
        error: (e) => console.log(e),
      });
    }
  }

  get organisationName() {
    return this.organisationForm.get('organisationName');
  }
  get organisationAddress() {
    return this.organisationForm.get('organisationAddress');
  }
  get subscriptionDate() {
    return this.organisationForm.get('subscriptionDate');
  }
  get dueDate() {
    return this.organisationForm.get('dueDate');
  }
}
