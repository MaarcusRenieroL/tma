import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { TeamService } from "../../../services/team/team.service";
import { toast } from "ngx-sonner";
import { Team } from "../../../models/team";
import { User } from "../../../models/user";
import { UserService } from "../../../services/user/user.service";

@Component({
	selector: 'team', templateUrl: './team.component.html',
})
export class TeamComponent implements OnInit {
	
	teamId: string = "";
	team!: Team;
	teamMembers: User[] = [];
	
	constructor(private activatedRoute: ActivatedRoute, private teamService: TeamService, private userService: UserService) {
	}
	
	ngOnInit() {
		this.teamId = this.activatedRoute.snapshot.paramMap.get('id')!;
		this.teamService.getTeamByTeamId({ teamId: this.teamId }).subscribe((response) => {
			if (response) {
				if (response.statusCode === 200) {
					toast.success(response.message);
					this.team = response.data;
					
					this.userService.getUsersByUserIds({ userIds: response.data.userIds }).subscribe((response) => {
						if (response) {
							if (response.statusCode === 200) {
								toast.success(response.message);
								this.teamMembers = response.data;
							} else if ([ 400, 401, 402, 403, 404, 500 ].includes(response.statusCode)) {
								toast.error(response.message)
							}
						} else {
							toast.error("Something went wrong")
						}
					})
					
				} else if ([ 400, 401, 402, 403, 404, 500 ].includes(response.statusCode)) {
					toast.error(response.message)
				}
			} else {
				toast.error("Something went wrong")
			}
		});
	}
}
