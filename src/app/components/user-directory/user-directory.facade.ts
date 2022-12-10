import { Injectable } from '@angular/core';
import { UserInfo } from '../models/user-info.model';

@Injectable()
export class UserDirectoryFacade {
  filterByInput(value: string, userList: UserInfo[]) {
    if (!value) {
      return userList;
    }

    const filteredUserList = userList.filter((user) => {
      return (
        user.name
          .toLocaleLowerCase()
          .concat(' ' + user.lastName.toLocaleLowerCase())
          .includes(value) ||
        user.job.toLocaleLowerCase().includes(value) ||
        user.phone.includes(value) ||
        user.email.includes(value)
      );
    });
    return this.sortListByLastName(filteredUserList);
  }

  sortListByLastName(userList: UserInfo[]) {
    return userList.sort((a, b) => {
      if (a.lastName > b.lastName) {
        return 1;
      }
      if (a.lastName === b.lastName) {
        return 0;
      }
      return -1;
    });
  }
}
