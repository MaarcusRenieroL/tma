import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { GetUsersByUserIdsRequest } from "../../payload/requests/user/get-users-by-user-ids-request";
import { Observable } from "rxjs";
import { StandardResponse } from "../../payload/responses/standard-response";
import { User } from "../../models/user";
import { environment } from "../../../environments/environment.development";
import { CookieService } from "ngx-cookie-service";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private cookieService: CookieService) {
  }
  
  getUsersByUserIds(getUsersByUserIdsRequest: GetUsersByUserIdsRequest): Observable<StandardResponse<User[]>> {
    return this.http.post<StandardResponse<User[]>>(environment.backendAPI + "users/usersId", getUsersByUserIdsRequest, {
      headers: {
        "Authorization": "Bearer " + this.cookieService.get("syncTeam.token")
      }
    })
  }
  
  getUserByUserId(userId: string): Observable<StandardResponse<User>> {
    return this.http.get<StandardResponse<User>>(environment.backendAPI + "users/" + userId, {
      headers: {
        Authorization: "Bearer " + this.cookieService.get("syncTeam.token")
      }
    });
  }
}
