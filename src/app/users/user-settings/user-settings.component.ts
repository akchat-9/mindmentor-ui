import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { UserViewModel } from 'src/app/ViewModel/UsersViewModel';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.css'],
})
export class UserSettingsComponent {
  registrationForm!: FormGroup;
  user!: UserViewModel | null;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private route: ActivatedRoute
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
      joiningDate: ['', Validators.required],
      userName: ['', Validators.required],
      role: ['', Validators.required],
    });

    this.route.params.subscribe((params) => {
      if (params['id']) {
        const userId = params['id'];
        this.user = this.userService.getUsersById(userId);
        console.log(this.user)
        if (this.user != null) {
          this.registrationForm.patchValue({
            firstName: this.user.name,
            lastName: this.user.name,
            email: this.user.email,
            joiningDate: moment(this.user.joiningDate).format('YYYY-MM-DD'),
            username: this.user.username,
            role: this.user.role,
          });
        }
      }
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
    console.log(this.registrationForm.value);
  }
}
