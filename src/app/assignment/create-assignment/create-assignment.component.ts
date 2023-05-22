import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { AssignmentViewModel } from 'src/app/ViewModel/AssignmentViewModel';
import { AssignmentService } from 'src/app/_services/assignment.service';
import { CommonService } from 'src/app/_services/common.service';
import { AssignmentModel } from 'src/app/model/AssignmentModel';
import Swal from 'sweetalert2';

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
  courses: any[] = [];
  instructors: any[] = [];
  selectedInstructor: number = 0
  assignmentModel!: AssignmentModel

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private assignmentService: AssignmentService,
    private commonService: CommonService,
    private router: Router
  ) { }

  ngOnInit() {
    this.assignmentForm = this.fb.group({
      title: ['', Validators.required],
      courseId: [null, Validators.required],
      instructorId: [null, Validators.required],
      maxPoint: ['', Validators.required],
      fileTypeAllowed: [''],
      maxFileSize: [''],
      dueDate: ['', Validators.required],
      fileName: [''],
      assignmentType: [''],
      // description: ['', Validators.required],
    });

    this.getAllInstructors();

    // this.route.params.subscribe((params) => {
    //   if (params['id']) {
    //     const assignmentId = params['id'];
    //     this.isEditing = true;
    //     this.assignment =
    //       this.assignmentService.getAssignmentById(assignmentId);

    //     if (this.assignment != null) {
    //       this.assignmentForm.patchValue({
    //         title: this.assignment.title,
    //         dueDate: this.assignment.duedate,
    //         maxPoint: this.assignment.id,
    //         assignmentType: this.assignment.assignmentType,
    //       });
    //     }
    //   } else {
    //     this.isEditing = false;
    //     this.assignment = null;
    //   }
    // });
  }

  submitAssignment() {
    console.log(this.assignmentForm.value)
    if (this.assignmentForm.invalid) {
      Swal.fire('Error!', 'Invalid form', 'error')
      return;
    }
    this.assignmentModel = this.assignmentForm.value
    this.assignmentModel.organisationId = 1
    this.assignmentModel.dueDate = moment(this.assignmentModel.dueDate, 'DD-MM-YYYY').format('DD-MM-YYYY')
    this.assignmentService.saveAssignment(this.assignmentModel).subscribe(response => {
      if (response.statusCode !== 201) {
        console.log(response)
        Swal.fire('Error!', 'Error occured while saving assignment', 'error')
        return
      }
      Swal.fire('Success!', 'Assignment created successfully', 'success').then(() => {
        this.router.navigate(['/assignment/view_assignments'])
      })
    })

  }
  getAllInstructors() {
    this.commonService.getAllInstructors().subscribe((response) => {
      if (response.statusCode !== 200) {
        console.log(response)
        return;
      }
      this.instructors = response.data;
    });
  }
  onInstructorSelectionChange() {
    // Fetch courses based on the selected instructor
    this.selectedInstructor = this.assignmentForm.get('instructorId')?.value;
    console.log(this.selectedInstructor)
    this.commonService.getAllCourseList(this.selectedInstructor).subscribe((response) => {
      if (response.statusCode !== 200) {
        console.log(response);
        return;
      }
      this.courses = response.data
    });
    this.selectedInstructor = 0
  }
  get title() {
    return this.assignmentForm.get('title');
  }
  // get description() {
  //   return this.assignmentForm.get('description');
  // }
  // get description(){
  //   return this.courseForm.get('description')
  // }
  get dueDate() {
    return this.assignmentForm.get('dueDate');
  }
  get maxPoint() {
    return this.assignmentForm.get('maxPoint');
  }
  get attachments() {
    return this.assignmentForm.get('fileName');
  }
  get fileTypeAllowed() {
    return this.assignmentForm.get('fileTypeAllowed');
  }
  get maxFileSize() {
    return this.assignmentForm.get('maxFileSize');
  }
  get assignmentType() {
    return this.assignmentForm.get('assignmentType');
  }
  get courseId() {
    return this.assignmentForm.get('courseId')
  }
  get instructorId() {
    return this.assignmentForm.get('instructorId')
  }

}
