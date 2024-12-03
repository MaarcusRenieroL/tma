import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { StandardResponse } from "../../payload/responses/standard-response";
import { environment } from "../../../environments/environment.development";
import { CreateTeamRequest } from "../../payload/requests/team/create-team-request";
import { CreateTeamResponse } from "../../payload/responses/team/create-team-response";
import { CookieService } from "ngx-cookie-service";
import { Team } from "../../models/team";
import { DeleteTeamRequest } from "../../payload/requests/team/delete-team-request";
import { GetTeamByUserIdRequest } from "../../payload/requests/team/get-team-by-user-id-request";


@Injectable({
	providedIn: 'root'
})
export class TeamService {
	
	constructor(private http: HttpClient, private cookieService: CookieService) { }
	
	createTeam(createTeamRequest: CreateTeamRequest): Observable<StandardResponse<CreateTeamResponse>> {
		return this.http.post<StandardResponse<CreateTeamResponse>>(environment.backendAPI + 'teams', createTeamRequest, {
			headers: {
				"Authorization": "Bearer " + this.cookieService.get("syncTeam.token")
			}
		});
	}
	
	getAllTeams(): Observable<StandardResponse<Team[]>> {
		return this.http.get<StandardResponse<Team[]>>(environment.backendAPI + 'teams', {
			headers: {
				"Authorization": "Bearer " + this.cookieService.get("syncTeam.token")
			}
		})
	}
	
	getTeamsByUserId(getTeamByUserIdRequest: GetTeamByUserIdRequest): Observable<StandardResponse<Team[]>> {
		return this.http.get<StandardResponse<Team[]>>(environment.backendAPI + 'users/get-teams/' + getTeamByUserIdRequest.userId, {
      headers: {
        "Authorization": "Bearer " + this.cookieService.get("syncTeam.token")
      }
    })
	}
	
	deleteTeam(deleteTeamRequest: DeleteTeamRequest): Observable<StandardResponse<Team>> {
		
		console.log(deleteTeamRequest)
		
		return this.http.delete<StandardResponse<Team>>(environment.backendAPI + "teams/" + deleteTeamRequest.teamId, {
			headers: {
        "Authorization": "Bearer " + this.cookieService.get("syncTeam.token")
      },
			body: deleteTeamRequest
		})
	}
}
