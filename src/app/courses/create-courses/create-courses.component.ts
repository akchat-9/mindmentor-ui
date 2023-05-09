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
      // description: ['', Validators.required],
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
  }

get name(){
  return this.courseForm.get('name')
}
get department(){
  return this.courseForm.get('department')
}
// get description(){
//   return this.courseForm.get('description')
// }
get duration(){
  return this.courseForm.get('duration')
}
get format(){
  return this.courseForm.get('format')
}
get level(){
  return this.courseForm.get('level')
}
get price(){
  return this.courseForm.get('price')
}
get prerequisites(){
  return this.courseForm.get('prerequisites')
}
get instructorName(){
  return this.courseForm.get('instructorName')
}
get instructorBio(){
  return this.courseForm.get('instructorBio')
}
get maxEnrollment(){
  return this.courseForm.get('maxEnrollment')
}
get startDate(){
  return this.courseForm.get('startDate')
}
get endDate(){
  return this.courseForm.get('endDate')
}

  onSubmit() {
    console.log(this.courseForm.value);
  }
}
