import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';
import { LocalStorageService } from 'src/app/_services/local-storage.service';
import { ResponseStatusModel } from 'src/app/model/ResponseStatusModel';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  responseStatus!: ResponseStatusModel;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private storate: LocalStorageService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.pattern('[a-z,A-Z]+$')]],
      // email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

get username(){
  return this.loginForm.get('username');
}
get password(){
  return this.loginForm.get('password');
}

  login() {
    this.responseStatus = { StatusCode: 0, Message: 'Redirecting...' };
    // this.router.navigate(['/dashboard']);
    this.authService.login(this.loginForm.value).subscribe({
      next: (res) => {
        console.log(res);
        this.responseStatus = { StatusCode: 200, Message: 'Login successful' };
        Swal.fire('Success!', 'Login successful', 'success');
        this.storate.saveToken(res.accessToken);
        this.storate.saveUser(res);
        // this.userService.UpdateMenu.next();
        this.router.navigate(['/dashboard']);
        window.location.reload()
      },
      error: (err) => {
        console.log(err);
        this.responseStatus = {
          StatusCode: 500,
          Message: 'Some error occurred',
        };
      },
    });
  }
}
