import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { CityDDLViewModel } from 'src/app/ViewModel/CityDDLViewModel';
import { StateDDLViewModel } from 'src/app/ViewModel/StateDDLViewModel';
import { CommonService } from 'src/app/_services/common.service';
import { UserService } from 'src/app/_services/user.service';
import { UserModel } from 'src/app/model/UserModel';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-users',
  templateUrl: './create-users.component.html',
  styleUrls: ['./create-users.component.css'],
})
export class CreateUsersComponent {
  registrationForm!: FormGroup;
  stateList!: StateDDLViewModel[];
  cityList!: CityDDLViewModel[];
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private commonService: CommonService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.registrationForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.pattern('[a-z,A-Z]+$')]],
      lastName: ['', [Validators.required, Validators.pattern('[a-z,A-Z]+$')]],
      emailAddress: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      address: ['', Validators.required],
      gender: ['', Validators.required],
      password: ['', [Validators.required]],
      dateOfBirth: ['', Validators.required],
      stateId: [null, Validators.required],
      cityId: [null, Validators.required],
      joiningDate: ['', Validators.required],
      role: ['', Validators.required],
    });

    this.getStates();
    this.getCities();
  }

  onSubmit() {
    if (this.registrationForm.invalid) {
      console.warn('REGISTRATION FORM VALUE INVALID: ', this.registrationForm.value)
      Swal.fire('Error', 'Form is not valid', 'error')
    }
    else {
      console.log('SAVE USER: ', this.registrationForm.value);
      let userDetails: UserModel = {
        ...this.registrationForm.value,
        dateOfBirth: moment(this.registrationForm.get('dateOfBirth')?.value, 'DD-MM-YYYY').format('DD-MM-YYYY'),
        joiningDate: moment(this.registrationForm.get('joiningDate')?.value, 'DD-MM-YYYY').format('DD-MM-YYYY'),
      };
      userDetails.organisationId = 1;
      this.userService.saveUserDetails(userDetails).subscribe((response) => {
        if (response.statusCode === 201) {
          Swal.fire('Success!', 'Registration successful', 'success').then(
            (result) => {
              if (result.isConfirmed) {
                this.router.navigate(['/users/all']);
              } else {
                setTimeout(() => {
                  Swal.close();
                  this.router.navigate(['/users/all']);
                }, 5000);
              }
            }
          );
        } else {
          Swal.fire('Error!', `${response.message}`, 'error')
        }
      });
    }
  }

  getStates() {
    this.commonService.getStates().subscribe((response) => {
      if (response.statusCode !== 200) {
        console.log('State list: ', response);
        return;
      }
      this.stateList = response.data
    });
  }

  getCities() {
    this.commonService.getCity().subscribe((response) => {
      if (response.statusCode !== 200) {
        console.log('city list: ', response);
        return;
      }
      this.cityList = response.data
    });
  }

  get password() {
    return this.registrationForm.get('password');
  }
  get firstName() {
    return this.registrationForm.get('firstName');
  }
  get lastName() {
    return this.registrationForm.get('lastName');
  }
  get emailAddress() {
    return this.registrationForm.get('emailAddress');
  }
  get phoneNumber() {
    return this.registrationForm.get('phoneNumber');
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
}
