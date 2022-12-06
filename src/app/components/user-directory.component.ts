import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserInfo } from '../shared/models/user-info.model';
import ListUserJson from '../mocks/list-users.json';

@Component({
  selector: 'user-directory',
  templateUrl: './user-directory.component.html',
  styleUrls: ['./user-directory.component.scss'],
})
export class UserDirectoryComponent implements OnInit {
  searchForm!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {}

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
    this.router.navigate(['/login']);
  }
}
