import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Apartments from './pages/Apartments';
import CollectionRoutes from './pages/CollectionRoutes';
import Login from './pages/Login';
import AppLayout from './layouts/AppLayout';
import Reviews from './pages/Reviews';
import NotFound from './pages/NotFound';
import DustbinPage from './pages/dustbins/DustbinPage';

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/login" element={<Login />} />
				<Route path="/" element={<AppLayout />}>
					<Route path="dashboard" element={<Dashboard />} />
					<Route path="dustbins" element={<DustbinPage />} />
					<Route path="routes" element={<CollectionRoutes />} />
					<Route path="apartments" element={<Apartments />} />
					<Route path="reviews" element={<Reviews />} />
				</Route>
				<Route path="*" element={<NotFound />} />
			</Routes>
		</Router>
	);
}

export default App;
