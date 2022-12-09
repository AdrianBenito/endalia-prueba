import { Component, OnInit } from '@angular/core';
import ListUserJson from '../../mocks/list-users.json';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { UserInfo } from '../models/user-info.model';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { first } from 'rxjs';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  listUser!: UserInfo[];

  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.listUser = ListUserJson;
    this.buildForm();
  }

  buildForm() {
    this.loginForm = this.fb.group({
      email: new FormControl('user1@endalia.com', [
        Validators.required,
        Validators.email,
      ]),
      password: new FormControl('1234', Validators.required),
    });
  }

  validateLogin() {
    if (this.loginForm.invalid) {
      Object.keys(this.loginForm.controls).forEach((field) => {
        const control = this.loginForm.get(field);
        if (control instanceof FormControl && control?.invalid) {
          control.markAsTouched({ onlySelf: true });
          control.markAsDirty();
        }
      });
      return;
    }

    this.authService
      .login(
        this.loginForm.get('email')?.value,
        this.loginForm.get('password')?.value
      )
      .pipe(first())
      .subscribe((data: any) => {
        this.router.navigate(['employees']);
      });
  }
}