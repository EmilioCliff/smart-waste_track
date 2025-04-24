import api from '@/API/api';
import { getSensorData } from '@/graphql/queries';

export const getDustbins = async () => {
	try {
		const response = await api.graphql({
			query: getSensorData,
			authMode: 'apiKey',
		});

		return response.data.getSensorData;
	} catch (error) {
		console.error('Error fetching dustbins:', error);
		throw error;
	}
};
