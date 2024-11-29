export interface StandardResponse<T> {
	httpStatus: string;
	statusCode: number;
	message: string;
	timestamp: string;
	data: T;
}