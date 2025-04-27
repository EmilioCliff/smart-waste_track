import { generateClient } from '@aws-amplify/api';

const api = generateClient({
	authMode: import.meta.env.VITE_AWS_AUTH_TYPE,
	endpoint: import.meta.env.VITE_AWS_GRAPHQL_ENDPOINT,
	apiKey: import.meta.env.VITE_AWS_API_KEY,
	// authToken: import.meta.env.VITE_AWS_AUTH_TOKEN,
	// headers: {
	// 'x-api-key': import.meta.env.VITE_AWS_API_KEY,
});

export default api;
