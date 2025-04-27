import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Dashboard from './pages/Dashboard.js';
import CollectionRoutes from './pages/routes/CollectionRoutes.js';
import Login from './pages/Login.js';
import AppLayout from './layouts/AppLayout.js';
import DustbinPage from './pages/dustbins/DustbinPage.js';
import { Amplify } from 'aws-amplify';
// App.tsx
// @ts-ignore
import config from './prod-aws-exports.js';
import ErrorComponent from './components/UI/Error.js';
import NotFound from './pages/NotFound.js';
// import config from './aws-exports.js';

Amplify.configure(config);

const queryClient = new QueryClient();

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<Router>
				<Routes>
					<Route path="/login" element={<Login />} />
					<Route path="/" element={<AppLayout />}>
						<Route path="dashboard" element={<Dashboard />} />
						<Route path="dustbins" element={<DustbinPage />} />
						<Route path="routes" element={<CollectionRoutes />} />
					</Route>
					<Route path="*" element={<NotFound />} />
				</Routes>
			</Router>
			<ToastContainer />
			<ReactQueryDevtools />
		</QueryClientProvider>
	);
}

export default App;
