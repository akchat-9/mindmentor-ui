import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-assignment',
  templateUrl: './create-assignment.component.html',
  styleUrls: ['./create-assignment.component.css'],
})
export class CreateAssignmentComponent {
  assignmentForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.assignmentForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      dueDate: ['', Validators.required],
      assignmentType: ['', Validators.required],
      maxPoints: ['', Validators.required],
      materialsNeeded: [''],
      attachments: [''],
      allowedFileTypes: [''],
      maxFileSize: [''],
      submissionDeadline: [''],
      gradingCriteria: [''],
      instruction: [''],
      notes: [''],
    });
  }

  submitAssignment() {
    console.log(this.assignmentForm.value);
  }
}
