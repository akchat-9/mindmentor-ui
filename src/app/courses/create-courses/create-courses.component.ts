import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-courses',
  templateUrl: './create-courses.component.html',
  styleUrls: ['./create-courses.component.css'],
})
export class CreateCoursesComponent {
  courseForm!: FormGroup;
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.courseForm = this.formBuilder.group({
      name: ['', Validators.required],
      department: ['', Validators.required],
      description: ['', Validators.required],
      length: ['', Validators.required],
      format: ['', Validators.required],
      level: ['', Validators.required],
      prerequisites: [''],
      instructorName: ['', Validators.required],
      instructorBio: ['', Validators.required],
      materials: [''],
      price: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      maxEnrollment: ['', Validators.required],
    });
  }

  onSubmit() {
    console.log(this.courseForm.value);
  }
}
