import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StandardResponse } from '../../payload/responses/standard-response';
import { Task } from '../../models/task';
import { environment } from '../../../environments/environment.development';
import { CookieService } from 'ngx-cookie-service';
import { CreateTaskRequest } from '../../payload/requests/task/create-task-request';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(
    private http: HttpClient,
    private cookieService: CookieService
  ) {}

  getTasksByTeamId(teamId: string): Observable<StandardResponse<Task[]>> {
    return this.http.get<StandardResponse<Task[]>>(
      environment.backendAPI + 'tasks/team/' + teamId,
      {
        headers: {
          Authorization: 'Bearer ' + this.cookieService.get('syncTeam.token'),
        },
      }
    );
  }

  createTask(
    createTaskRequest: CreateTaskRequest
  ): Observable<StandardResponse<Task>> {
    return this.http.post<StandardResponse<Task>>(
      environment.backendAPI + 'tasks',
      createTaskRequest,
      {
        headers: {
          Authorization: 'Bearer ' + this.cookieService.get('syncTeam.token'),
        },
      }
    );
  }
}
