import { Component, Input } from '@angular/core';
import { File } from "../../../../../models/file";

@Component({
	selector: 'admin-project-files-file-card',
	templateUrl: './admin-project-files-file-card.component.html',
	styleUrl: './admin-project-files-file-card.component.css'
})
export class AdminProjectFilesFileCardComponent {
	@Input() file!: File;
	
	getFileIcon(type: "JPEG" | "PNG" | "JPG" | "PDF" | "DOCX" | "PPT" | "XLSX" | "CSV") {
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
	
	formatDate(date: Date) {
		return date.toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		})
	}
}
