import { Component } from '@angular/core';
import { Notification } from "../../../models/notification";

@Component({
  selector: 'project-lead-notifications',
  templateUrl: './project-lead-notifications.component.html',
  styleUrl: './project-lead-notifications.component.css'
})
export class ProjectLeadNotificationsComponent {
  selectedTab: string = 'all';
  
  notifications: Notification[] = [];
  filteredNotifications: Notification[] = [];
  
  generateNotifications(): Notification[] {
    const notifications: Notification[] = [];
    const baseTimestamp = new Date("2023-11-17T00:00:00Z");
    
    const types: ('alert' | 'update' | 'chat' | 'task' | 'meeting')[] = ["alert", "update", "chat", "task", "meeting"];
    const categories: ('productivity' | 'communication' | 'project' | 'schedule' | 'work-life' | 'engagement' | 'collaboration' | 'well-being')[] =
      ["productivity", "communication", "project", "schedule", "work-life", "engagement", "collaboration", "well-being"];
    
    for (let i = 1; i <= 20; i++) {
      const type = types[Math.floor(Math.random() * types.length)];
      const category = categories[Math.floor(Math.random() * categories.length)];
      const timestamp = new Date(baseTimestamp.getTime() + i * 1000 * 60 * 60).toISOString();
      
      let notification: Notification = {
        type: type,
        category: category,
        title: `${type.charAt(0).toUpperCase() + type.slice(1)} Notification ${i}`,
        description: `Description for ${type} notification number ${i}`,
        timestamp: timestamp
      };
      
      if (type === "chat") {
        notification.meta = {
          sender: `User ${i}`,
          avatar: `/placeholder-user-${i}.jpg`
        };
      } else if (type === "task") {
        notification.meta = {
          project: `Project ${Math.floor(i / 10) + 1}`,
          deadline: new Date(baseTimestamp.getTime() + (i + 2) * 1000 * 60 * 60).toISOString()
        };
      } else if (type === "meeting") {
        notification.meta = {
          meetingTime: new Date(baseTimestamp.getTime() + (i + 1) * 1000 * 60 * 60).toISOString(),
          meetingLink: `https://zoom.us/j/123456789${i}`
        };
      }
      
      notifications.push(notification);
    }
    
    return notifications;
  }
  
  constructor() {
    this.notifications = this.generateNotifications();
    this.filteredNotifications = [...this.notifications];
  }
  
  filterNotifications(tab: string): void {
    this.selectedTab = tab;
    
    if (tab === 'all') {
      this.filteredNotifications = [...this.notifications];
    } else {
      this.filteredNotifications = this.notifications.filter(notification => notification.type === tab);
    }
  }
  
  clearNotifications() {
    this.notifications = [];
    this.filteredNotifications = [];
  }
}
