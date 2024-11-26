import { Component } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from "@angular/cdk/drag-drop";

@Component({
  selector: 'admin-project-board-tab',
  templateUrl: './admin-project-board-tab.component.html',
  styleUrl: './admin-project-board-tab.component.css'
})
export class AdminProjectBoardTabComponent {
  columns = [
    {
      name: 'Backlog',
      color: 'bg-secondary',
      tasks: [
        { id: 1, title: 'Task 1', description: 'Description 1', priority: 'Low' },
        { id: 2, title: 'Task 2', description: 'Description 2', priority: 'Medium' },
        { id: 3, title: 'Task 3', description: 'Description 3', priority: 'High' },
      ],
    },
    {
      name: 'Todo',
      color: 'bg-blue-400',
      tasks: [
        { id: 4, title: 'Task 4', description: 'Description 4', priority: 'Low' },
        { id: 5, title: 'Task 5', description: 'Description 5', priority: 'High' },
      ],
    },
    {
      name: 'In Progress',
      color: 'bg-orange-400',
      tasks: [
        { id: 6, title: 'Task 6', description: 'Description 6', priority: 'Medium' },
      ],
    },
    {
      name: 'Completed',
      color: 'bg-green-400',
      tasks: [
        { id: 7, title: 'Task 7', description: 'Description 7', priority: 'Low' },
        { id: 8, title: 'Task 8', description: 'Description 8', priority: 'Medium' },
      ],
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
