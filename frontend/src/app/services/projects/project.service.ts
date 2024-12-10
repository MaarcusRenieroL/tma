import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StandardResponse } from '../../payload/responses/standard-response';
import { Project } from '../../models/project';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';
import { CreateNewProject } from '../../payload/requests/projects/create-new-project';
import { CookieService } from 'ngx-cookie-service';
@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  constructor(
    private http: HttpClient,
    private cookieService: CookieService
  ) {}

  getProjects(): Observable<StandardResponse<Project[]>> {
    return this.http.get<StandardResponse<Project[]>>(
      `${environment.backendAPI}/projects`
    );
  }

  getProjectsByTeamId(teamId: string): Observable<StandardResponse<Project[]>> {
    return this.http.get<StandardResponse<Project[]>>(
      `${environment.backendAPI}projects/team/${teamId}`
    );
  }

  addProjectWithTeamId(
    createNewProject: CreateNewProject
  ): Observable<StandardResponse<Project>> {
    return this.http.post<StandardResponse<Project>>(
      `${environment.backendAPI}projects`,
      createNewProject,
      {
        headers: {
          Authorization: 'Bearer ' + this.cookieService.get('syncTeam.token'),
        },
      }
    );
  }
  
  getProjectsByOrganizationId(organizationId: string): Observable<StandardResponse<Project[]>> {
    return this.http.get<StandardResponse<Project[]>>(
      `${environment.backendAPI}projects/organization/${organizationId}`, {
        headers: {
          "Authorization": 'Bearer '+ this.cookieService.get('syncTeam.token'),
        }
      }
    );
  }
}
