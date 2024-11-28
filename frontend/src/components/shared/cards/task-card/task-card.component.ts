import { Component, Input } from '@angular/core';

@Component({
  selector: 'task-card',
  templateUrl: './task-card.component.html',
})
export class TaskCardComponent {
  @Input() task: any;
  
  files = [
    {
      "id": "1",
      "name": "name1",
      "type": "JPEG",
      "size": 123
    },
    {
      "id": "2",
      "name": "name2",
      "type": "PPT",
      "size": 456
    },
    {
      "id": "3",
      "name": "name3",
      "type": "PDF",
      "size": 789
    },
    {
      "id": "4",
      "name": "name4",
      "type": "CSV",
      "size": 101
    },
    {
      "id": "5",
      "name": "name5",
      "type": "PNG",
      "size": 202
    }
  ]
  
  
  getFileIcon(type: string) {
    switch (type) {
      case 'JPEG':
      case 'PNG':
      case 'JPG':
        return '🖼️'
      case 'PDF':
        return '📄'
      case 'DOCX':
        return '📝'
      case 'PPT':
        return '📊'
      case 'XLSX':
      case 'CSV':
        return '📈'
      default:
        return '📁'
    }
  }
  
  formatFileSize(size: number) {
    if (size < 1024) return `${size} B`
    if (size < 1024 * 1024) return `${(size / 1024).toFixed(2)} KB`
    return `${(size / (1024 * 1024)).toFixed(2)} MB`
  }
  
}
