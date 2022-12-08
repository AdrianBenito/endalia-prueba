import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { UserDirectoryComponent } from './components/user-directory/user-directory.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, pathMatch: 'full' },
  {
    path: 'employees',
    component: UserDirectoryComponent,
    pathMatch: 'full' /*  canActivate : [AuthGuardService] */,
  },
  {
    path: '**',
    redirectTo: 'login',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
