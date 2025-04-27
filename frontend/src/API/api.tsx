import { generateClient } from '@aws-amplify/api';

const api = generateClient({ authMode: import.meta.env.VITE_AWS_AUTH_TYPE });

export default api;
