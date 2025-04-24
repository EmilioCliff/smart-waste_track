import { ReactNode } from 'react';
import { z } from 'zod';

export const SensorDataSchema = z.object({
	__typename: z.literal('SensorData'),
	timestamp: z.string(),
	device_id: z.string(),
	unix_timestamp: z.string(),
	longitude: z.string(),
	latitude: z.string(),
	co2_ppm: z.string(),
	methane_ppm: z.string(),
	percentage_full: z.string(),
	is_fill_critical: z.boolean().nullable().optional(),
	is_gas_critical: z.boolean().nullable().optional(),
});

export const SensorDataListSchema = z.array(SensorDataSchema);

export interface ContextWrapperProps {
	children: ReactNode;
}

export interface tableFilterType {
	options: {
		label: string;
		value: string;
	}[];
}

export interface User {
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

export interface Dustbin {
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

export interface commonDataResponse {
	id: number;
	name: string;
}
