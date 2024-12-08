import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GetUsersByUserIdsRequest } from '../../payload/requests/user/get-users-by-user-ids-request';
import { Observable } from 'rxjs';
import { StandardResponse } from '../../payload/responses/standard-response';
import { User } from '../../models/user';
import { environment } from '../../../environments/environment.development';
import { CookieService } from 'ngx-cookie-service';
import { AddUsersToOrganization } from '../../payload/requests/organization/add-users-to-organization';
import { ChangePasswordRequest } from '../../payload/requests/user/change-password-request';
import { UpdateUserRequest } from '../../payload/requests/user/update-user-request';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private http: HttpClient,
    private cookieService: CookieService
  ) {}

  getUsersByUserIds(
    getUsersByUserIdsRequest: GetUsersByUserIdsRequest
  ): Observable<StandardResponse<User[]>> {
    return this.http.post<StandardResponse<User[]>>(
      environment.backendAPI + 'users/usersId',
      getUsersByUserIdsRequest,
      {
        headers: {
          Authorization: 'Bearer ' + this.cookieService.get('syncTeam.token'),
        },
      }
    );
  }

  getUserByUserId(userId: string): Observable<StandardResponse<User>> {
    return this.http.get<StandardResponse<User>>(
      environment.backendAPI + 'users/' + userId,
      {
        headers: {
          Authorization: 'Bearer ' + this.cookieService.get('syncTeam.token'),
        },
      }
    );
  }

  getUsersByOrganizationId(
    organizationId: string
  ): Observable<StandardResponse<User[]>> {
    return this.http.get<StandardResponse<User[]>>(
      environment.backendAPI + 'users/organization/' + organizationId,
      {
        headers: {
          Authorization: 'Bearer ' + this.cookieService.get('syncTeam.token'),
        },
      }
    );
  }

  addUsersToOrganization(
    addUsersToOrganization: AddUsersToOrganization
  ): Observable<StandardResponse<null>> {
    return this.http.post<StandardResponse<null>>(
      environment.backendAPI +
        'users/organization/' +
        addUsersToOrganization.organizationId,
      addUsersToOrganization,
      {
        headers: {
          Authorization: 'Bearer ' + this.cookieService.get('syncTeam.token'),
        },
      }
    );
  }

  changePassword(
    changePasswordRequest: ChangePasswordRequest
  ): Observable<StandardResponse<boolean>> {
    return this.http.put<StandardResponse<boolean>>(
      environment.backendAPI + 'users/change-password',
      changePasswordRequest,
      {
        headers: {
          Authorization: 'Bearer ' + this.cookieService.get('syncTeam.token'),
        },
      }
    );
  }

  updateUserByUserId(
    updateUserRequest: UpdateUserRequest
  ): Observable<StandardResponse<User>> {
    return this.http.put<StandardResponse<User>>(
      environment.backendAPI +
        'users/' +
        this.cookieService.get('syncTeam.userId'),
      updateUserRequest,
      {
        headers: {
          Authorization: 'Bearer ' + this.cookieService.get('syncTeam.token'),
        },
      }
    );
  }
}
