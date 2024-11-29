import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { SignInRequest } from "../../payload/requests/auth/sign-in-request";
import { Observable } from "rxjs";
import { StandardResponse } from "../../payload/responses/standard-response";
import { SignInResponse } from "../../payload/responses/auth/sign-in-response";
import { environment } from "../../../environments/environment.development";
import { CookieService } from "ngx-cookie-service";


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  constructor(private http: HttpClient, private cookieService: CookieService) { }
  
  signIn(signInRequest: SignInRequest): Observable<StandardResponse<SignInResponse>> {
    return this.http.post<StandardResponse<SignInResponse>>(environment.backendAPI + 'auth/sign-in', signInRequest);
  }
  
  logout() {
    this.cookieService.delete("syncTeam.token")
  }
}
