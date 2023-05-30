import { Component, ElementRef } from '@angular/core';
import { FeedbackViewModel } from 'src/app/ViewModel/FeedbackViewModel';
import { FeedbackService } from 'src/app/_services/feedback.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReviewModal } from 'src/app/model/ReviewModal';
import { CommonService } from 'src/app/_services/common.service';
import { CourseDDLViewModel } from 'src/app/ViewModel/CourseDDLViewModel';
import { UsersDDLViewModel } from 'src/app/ViewModel/UsersDDLViewModel';
import { FeedbackModel } from 'src/app/model/FeedbackModel';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-view-feedback',
  templateUrl: './view-feedback.component.html',
  styleUrls: ['./view-feedback.component.css']
})
export class ViewFeedbackComponent {

  // reviewForm!: FormGroup
  // review!: ReviewModal | null;
  // feedbackList!: FeedbackViewModel[];
  // courses!: CourseDDLViewModel[]
  // instructors!: UsersDDLViewModel[]
  // feedbackModel!: FeedbackModel;
  // modalElement!: ElementRef | null;
  // organisationId: number = 1
  // sortDirection: 'asc' | 'desc' = 'asc';
  // currentPage = 1;
  // itemsPerPage = 10;
  // totalItems = 0;
  // closeResult = '';
  // ratingValue: number = 0;

  // constructor(private formBuilder: FormBuilder,
  //   private feedbackService: FeedbackService,
  //   private modalService: NgbModal,
  //   private commonService: CommonService) { }

  // ngOnInit() {

  //   this.reviewForm = this.formBuilder.group({
  //     instructorId: [null, Validators.required],
  //     courseId: [null, Validators.required],
  //     rating: [null, Validators.required],
  //     review: ['', Validators.required],
  //   });

  //   // this.getAllFeedback();
  //   this.getAllCourseList();
  //   this.getAllInstructors();
  // }

  // onSubmit() {
  //   if (this.reviewForm.invalid) {
  //     console.log(this.reviewForm.value);
  //     return;
  //   }
    
  //   this.feedbackModel = this.reviewForm.value
  //   this.feedbackModel.organisationId = 1
  //   console.log(this.feedbackModel);

  //   this.feedbackService.saveFeedback(this.feedbackModel).subscribe(response => {
  //     if (response.statusCode !== 201) {
  //       Swal.fire('Error', 'Error taking your feedback', 'error')
  //       console.log(response)
  //       return;
  //     }
  //     Swal.fire('Success!', 'Thanks for your feedback', 'success').then(() => {
  //       this.clearForm();
  //       document.getElementById('createFeedback')?.classList.remove('show')
  //     })

  //   })
  // }

  // clearForm() {
  //   this.reviewForm.reset();
  //   this.ratingValue = 0;
  // }

  // onPageChange(event: any): void {
  //   this.currentPage = event;
  // }

  // getAllCourseList() {
  //   this.commonService.getAllCourseList(this.organisationId).subscribe(response => {
  //     this.courses = response
  //   })
  // }

  // getAllInstructors() {
  //   this.commonService.getAllInstructors().subscribe(response => {
  //     this.instructors = response
  //   })
  // }

  // getAllFeedback() {
  //   this.feedbackService.getAllFeedbacks().subscribe(feedbacks => {
  //     this.feedbackList = feedbacks
  //     this.totalItems = this.feedbackList.length;
  //   })
  // }

  // onRatingChange(rating: number) {
  //   console.log(rating)
  //   this.ratingValue = rating;
  //   this.reviewForm.patchValue({
  //     rating: rating
  //   })
  // }

  // sortByRating() {
  //   this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';

  //   this.feedbackList.sort((a, b) => {
  //     if (this.sortDirection === 'asc') {
  //       return a.rating - b.rating;
  //     } else {
  //       return b.rating - a.rating;
  //     }
  //   });
  // }
}
