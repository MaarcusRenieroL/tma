import { Component } from '@angular/core';

@Component({
	selector: 'admin-project-status',
	templateUrl: './admin-project-status.component.html',
})
export class AdminProjectStatusComponent {
	statusOptions = [
		{name: "Not Started", value: "not-started"},
		{name: "In Progress", value: "in-progress"},
		{name: "Completed", value: "completed"},
	]
}
