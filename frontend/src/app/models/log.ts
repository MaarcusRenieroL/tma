export interface Log {
	id: number;
	timestamp: string
	user: string
	action: string
	category: "productivity" | "communication" | "work-life" | "engagement" | "collaboration" | "well-being" | "security"
	details: string
	status: "success" | "warning" | "error"
}