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

		const rawData = response.data.getSensorData;

		const sanitizedData = SensorDataListSchema.parse(
			(rawData ?? []).filter(Boolean),
		);

		return sanitizedData;
	} catch (error) {
		console.error('Error fetching dustbins:', error);
		throw error;
	}
};
