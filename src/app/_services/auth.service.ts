import { HttpClient,HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginModel } from '../model/LoginModel';
import { ResponseStatusModel } from '../model/ResponseStatusModel';
import { LoginViewModel } from '../ViewModel/LoginViewModel';
import { SignUpModel } from '../model/SignUpModel';


const AUTH_API = 'http://localhost:8080/api/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
  
  login(loginDetails: LoginModel): Observable<any> {
    return this.http.post<LoginViewModel>(AUTH_API + 'signin', loginDetails);
  }

  register(signUpDetails: SignUpModel): Observable<any> {
    return this.http.post<ResponseStatusModel>(AUTH_API + 'signup', signUpDetails, httpOptions);
  }
}
