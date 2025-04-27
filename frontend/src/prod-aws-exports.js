const config = {
	API: {
		GraphQL: {
			endpoint: import.meta.env.VITE_AWS_GRAPHQL_ENDPOINT,
			region: import.meta.env.VITE_AWS_REGION,
			defaultAuthMode: import.meta.env.VITE_AWS_AUTH_TYPE,
			apiKey: import.meta.env.VITE_AWS_API_KEY,
		},
	},
};

export default config;
