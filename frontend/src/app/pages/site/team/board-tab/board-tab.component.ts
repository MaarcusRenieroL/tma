import { Component, Input } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from "@angular/cdk/drag-drop";
import { Task } from "../../../../models/task";

@Component({
  selector: 'team-board-tab',
  templateUrl: './board-tab.component.html',
})
export class BoardTabComponent {
  
  @Input() tasks: Task[] = [];
  
  backLogTasks: Task[] = this.tasks.filter((task) => task.status === null);
  todoTasks: Task[] = this.tasks.filter((task) => task.status === "TODO");
  inProgressTasks: Task[] = this.tasks.filter((task) => task.status === "IN_PROGRESS");
  completedTasks: Task[] = this.tasks.filter((task) => task.status === "DONE");
  
  columns = [
    {
      name: 'Backlog',
      color: 'bg-secondary',
      tasks: this.backLogTasks
    },
    {
      name: 'Todo',
      color: 'bg-blue-400',
      tasks: this.todoTasks
    },
    {
      name: 'In Progress',
      color: 'bg-orange-400',
      tasks: this.inProgressTasks
    },
    {
      name: 'Completed',
      color: 'bg-green-400',
      tasks: this.completedTasks
    },
  ];
  
  onTaskDrop(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
  
  getConnectedDropLists(): string[] {
    return this.columns.map((_, index) => `list-${index}`);
  }
  
}
