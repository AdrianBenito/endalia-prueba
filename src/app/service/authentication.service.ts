import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import UserListJson from '../mocks/user-list.json';
import { AlertWarningComponent } from '../shared/alert-warning/alert-warning.component';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';

const message = 'El email o la contraseña son incorrectos';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private router: Router, private dialog: MatDialog) {}

  login(
    email: string,
    password: string
  ): Observable<HttpResponse<any>> {
    const user = UserListJson.find(
      (user) => user.email === email && user.password === password
    );

    if (!user) {
      this.dialog.open(AlertWarningComponent, {
        data: {
          message: message,
        },
      });
      return of(new HttpResponse({status: 400}));
    }

    const body = {
      userName: user?.name,
      lastName: user?.lastName,
      email: user?.email,
    };

    localStorage.setItem('loggedUser', JSON.stringify(body));
    const httpResponse = new HttpResponse({ body: body });
    return of(httpResponse);
  }

  logout() {
    localStorage.removeItem('loggedUser');
    this.router.navigate(['/login']);
  }
}
