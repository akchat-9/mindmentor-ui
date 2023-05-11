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

  
}
