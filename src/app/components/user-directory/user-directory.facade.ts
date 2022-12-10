import { Injectable } from '@angular/core';
import { UserInfo } from '../models/user-info.model';

@Injectable()
export class UserDirectoryFacade {
  filterByInput(value: string, userList: UserInfo[]) {
    const valueLowerCase = value.toLocaleLowerCase();
    if (!valueLowerCase) {
      return userList;
    }

    const filteredUserList = userList.filter((user) => {
      return (
        user.name
          .toLocaleLowerCase()
          .concat(' ' + user.lastName.toLocaleLowerCase())
          .includes(valueLowerCase) ||
        user.job.toLocaleLowerCase().includes(valueLowerCase) ||
        user.phone.includes(valueLowerCase) ||
        user.email.includes(valueLowerCase)
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
