import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-assignment',
  templateUrl: './create-assignment.component.html',
  styleUrls: ['./create-assignment.component.css'],
})
export class CreateAssignmentComponent {
  assignmentForm!: FormGroup;
defaultSelected= 'default'
  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.assignmentForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      dueDate: ['', Validators.required],
      maxPoints: ['', Validators.required],
      attachments: [''],
      allowedFileTypes: [''],
      maxFileSize: [''],
      assignmentType: [''],
    });
  }
  get title(){
    return this.assignmentForm.get('title')
  }
  get description(){
    return this.assignmentForm.get('description')
  }
  // get description(){
  //   return this.courseForm.get('description')
  // }
  get dueDate(){
    return this.assignmentForm.get('dueDate')
  }
  get maxPoints(){
    return this.assignmentForm.get('maxPoints')
  }
  get attachments(){
    return this.assignmentForm.get('attachments')
  }
  get allowedFileTypes(){
    return this.assignmentForm.get('allowedFileTypes')
  }
  get maxFileSize(){
    return this.assignmentForm.get('maxFileSize')
  }
  get assignmentType(){
    return this.assignmentForm.get('assignmentType')
  }
  submitAssignment() {
    console.log(this.assignmentForm.value);
  }
}
