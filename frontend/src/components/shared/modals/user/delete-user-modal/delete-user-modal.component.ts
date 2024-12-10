import { Component, Input } from '@angular/core';
import { toast } from "ngx-sonner";
import { UserService } from "../../../../../app/services/user/user.service";

@Component({
  selector: 'delete-user-modal',
  templateUrl: './delete-user-modal.component.html',
})
export class DeleteUserModalComponent {
  @Input() userId!: string;
  
  constructor(private userService: UserService) {
  }
  
  deleteUser(ctx: any) {
    this.userService.deleteUserByUserId(this.userId).subscribe((response) => {
      if (response) {
        if (response.statusCode === 200) {
          toast.success(response.message);
        } else if ([400, 401, 402, 403, 404, 405, 500].includes(response.statusCode)) {
          
          toast.error(response.message);
        }
      } else {
        toast.error("Something went wrong")
      }
    });
    
    ctx.close();
  }
}
