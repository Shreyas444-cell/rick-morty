import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../service/authentication.service';
import { loginData } from '../constants/text-constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loginData=loginData;

  constructor(
    private fb: FormBuilder,  
    private authService: AuthService, 
    private router: Router
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]


    });
  }

  login(): void {
    if (this.loginForm.valid) {
      if (this.authService.login()) {
        this.router.navigate(['/character']);  
      }
    }
  }
}
