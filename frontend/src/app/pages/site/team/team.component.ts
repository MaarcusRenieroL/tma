import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TeamService } from '../../../services/team/team.service';
import { toast } from 'ngx-sonner';
import { Team } from '../../../models/team';
import { User } from '../../../models/user';
import { UserService } from '../../../services/user/user.service';
import { TaskService } from '../../../services/task/task.service';
import { Task } from '../../../models/task';
import { CookieService } from 'ngx-cookie-service';
import { Project } from '../../../models/project';
import { ProjectService } from '../../../services/projects/project.service';

@Component({
  selector: 'team',
  templateUrl: './team.component.html',
})
export class TeamComponent implements OnInit {
  teamId: string = '';
  team!: Team;
  teamMembers: User[] = [];
  tasks: Task[] = [];
  projects: Project[] = [];
  organizationMembers: User[] = [];

  unassignedTasksCount = 0;
  inProgressTasksCount = 0;
  completedTasksCount = 0;
  organizationId: string = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private teamService: TeamService,
    private userService: UserService,
    private router: Router,
    private taskService: TaskService,
    private cookieService: CookieService,
    private projectService: ProjectService
  ) {}

  ngOnInit() {
    this.teamId = this.activatedRoute.snapshot.paramMap.get('id')!;

    this.teamService
      .getTeamByTeamId({ teamId: this.teamId })
      .subscribe((response) => {
        if (response) {
          if (response.statusCode === 200) {
            toast.success(response.message);
            this.team = response.data;

            this.taskService
              .getTasksByTeamId(this.router.url.split('/')[2])
              .subscribe((response) => {
                if (response && response.statusCode === 200) {
                  this.tasks = response.data;
                  this.updateTaskCounts();
                  toast.success(response.message);
                } else {
                  toast.error(response?.message || 'Something went wrong');
                }
              });

            this.userService
              .getUsersByUserIds({ userIds: response.data.userIds })
              .subscribe((response) => {
                if (response) {
                  if (response.statusCode === 200) {
                    toast.success(response.message);
                    this.teamMembers = response.data;
                  } else if (
                    [400, 401, 402, 403, 404, 500].includes(response.statusCode)
                  ) {
                    toast.error(response.message);
                  }
                } else {
                  toast.error('Something went wrong');
                }
              });
          } else if (
            [400, 401, 402, 403, 404, 500].includes(response.statusCode)
          ) {
            toast.error(response.message);
          }
        } else {
          toast.error('Something went wrong');
        }
      });

    this.userService
      .getUserByUserId(this.cookieService.get('syncTeam.userId'))
      .subscribe((response) => {
        if (response) {
          if (response.statusCode === 200) {
            this.organizationId = response.data.organizationId;

            this.userService
              .getUsersByOrganizationId(this.organizationId)
              .subscribe((response) => {
                if (response) {
                  if (response.statusCode === 200) {
                    this.organizationMembers = response.data;
                  } else if (
                    [400, 401, 402, 403, 404, 500].includes(response.statusCode)
                  ) {
                    toast.error(response.message);
                  }
                } else {
                  toast.error('Something went wrong');
                }
              });
          }
        }
      });

    this.projectService
      .getProjectsByTeamId(this.teamId)
      .subscribe((response) => {
        if (response) {
          if (response.statusCode === 200) {
            response.data.forEach((project) => {
              this.projects.push(project);
            });
            toast.success(response.message);
          } else if (
            [400, 401, 402, 403, 404, 500].includes(response.statusCode)
          ) {
            toast.error(response.message);
          }
        } else {
          toast.error('Something went wrong');
        }
      });
  }

  private updateTaskCounts() {
    this.unassignedTasksCount = this.tasks.filter(
      (task) => task.status === null
    ).length;
    this.inProgressTasksCount = this.tasks.filter(
      (task) => task.status === 'IN_PROGRESS'
    ).length;
    this.completedTasksCount = this.tasks.filter(
      (task) => task.status === 'DONE'
    ).length;
  }
}
