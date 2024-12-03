import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { StandardResponse } from "../../payload/responses/standard-response";
import { environment } from "../../../environments/environment.development";
import { CreateTeamRequest } from "../../payload/requests/create-team-request";
import { CreateTeamResponse } from "../../payload/responses/team/create-team-response";
import { CookieService } from "ngx-cookie-service";
import { Team } from "../../models/team";


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
}
