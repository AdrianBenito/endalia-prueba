import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { UserInfoComponent } from './components/user-directory/components/user-info.component';
import { LoginComponent } from './components/login/login.component';
import { UserDirectoryComponent } from './components/user-directory/user-directory.component';

@NgModule({
  declarations: [AppComponent, LoginComponent, UserDirectoryComponent, UserInfoComponent],
  imports: [BrowserModule, AppRoutingModule, MatFormFieldModule,  ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
