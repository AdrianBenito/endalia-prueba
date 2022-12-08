import { Component, Input } from '@angular/core';
import { UserInfo } from 'src/app/components/models/user-info.model';

@Component({
  selector: 'user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss'],
})
export class UserInfoComponent {
  
  @Input() user!: UserInfo;
}
