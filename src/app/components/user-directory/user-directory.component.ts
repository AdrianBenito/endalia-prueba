import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AuthenticationService } from 'src/app/service/authentication.service';
import ListUserJson from '../../mocks/list-users.json';
import { UserInfo } from '../models/user-info.model';

@Component({
  selector: 'user-directory',
  templateUrl: './user-directory.component.html',
  styleUrls: ['./user-directory.component.scss'],
})
export class UserDirectoryComponent implements OnInit {
  searchForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService
  ) {}

  listUser!: UserInfo[];

  ngOnInit(): void {
    this.listUser = ListUserJson;
    this.buildForm();
  }

  buildForm() {
    this.searchForm = this.fb.group({
      searchInput: new FormControl(''),
    });
  }

  logout() {
    this.authService.logout();
  }
}
