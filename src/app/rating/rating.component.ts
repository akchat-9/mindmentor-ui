import { Component, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { FeedbackViewModel } from 'src/app/ViewModel/FeedbackViewModel';
import { FeedbackService } from 'src/app/_services/feedback.service';
import Swal from 'sweetalert2';
import { CommonService } from '../_services/common.service';
import { UsersDDLViewModel } from '../ViewModel/UsersDDLViewModel';
import { FeedbackModel } from '../model/FeedbackModel';
import { CourseDDLViewModel } from '../ViewModel/CourseDDLViewModel';
import { ReviewModal } from '../model/ReviewModal';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent {
  reviewForm!: FormGroup
  review!: ReviewModal | null;
  feedbackList!: FeedbackViewModel[];
  courses!: CourseDDLViewModel[]
  instructors!: UsersDDLViewModel[]
  feedbackModel!: FeedbackModel;
  modalElement!: ElementRef | null;
  organisationId: number = 1
  sortDirection: 'asc' | 'desc' = 'asc';
  currentPage = 1;
  itemsPerPage = 10;
  totalItems = 0;
  closeResult = '';
  ratingValue: number = 0;
  selectedInstructor: number = 0;

  constructor(private formBuilder: FormBuilder,
    private feedbackService: FeedbackService,
    private modalService: NgbModal,
    private commonService: CommonService,
    private router: Router) { }

  ngOnInit() {

    this.reviewForm = this.formBuilder.group({
      instructorId: [null, Validators.required],
      courseId: [null, Validators.required],
      rating: [null, Validators.required],
      review: ['', Validators.required],
    });

    this.getAllFeedback();
    // this.getAllCourseList();
    this.getAllInstructors();
  }

  onSubmit() {
    if (this.reviewForm.invalid) {
      console.log(this.reviewForm.value);
      return;
    }

    this.feedbackModel = this.reviewForm.value
    this.feedbackModel.organisationId = 1
    console.log(this.feedbackModel);

    this.feedbackService.saveFeedback(this.feedbackModel).subscribe(response => {
      if (response.statusCode !== 201) {
        Swal.fire('Error', 'Error taking your feedback', 'error')
        console.log(response)
        return;
      }
      Swal.fire('Success!', 'Thanks for your feedback', 'success').then(() => {
        this.clearForm();
        document.getElementById('createFeedback')?.classList.remove('show')
        this.router.navigate(['/rating'])
      })

    })
  }

  clearForm() {
    this.reviewForm.reset();
    this.ratingValue = 0;
  }

  onPageChange(event: any): void {
    this.currentPage = event;
  }

  // getAllCourseList() {
  //   this.commonService.getAllCourseList(this.organisationId).subscribe(response => {
  //     this.courses = response
  //   })
  // }

  onInstructorSelectionChange() {
    // Fetch courses based on the selected instructor
    this.selectedInstructor = this.reviewForm.get('instructorId')?.value;
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

  // getAllInstructors() {
  //   this.commonService.getAllInstructors().subscribe(response => {
  //     this.instructors = response
  //   })
  // }

  getAllInstructors() {
    this.commonService.getAllInstructors().subscribe((response) => {
      if (response.statusCode !== 200) {
        console.log(response)
        return;
      }
      this.instructors = response.data;
    });
  }

  getAllFeedback() {
    this.feedbackService.getAllFeedbacks().subscribe(response => {
      if (response.statusCode !== 200) {
        console.log(response);
        return;
      }
      this.feedbackList = response.data;
      this.totalItems = this.feedbackList.length;
    })
  }

  onRatingChange(rating: number) {
    console.log(rating)
    this.ratingValue = rating;
    this.reviewForm.patchValue({
      rating: rating
    })
  }

  sortByRating() {
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';

    this.feedbackList.sort((a, b) => {
      if (this.sortDirection === 'asc') {
        return a.rating - b.rating;
      } else {
        return b.rating - a.rating;
      }
    });
  }
}
