import { useMap, useMapsLibrary } from '@vis.gl/react-google-maps';
import { useEffect, useRef, useState } from 'react';
import MarkerWithInfoWindow from './MarkerWithInfoWindow';
import { getDustbins } from '@/services/getDustbins';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

export type Bin = {
	id: number;
	position: { lat: number; lng: number };
	fillLevel: number;
	gasLevel: 'Normal' | 'Critical';
};

export default function OptimizedBinRoutes({
	selectedBinType,
}: {
	selectedBinType: string;
}) {
	const map = useMap();
	const routesLibrary = useMapsLibrary('routes');

	const [directionsService, setDirectionsService] =
		useState<google.maps.DirectionsService>();
	const [directionsRenderer, setDirectionsRenderer] =
		useState<google.maps.DirectionsRenderer>();

	// const [bins, setBins] = useState<Bin[]>([]);
	const [canRoute, setCanRoute] = useState(false);
	const routeMarkersRef = useRef<google.maps.marker.AdvancedMarkerElement[]>(
		[],
	);

	const { data } = useQuery({
		queryKey: ['dustbins'],
		queryFn: getDustbins,
		// staleTime: 5 * 1000,
		// refetchInterval: 5 * 10000,
		placeholderData: keepPreviousData,
	});

	// useEffect(() => {
	// 	const generatedBins: Bin[] = Array.from({ length: 10 }, (_, i) => ({
	// 		id: i + 1,
	// 		position: {
	// 			lat: -1.2921 + Math.random() * 0.05, // Slightly spread around Nairobi
	// 			lng: 36.8219 + Math.random() * 0.05,
	// 		},
	// 		fillLevel: Math.floor(Math.random() * 100),
	// 		gasLevel: Math.random() > 0.8 ? 'Critical' : 'Normal', // 20% chance critical gas
	// 	}));
	// 	setBins(generatedBins);
	// }, []);

	useEffect(() => {
		if (!routesLibrary || !map) return;
		setDirectionsService(new routesLibrary.DirectionsService());
		setDirectionsRenderer(
			new routesLibrary.DirectionsRenderer({
				map,
				suppressMarkers: true,
			}),
		);
	}, [routesLibrary, map]);

	useEffect(() => {
		if (!directionsService || !directionsRenderer) return;
		if (!data) return;

		if (selectedBinType === 'safe') {
			setCanRoute(false);
			routeMarkersRef.current.forEach((marker) => marker.remove());
			routeMarkersRef.current = [];

			directionsRenderer.setMap(null);
			directionsRenderer.setDirections(null);
			return;
		} else {
			if (directionsRenderer.getMap() === null)
				directionsRenderer.setMap(map);
		}

		const criticalBins = data.filter(
			(bin) => bin.is_fill_critical || bin.is_gas_critical,
		);

		if (criticalBins.length < 2) {
			return;
		} else {
			setCanRoute(true);
		}

		const [...waypoints] = criticalBins;

		directionsService
			.route({
				origin: { lat: -1.2921, lng: 36.8219 },
				destination: {
					lat: Number(waypoints[waypoints.length - 1].latitude),
					lng: Number(waypoints[waypoints.length - 1].longitude),
				},
				waypoints: waypoints.map((bin) => ({
					location: {
						lat: Number(bin.latitude),
						lng: Number(bin.longitude),
					},
					stopover: true,
				})),
				travelMode: google.maps.TravelMode.DRIVING,
				optimizeWaypoints: true,
			})
			.then((response) => {
				console.log('Directions response:', response);
				const route = response.routes[0];

				const infoWindow = new google.maps.InfoWindow();

				route.legs.forEach((leg, index) => {
					const label = String.fromCharCode(
						'A'.charCodeAt(0) + index,
					);

					const marker = new google.maps.marker.AdvancedMarkerElement(
						{
							position: leg.start_location,
							map: map,
							content: createMarkerContent(label),
						},
					);
					routeMarkersRef.current.push(marker);

					const contentString = `
				        <div>
				        <p><strong>Address:</strong> ${leg.start_address}</p>
				        <p><strong>Distance to next:</strong> ${leg.distance!.text}</p>
				        <p><strong>Duration:</strong> ${leg.duration!.text}</p>
				        </div>
				    `;

					marker.addListener('click', () => {
						const contentElement = document.createElement('div');
						const heading = document.createElement('h2');
						heading.textContent = `Stop ${label}`;
						heading.style.fontSize = '16px';
						heading.style.fontWeight = 'bold';
						contentElement.appendChild(heading);

						infoWindow.setContent(contentString);
						infoWindow.setHeaderContent(contentElement);
						infoWindow.open(map, marker);
					});
				});

				directionsRenderer.setDirections(response);
			});

		// 	directionsService
		// 		.route({
		// 			origin: { lat: -1.2921, lng: 36.8219 },
		// 			destination: waypoints[waypoints.length - 1].position,
		// 			waypoints: waypoints.map((bin) => ({
		// 				location: bin.position,
		// 				stopover: true,
		// 			})),
		// 			travelMode: google.maps.TravelMode.DRIVING,
		// 			optimizeWaypoints: true,
		// 		})
		// 		.then((response) => {
		// 			directionsRenderer.setDirections(response);
		// 		});
	}, [data, selectedBinType, directionsService, directionsRenderer]);

	return (
		<>
			{data &&
				data.map((bin) => {
					if (
						(selectedBinType === 'fill' && canRoute) ||
						(selectedBinType === 'all' &&
							(bin.is_fill_critical || bin.is_gas_critical))
					) {
						return null;
					}
					if (
						selectedBinType === 'safe' &&
						(bin.is_fill_critical || bin.is_gas_critical)
					) {
						return null;
					}

					return (
						<MarkerWithInfoWindow key={bin.device_id} bin={bin} />
					);
				})}
		</>
	);
}

function createMarkerContent(letter: string) {
	const markerWrapper = document.createElement('div');
	markerWrapper.style.position = 'relative';
	markerWrapper.style.width = '40px';
	markerWrapper.style.height = '60px';

	const pin = document.createElement('div');
	pin.style.position = 'absolute';
	pin.style.top = '0';
	pin.style.left = '50%';
	pin.style.transform = 'translateX(-50%)';
	pin.style.width = '30px';
	pin.style.height = '30px';
	pin.style.backgroundColor = '#FF5733';
	pin.style.borderRadius = '50%';
	pin.style.boxShadow = '0 0 0 5px rgba(255, 87, 51, 0.3)';
	markerWrapper.appendChild(pin);

	const letterDiv = document.createElement('div');
	letterDiv.style.position = 'absolute';
	letterDiv.style.top = '15px';
	letterDiv.style.left = '50%';
	letterDiv.style.transform = 'translate(-50%, -50%)';
	letterDiv.style.fontSize = '16px';
	letterDiv.style.color = 'white';
	letterDiv.style.fontWeight = 'bold';
	letterDiv.style.textAlign = 'center';
	letterDiv.textContent = letter;
	markerWrapper.appendChild(letterDiv);

	return markerWrapper;
}
