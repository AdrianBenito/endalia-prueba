import { NO_ERRORS_SCHEMA } from '@angular/compiler';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  const mockAuthService = jasmine.createSpyObj<AuthenticationService>(
    'AuthenticationService',
    ['login']
  );
  const formBuilder: FormBuilder = new FormBuilder();

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [ReactiveFormsModule, FormsModule, RouterTestingModule],
      providers: [
        { provide: AuthenticationService, useValue: mockAuthService },
        { provide: FormBuilder, useValue: formBuilder },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    component.loginForm = formBuilder.group({
      email: ['', Validators.required, Validators.email],
      password: ['', Validators.required],
    });
    fixture.detectChanges();
    component.ngOnInit();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('email field validity', () => {
    let errors: ValidationErrors = {};
    let email = component.loginForm.controls['email'];
    expect(email.valid).toBeFalsy();

    errors = email.errors || {};
    expect(errors['required']).toBeTruthy();

    email.setValue('user1@endalia.com');
    errors = email.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['email']).toBeFalsy();
  });

  it('password field validity', () => {
    let errors: ValidationErrors = {};
    let password = component.loginForm.controls['password'];

    errors = password.errors || {};
    expect(errors['required']).toBeTruthy();

    password.setValue('1234');
    errors = password.errors || {};
    expect(errors['required']).toBeFalsy();
  });
});
