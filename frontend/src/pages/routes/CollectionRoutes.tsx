import { APIProvider, Map } from '@vis.gl/react-google-maps';
import { useEffect, useState } from 'react';
import OptimizedBinRoutes from './OptimizedBinRoutes';
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';

function CollectionRoutes() {
	const [theme, setTheme] = useState<'dark' | 'light'>(() => {
		return (localStorage.getItem('theme') as 'dark' | 'light') || 'light';
	});
	const [selectedBinType, setSelectedBinType] = useState('all');

	useEffect(() => {
		const handleStorageChange = () => {
			const newTheme =
				(localStorage.getItem('theme') as 'dark' | 'light') || 'light';
			setTheme(newTheme);
		};

		window.addEventListener('storage', handleStorageChange);

		return () => {
			window.removeEventListener('storage', handleStorageChange);
		};
	}, []);

	return (
		<APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
			<h2 className="text-3xl font-bold">Collection Routes</h2>
			<Select onValueChange={setSelectedBinType}>
				<SelectTrigger className="w-[180px] my-2">
					<SelectValue placeholder="Select bin types" />
				</SelectTrigger>
				<SelectContent>
					<SelectGroup>
						<SelectLabel>Bin Category</SelectLabel>
						<SelectItem value="all">ALL</SelectItem>
						<SelectItem value="fill">Fill / Toxic Bins</SelectItem>
						<SelectItem value="safe">Safe Bins</SelectItem>
					</SelectGroup>
				</SelectContent>
			</Select>
			<Map
				style={{ width: '90vw', height: '100vh' }}
				defaultCenter={{ lat: -1.2921, lng: 36.8219 }}
				defaultZoom={8}
				gestureHandling={'greedy'}
				disableDefaultUI={true}
				mapId={import.meta.env.VITE_MAP_ID}
				colorScheme={theme === 'dark' ? 'DARK' : 'LIGHT'}
			>
				<OptimizedBinRoutes selectedBinType={selectedBinType} />
			</Map>
		</APIProvider>
	);
}

export default CollectionRoutes;
