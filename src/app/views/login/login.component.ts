import { Component } from '@angular/core';
import { FormGroup, FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router'; // import Router
import { AuthService } from 'app/services/auth/auth.service';
import { ResponseService } from 'app/services/response/response.service';
import { environment } from 'environments/environment.development';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private http: HttpClient,
    private router: Router,
    private authService: AuthService) { } // add Router to constructor
  
  public baseURL = environment.apiBaseUrl; 
  
  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  login(directive: FormGroupDirective) {
    const url = `${this.baseURL}/handle_user/login`;
    const body = this.loginForm.value;

    this.http.post(url, body, { withCredentials: true }).subscribe((response: any) => {
      if (response.message === 'Success') {
        this.authService.setToken(response.token);
        this.router.navigate(['/home']);
      }
      else {
        this.loginForm.reset();
        directive.resetForm();
      }
    });

    this.loginForm.reset();
    directive.resetForm();
    return false;
  }

}
