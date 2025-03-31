export interface user {
	role: string;
	name: string;
}

export interface location {
	longitude: number;
	latitude: number;
}

export interface company {
	name: string;
	location: location;
}

export interface dustbin {
	id: string;
	distanceSensor: number;
	gasSensor: number;
	location: location;
	apartmentName: string;
}

export interface apartment {
	name: string;
	address: string;
}

export interface collectionRoutes {
	pageSize: number;
	currentPage: number;
	totalData: number;
	totalPages: number;
}

export interface pagination {
	pageSize: number;
	currentPage: number;
	totalData: number;
	totalPages: number;
}
