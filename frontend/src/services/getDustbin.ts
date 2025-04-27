import api from '@/API/api';
import { getSensorDataByTimestamp } from '@/graphql/queries';
import { SensorData } from '@/API';
import { SensorDataListSchema } from '@/lib/types';

export const getDustbin = async (
	timestamp: string,
): Promise<SensorData | null> => {
	try {
		const response = await api.graphql({
			query: getSensorDataByTimestamp,
			variables: { timestamp: timestamp },
			authMode: 'apiKey',
		});

		const rawData = response.data.getSensorDataByTimestamp;

		if (!rawData) {
			return null;
		}

		const parsedData = SensorDataListSchema.parse(rawData);

		// getDustbin returns only one object
		// @ts-ignore
		return parsedData[0];
	} catch (error) {
		console.error('Error fetching dustbin:', error);
		throw error;
	}
};
