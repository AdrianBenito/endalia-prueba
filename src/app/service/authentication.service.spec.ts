import { TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginComponent } from '../components/login/login.component';
import { AuthenticationService } from './authentication.service';

describe('AuthenticationService', () => {
  let service: AuthenticationService;
  let mockRouter: Router;
  let mockDialog: MatDialog;

  beforeEach(() => {
    mockRouter = jasmine.createSpyObj<Router>('Router', ['navigate']);
    mockDialog = jasmine.createSpyObj<MatDialog>('MatDialog', ['open']);
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          { path: '/login', component: LoginComponent },
        ]),
        MatDialogModule,
      ],
      providers: [
        AuthenticationService,
        { provide: Router, useValue: mockRouter },
        { provide: MatDialog, useValue: mockDialog },
      ],
    });
    service = TestBed.inject(AuthenticationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('login method', () => {
    it('should add loggedUser to localStorage if user is found', () => {
      const email = 'user1@endalia.com';
      const password = '1234';
      const body = {
        userName: 'Charles',
        lastName: 'Bonner Bruce',
        email: email,
      };

      service.login(email, password);

      expect(localStorage.setItem('loggedUser', JSON.stringify({ body })));
    });

    it('should show modal if user is not found', () => {
      const email = 'test@endalia.com';
      const password = 'test';

      service.login(email, password);

      expect(mockDialog.open).toHaveBeenCalled();
    });
  });

  describe('logout method', () => {
    it('should remove loggedUser property from localStorage', () => {
      localStorage.setItem('loggedUser', 'test-user');
      service.logout();
      expect(localStorage.getItem('loggedUser')).toBe(null);
    });

    it('should redirect to login page using Router service', () => {
      service.logout();
      expect(mockRouter.navigate).toHaveBeenCalledWith(['/login']);
    });
  });
});
