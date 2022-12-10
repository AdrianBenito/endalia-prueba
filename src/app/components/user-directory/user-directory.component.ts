import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { AuthenticationService } from 'src/app/service/authentication.service';
import UserListJson from '../../mocks/user-list.json';
import { UserInfo } from '../models/user-info.model';
import { UserDirectoryFacade } from './user-directory.facade';

@Component({
  selector: 'user-directory',
  templateUrl: './user-directory.component.html',
  styleUrls: ['./user-directory.component.scss'],
  providers: [UserDirectoryFacade],
})
export class UserDirectoryComponent implements OnInit, OnDestroy {
  searchForm!: FormGroup;
  userList!: UserInfo[];
  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private userDirectoryFacade: UserDirectoryFacade
  ) {}

  ngOnInit(): void {
    this.userList = this.userDirectoryFacade.sortListByLastName(UserListJson);
    this.buildForm();
    this.filterByInput();
  }

  buildForm() {
    this.searchForm = this.fb.group({
      searchInput: new FormControl(''),
    });
  }

  logout() {
    this.authService.logout();
  }

  filterByInput() {
    this.searchForm
      .get('searchInput')
      ?.valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe((value) => {
        this.userList = this.userDirectoryFacade.filterByInput(
          value,
          UserListJson
        );
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
