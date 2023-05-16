import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AssignmentViewModel } from 'src/app/ViewModel/AssignmentViewModel';
import { AssignmentService } from 'src/app/_services/assignment.service';

@Component({
  selector: 'app-create-assignment',
  templateUrl: './create-assignment.component.html',
  styleUrls: ['./create-assignment.component.css'],
})
export class CreateAssignmentComponent {
  assignmentForm!: FormGroup;
  assignment!: AssignmentViewModel | null;
  isEditing!: boolean;
  defaultSelected = 'default';
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private assignmentService: AssignmentService
  ) {}

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

    this.route.params.subscribe((params) => {
      if (params['id']) {
        const assignmentId = params['id'];
        this.isEditing = true;
        this.assignment =
          this.assignmentService.getAssignmentById(assignmentId);

        if (this.assignment != null) {
          this.assignmentForm.patchValue({
            title: this.assignment.title,
            dueDate: this.assignment.duedate,
            maxPoints: this.assignment.point,
            assignmentType: this.assignment.type,
          });
        }
      } else {
        this.isEditing = false;
        this.assignment = null;
      }
    });
  }
  get title() {
    return this.assignmentForm.get('title');
  }
  get description() {
    return this.assignmentForm.get('description');
  }
  // get description(){
  //   return this.courseForm.get('description')
  // }
  get dueDate() {
    return this.assignmentForm.get('dueDate');
  }
  get maxPoints() {
    return this.assignmentForm.get('maxPoints');
  }
  get attachments() {
    return this.assignmentForm.get('attachments');
  }
  get allowedFileTypes() {
    return this.assignmentForm.get('allowedFileTypes');
  }
  get maxFileSize() {
    return this.assignmentForm.get('maxFileSize');
  }
  get assignmentType() {
    return this.assignmentForm.get('assignmentType');
  }
  submitAssignment() {
    console.log(this.assignmentForm.value);
  }
}
