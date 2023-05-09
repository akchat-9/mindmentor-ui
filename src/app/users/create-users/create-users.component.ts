import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators,NgForm } from '@angular/forms';

@Component({
  selector: 'app-create-users',
  templateUrl: './create-users.component.html',
  styleUrls: ['./create-users.component.css'],
})
export class CreateUsersComponent {
  registrationForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.registrationForm = this.formBuilder.group({
      firstName: ['', [Validators.required,Validators.pattern('[a-z,A-Z]+$')]],
      lastName: ['', [Validators.required,Validators.pattern('[a-z,A-Z]+$')]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('[0-9]+$')]],
      address: ['', Validators.required],
      gender: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      // occupation: ['', Validators.required],
      // educationLevel: ['', Validators.required],
      // coachingProgram: ['', Validators.required],
      joiningDate: ['', Validators.required],
      userName: ['', Validators.required],
      role:['', Validators.required]
      // emergencyContactName: ['', Validators.required],
      // emergencyContactPhone: ['', Validators.required],
      // healthInformation: [''],
      // priorCoachingExperience: [''],
    });
  }

  get firstName(){
    return this.registrationForm.get('firstName')
  }
  get lastName(){
    return this.registrationForm.get('lastName')
  }
  get email(){
    return this.registrationForm.get('email')
  }
  get phone(){
    return this.registrationForm.get('phone')
  }
  get address(){
    return this.registrationForm.get('address')
  }
  get gender(){
    return this.registrationForm.get('gender')
  }
  get role(){
    return this.registrationForm.get('role')
  }
  get dateOfBirth(){
    return this.registrationForm.get('dateOfBirth')
  }
  get joiningDate(){
    return this.registrationForm.get('joiningDate')
  }
  get userName(){
    return this.registrationForm.get('userName')
  }


  onSubmit() {
    console.log(this.registrationForm.value);
  }
}
