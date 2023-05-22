import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { UserViewModel } from 'src/app/ViewModel/UserViewModel';
import { UserService } from 'src/app/_services/user.service';
import { UserModel } from 'src/app/model/UserModel';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.css'],
})
export class UserSettingsComponent {
  registrationForm!: FormGroup;
  user!: UserViewModel | null;
  userDetails!: UserModel;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) { }
  ngOnInit(): void {
    this.registrationForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.pattern('[a-z,A-Z]+$')]],
      lastName: ['', [Validators.required, Validators.pattern('[a-z,A-Z]+$')]],
      emailAddress: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern('[0-9]+$')]],
      address: ['', Validators.required],
      password: ['', Validators.required],
      gender: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      joiningDate: ['', Validators.required],
      roleName: [null, Validators.required],
      stateId: [null, Validators.required],
      cityId: [null, Validators.required]
    });

    this.route.params.subscribe((params) => {
      if (params['id']) {
        const userId = params['id'];
        this.userService.getUserById(userId).subscribe(response => {
          console.log('User setting response: ', response);
          if (response.statusCode !== 200) {
            console.log('Error in course setting: ', response)
            return;
          }
          else {
            this.user = response.data;
            if (this.user != null) {
              this.registrationForm.patchValue({
                firstName: this.user.firstName,
                lastName: this.user.lastName,
                emailAddress: this.user.emailAddress,
                joiningDate: this.user.joiningDate,
                password: this.user.password,
                roleName: this.user.roleName,
                dateOfBirth: this.user.dateOfBirth,
                phoneNumber: this.user.phoneNumber,
                cityId: this.user.cityId,
                stateId: this.user.stateId,
                address: this.user.address,
                gender: this.user.gender
              });
            }
          }
        })
      }
    });
  }

  onSubmit() {
    if (this.registrationForm.valid) {
      console.log('User seting update: ', this.registrationForm.value);
      let userDetails: UserModel = this.registrationForm.value;
      this.userService.saveUserDetails(userDetails).subscribe((response) => {
        if (response.statusCode === 201) {
          Swal.fire('Success!', 'User details updated successfully', 'success').then(
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

  get firstName() {
    return this.registrationForm.get('firstName');
  }
  get password() {
    return this.registrationForm.get('password');
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
  get gender() {
    return this.registrationForm.get('gender');
  }
  get roleName() {
    return this.registrationForm.get('roleName');
  }
  get dateOfBirth() {
    return this.registrationForm.get('dateOfBirth');
  }
  get joiningDate() {
    return this.registrationForm.get('joiningDate');
  }
  get stateId() {
    return this.registrationForm.get('stateId');
  }
  get cityId() {
    return this.registrationForm.get('cityId');
  }

}
