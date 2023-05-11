import { OwlOptions } from 'ngx-owl-carousel-o';
import { Component } from '@angular/core';


@Component({
  selector: 'app-view-feedback',
  templateUrl: './view-feedback.component.html',
  styleUrls: ['./view-feedback.component.css']
})
export class ViewFeedbackComponent {
  testimonials = [
    {
      name: 'John Doe',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce at augue in tortor lobortis eleifend nec eu nisi. Sed euismod ligula vitae suscipit convallis.',
      designation: 'Teacher'
    },
    {
      name: 'Jane Doe',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce at augue in tortor lobortis eleifend nec eu nisi. Sed euismod ligula vitae suscipit convallis.',
      designation: 'Teacher'
    },
    {
      name: 'Joe Bloggs',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce at augue in tortor lobortis eleifend nec eu nisi. Sed euismod ligula vitae suscipit convallis.',
      designation: 'Teacher'
    }
  ];

    carouselOptions: OwlOptions = {
      loop: true,
      mouseDrag: true,
      touchDrag: true,
      pullDrag: true,
      dots: true,
      navSpeed: 700,
      navText: ['', ''],
      responsive: {
        0: {
          items: 1
        },
        400: {
          items: 1
        },
        740: {
          items: 2
        },
        940: {
          items: 3
        }
      },
      nav: false
    }
  
  
}
