import api from '@/API/api';
import { getSensorData } from '@/graphql/queries';
import { SensorData } from '@/API';
import { SensorDataListSchema } from '@/lib/types';

export const getDustbins = async (): Promise<SensorData[]> => {
	try {
		const response = await api.graphql({
			query: getSensorData,
			authMode: 'apiKey',
		});

		const rawData = response.data.getSensorData ?? [];

		// Parse and filter nulls
		const parsedData = SensorDataListSchema.parse(rawData);
		// const sanitizedData = parsedData.filter(
		// 	(item): item is SensorData => item !== null,
		// );

		// getDustbins returns an array of objects
		// @ts-ignore
		return parsedData;
	} catch (error) {
		console.error('Error fetching dustbins:', error);
		throw error;
	}
};
