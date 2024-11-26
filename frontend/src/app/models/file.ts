export interface File {
	id: number;
	name: string;
	description: string;
	createdDate: Date;
	updatedDate: Date;
	size: number;
	type: "JPEG" | "PNG" | "JPG" | "PDF" | "DOCX" | "PPT" | "XLSX" | "CSV";
}