import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskService } from '../../../../../app/services/task/task.service';
import { Project } from '../../../../../app/models/project';
import { User } from '../../../../../app/models/user';
import { Router } from '@angular/router';
import { toast } from 'ngx-sonner';
@Component({
  selector: 'add-task-modal',
  templateUrl: './add-task-modal.component.html',
})
export class AddTaskModalComponent {
  @Input() projects?: Project[];
  @Input() teamMembers?: User[];
  @Input() organizationId?: string;

  statusOptions = [
    { name: 'Todo', value: 'TODO' },
    { name: 'In Progress', value: 'IN_PROGRESS' },
    { name: 'Done', value: 'DONE' },
  ];

  priorityOptions = [
    { name: 'Low', value: 'LOW' },
    { name: 'Medium', value: 'MEDIUM' },
    { name: 'High', value: 'HIGH' },
  ];

  addTaskForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private taskService: TaskService,
    private router: Router
  ) {
    this.addTaskForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      dueDate: ['', Validators.required],
      dateAllocated: ['', Validators.required],
      priority: ['', Validators.required],
      status: ['', Validators.required],
      projectId: ['', Validators.required],
      userIds: [[], Validators.required],
    });
  }

  onSubmit(ctx: any) {
    this.taskService
      .createTask({
        task: {
          title: this.addTaskForm.get('title')?.value,
          description: this.addTaskForm.get('description')?.value,
          dueDate: this.addTaskForm.get('dueDate')?.value,
          dateAllocated: this.addTaskForm.get('dateAllocated')?.value,
          priority: this.addTaskForm.get('priority')?.value,
          status: this.addTaskForm.get('status')?.value,
          teamId: this.router.url.split('/')[2],
          organizationId: this.organizationId!,
          projectId: this.addTaskForm.get('projectId')?.value,
          userIds: this.addTaskForm.get('userIds')?.value,
        },
        userIds: this.addTaskForm.get('userIds')?.value,
      })
      .subscribe((response) => {
        if (response) {
          if (response.statusCode === 201) {
            toast.success(response.message);
          } else if (
            [400, 401, 402, 403, 404, 405, 500].includes(response.statusCode)
          ) {
            toast.error(response.message);
          }
        } else {
          toast.error('Something went wrong');
        }
      });

    ctx.close();
  }
}
