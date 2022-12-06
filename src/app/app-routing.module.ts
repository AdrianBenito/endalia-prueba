import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserDirectoryComponent } from './components/user-directory.component';
import { LoginComponent } from './shared/login/login.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'userDirectory',
    /* canActivate: [CanActivateViaAuthGuard], */
    component: UserDirectoryComponent,
  },
  {
    path: '**',
    redirectTo: 'login',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
