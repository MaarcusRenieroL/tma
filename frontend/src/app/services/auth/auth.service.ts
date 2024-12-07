import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SignInRequest } from '../../payload/requests/auth/sign-in-request';
import { Observable } from 'rxjs';
import { StandardResponse } from '../../payload/responses/standard-response';
import { SignInResponse } from '../../payload/responses/auth/sign-in-response';
import { environment } from '../../../environments/environment.development';
import { CookieService } from 'ngx-cookie-service';
import { ForgotPasswordRequest } from '../../payload/requests/auth/forgot-password-request';
import { SignUpRequest } from '../../payload/requests/auth/sign-up-request';
import { User } from '../../models/user';
import { VerifyEmailRequest } from '../../payload/requests/auth/verify-email-request';
import { SendVerificationCodeRequest } from '../../payload/requests/auth/send-verification-code-request';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private cookieService: CookieService
  ) {}

  signIn(
    signInRequest: SignInRequest
  ): Observable<StandardResponse<SignInResponse>> {
    return this.http.post<StandardResponse<SignInResponse>>(
      environment.backendAPI + 'auth/sign-in',
      signInRequest
    );
  }

  signUp(signUpRequest: SignUpRequest): Observable<StandardResponse<User>> {
    return this.http.post<StandardResponse<User>>(
      environment.backendAPI + 'auth/sign-up',
      signUpRequest
    );
  }

  sendVerificationCode(
    sendVerificationCodeRequest: SendVerificationCodeRequest
  ): Observable<StandardResponse<string>> {
    return this.http.post<StandardResponse<string>>(
      environment.backendAPI + 'auth/send-email-verification-code',
      sendVerificationCodeRequest
    );
  }

  verifyEmail(
    verifyEmailRequest: VerifyEmailRequest
  ): Observable<StandardResponse<string>> {
    return this.http.post<StandardResponse<string>>(
      environment.backendAPI + 'auth/verify-email',
      verifyEmailRequest
    );
  }

  logout() {
    this.cookieService.delete('syncTeam.token');
    this.cookieService.delete('syncTeam.userId');
    this.cookieService.delete('syncTeam.isOnboarded');
    this.cookieService.delete('syncTeam.isVerified');
    this.cookieService.delete('syncTeam.email');
  }

  forgotPassword(
    forgotPasswordRequest: ForgotPasswordRequest
  ): Observable<StandardResponse<void>> {
    return this.http.post<StandardResponse<void>>(
      environment.backendAPI + 'auth/forgot-password',
      forgotPasswordRequest
    );
  }

  resetPassword() {
    return this.http.post(environment.backendAPI + 'auth/reset-password', {});
  }
}
