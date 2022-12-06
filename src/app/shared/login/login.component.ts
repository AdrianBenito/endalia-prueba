import { Component, OnInit } from '@angular/core';
import { UserInfo } from '../models/user-info.model';
import ListUserJson from '../../mocks/list-users.json';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  listUser!: UserInfo[];

  loginForm!: FormGroup;

  constructor(private fb: FormBuilder,
              private router: Router) {}

  ngOnInit(): void {
    this.listUser = ListUserJson;
    this.buildForm();
  }

  buildForm() {
    this.loginForm = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
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
    } else {
      this.router.navigate(['/userDirectory']);
    }
  }
}
