import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { StateDDLViewModel } from 'src/app/ViewModel/StateDDLViewModel';
import { CommonService } from 'src/app/_services/common.service';
import { UserService } from 'src/app/_services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-users',
  templateUrl: './create-users.component.html',
  styleUrls: ['./create-users.component.css'],
})
export class CreateUsersComponent {
  registrationForm!: FormGroup;
  stateList!: StateDDLViewModel[];
  cityList!: StateDDLViewModel[];
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private commonService: CommonService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registrationForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.pattern('[a-z,A-Z]+$')]],
      lastName: ['', [Validators.required, Validators.pattern('[a-z,A-Z]+$')]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('[0-9]+$')]],
      address: ['', Validators.required],
      gender: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      stateId: [null, Validators.required],
      cityId: [null, Validators.required],
      joiningDate: ['', Validators.required],
      role: ['', Validators.required],
    });

    this.getStates();
    this.getCities();
  }

  getStates() {
    this.commonService.getStates().subscribe((states) => {
      this.stateList = states;
    });
  }

  getCities() {
    this.commonService.getCity().subscribe((cities) => {
      this.cityList = cities;
    });
  }

  get firstName() {
    return this.registrationForm.get('firstName');
  }
  get lastName() {
    return this.registrationForm.get('lastName');
  }
  get email() {
    return this.registrationForm.get('email');
  }
  get phone() {
    return this.registrationForm.get('phone');
  }
  get address() {
    return this.registrationForm.get('address');
  }
  get stateId() {
    return this.registrationForm.get('stateId');
  }
  get cityId() {
    return this.registrationForm.get('cityId');
  }
  get gender() {
    return this.registrationForm.get('gender');
  }
  get role() {
    return this.registrationForm.get('role');
  }
  get dateOfBirth() {
    return this.registrationForm.get('dateOfBirth');
  }
  get joiningDate() {
    return this.registrationForm.get('joiningDate');
  }
  get userName() {
    return this.registrationForm.get('userName');
  }

  onSubmit() {
    if (this.registrationForm.valid) {
      console.log('SAVE USER:      ', this.registrationForm.value);
      console.log(
        'Selected text:      ',
        this.registrationForm.get('role')?.value
      );
      let message = this.userService.SaveUserDetails(
        this.registrationForm.value
      );
      if (message == 'failed' || message == '') {
        Swal.fire('Failed!', 'User not created', 'error');
      } else {
        Swal.fire('Succes!', 'User created successfully', 'success');
        this.router.navigate(['/users/all']);
      }
    }
  }
}
