import { useMap, useMapsLibrary } from '@vis.gl/react-google-maps';
import { useEffect, useRef, useState } from 'react';
import MarkerWithInfoWindow from './MarkerWithInfoWindow';
import { getDustbins } from '@/services/getDustbins';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

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

	const [canRoute, setCanRoute] = useState(false);
	const routeMarkersRef = useRef<google.maps.marker.AdvancedMarkerElement[]>(
		[],
	);

	const refetchInterval = Number(import.meta.env.VITE_REFETCH_INTERVAL);

	const { data } = useQuery({
		queryKey: ['dustbins'],
		queryFn: getDustbins,
		staleTime: 5 * 1000,
		refetchInterval: refetchInterval,
		placeholderData: keepPreviousData,
	});

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
		// const customStartLocation = { lat: -1.2921, lng: 36.8219 }; // your truck/start location

		// const waypoints = data.map((bin) => ({
		// 	location: {
		// 		lat: parseFloat(bin.latitude),
		// 		lng: parseFloat(bin.longitude),
		// 	},
		// 	stopover: true,
		// }));

		// const request = {
		// 	origin: customStartLocation,
		// 	destination: waypoints[waypoints.length - 1].location, // last bin
		// 	waypoints: waypoints.slice(0, -1), // exclude last bin from waypoints
		// 	travelMode: google.maps.TravelMode.DRIVING,
		// 	optimizeWaypoints: true,
		// };

		// directionsService.route(request, (response, status) => {
		// 	if (status === google.maps.DirectionsStatus.OK && response) {
		// 		const route = response.routes[0];
		// 		const infoWindow = new google.maps.InfoWindow();

		// 		route.legs.forEach((leg, index) => {
		// 			const label = String.fromCharCode(
		// 				'A'.charCodeAt(0) + index,
		// 			);

		// 			const marker = new google.maps.marker.AdvancedMarkerElement(
		// 				{
		// 					position: leg.start_location,
		// 					map: map,
		// 					content: createMarkerContent(label),
		// 				},
		// 			);
		// 			routeMarkersRef.current.push(marker);

		// 			const matchedBin = matchBin(leg.start_location, data);

		// 			const contentString = buildContentString(
		// 				leg.start_address,
		// 				leg.distance?.text,
		// 				leg.duration?.text,
		// 				matchedBin,
		// 			);

		// 			marker.addListener('click', () => {
		// 				showInfoWindow(
		// 					map,
		// 					infoWindow,
		// 					marker,
		// 					label,
		// 					contentString,
		// 				);
		// 			});
		// 		});

		// 		// Add marker for final destination (end_location of last leg)
		// 		const lastLeg = route.legs[route.legs.length - 1];
		// 		const endLabel = String.fromCharCode(
		// 			'A'.charCodeAt(0) + route.legs.length,
		// 		);

		// 		const finalMarker =
		// 			new google.maps.marker.AdvancedMarkerElement({
		// 				position: lastLeg.end_location,
		// 				map: map,
		// 				content: createMarkerContent(endLabel),
		// 			});
		// 		routeMarkersRef.current.push(finalMarker);

		// 		const matchedFinalBin = matchBin(lastLeg.end_location, data);
		// 		const finalContentString = buildContentString(
		// 			lastLeg.end_address,
		// 			null,
		// 			null,
		// 			matchedFinalBin,
		// 		);

		// 		finalMarker.addListener('click', () => {
		// 			showInfoWindow(
		// 				map,
		// 				infoWindow,
		// 				finalMarker,
		// 				endLabel,
		// 				finalContentString,
		// 			);
		// 		});

		// 		directionsRenderer.setDirections(response);
		// 	} else {
		// 		console.error('Directions request failed due to', status);
		// 	}
		// });
		directionsService
			.route({
				origin: { lat: -1.2921, lng: 36.8219 }, // Nairobi
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

					const isClose = (a: number, b: number) =>
						Math.abs(a - b) < 0.0005;

					const matchedBin = data.find((bin) => {
						const binLat = parseFloat(bin.latitude);
						const binLng = parseFloat(bin.longitude);
						const legLat = leg.start_location.lat();
						const legLng = leg.start_location.lng();
						return (
							isClose(binLat, legLat) && isClose(binLng, legLng)
						);
					});

					const binDetails = matchedBin
						? `
											<p><strong>Bin #: </strong> ${matchedBin.device_id}</p>
											<p><strong>Apartment: </strong> ${matchedBin.apartment}</p>
											<p><strong>Fill Level: </strong> ${matchedBin.percentage_full}%</p>
											<p><strong>Air Quality: </strong> ${matchedBin.air_quality}</p>
					`
						: '<p><strong>Bin Info:</strong> Not Found</p>';

					const contentString = `
						<div>
						<p><strong>Address:</strong> ${leg.start_address}</p>
						${binDetails}
						<p><strong>Distance to next:</strong> ${leg.distance!.text}</p>
						<p><strong>Duration:</strong> ${leg.duration!.text}</p>
						</div>
					`;
					// const contentString = `
					//     <div>
					//     <p><strong>Address:</strong> ${leg.start_address}</p>
					//     <p><strong>Distance to next:</strong> ${leg.distance!.text}</p>
					//     <p><strong>Duration:</strong> ${leg.duration!.text}</p>
					//     </div>
					// `;

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
	}, [data, selectedBinType, directionsService, directionsRenderer]);

	return (
		<>
			{data &&
				data.map((bin) => {
					const isCritical =
						bin.is_fill_critical || bin.is_gas_critical;

					if (selectedBinType === 'safe' && isCritical) {
						return null;
					}

					if (selectedBinType === 'fill') {
						if (canRoute) {
							if (isCritical) return null;
						}

						if (!isCritical) return null;
					}

					if (selectedBinType === 'all') {
						if (canRoute) {
							if (isCritical) return null;
						}
					}

					return (
						<MarkerWithInfoWindow key={bin.device_id} bin={bin} />
					);
				})}
		</>
	);
}

// Utility: Match bin by coordinates with tolerance
// function matchBin(location: google.maps.LatLng, bins: any[]) {
// 	const isClose = (a: number, b: number) => Math.abs(a - b) < 0.0005;

// 	return bins.find((bin) => {
// 		const binLat = parseFloat(bin.latitude);
// 		const binLng = parseFloat(bin.longitude);
// 		return (
// 			isClose(location.lat(), binLat) && isClose(location.lng(), binLng)
// 		);
// 	});
// }

// // Utility: InfoWindow HTML builder
// function buildContentString(
// 	address: string,
// 	distance: string | null,
// 	duration: string | null,
// 	bin: any,
// ) {
// 	const binDetails = bin
// 		? `
// 			<p><strong>Bin #: </strong> ${bin.device_id}</p>
// 			<p><strong>Apartment: </strong> ${bin.apartment}</p>
// 			<p><strong>Fill Level: </strong> ${bin.percentage_full}%</p>
// 			<p><strong>Air Quality: </strong> ${bin.air_quality}</p>
// 		`
// 		: '<p><strong>Bin Info:</strong> Not Found</p>';

// 	return `
// 		<div>
// 			<p><strong>Address:</strong> ${address}</p>
// 			${binDetails}
// 			${distance ? `<p><strong>Distance to next:</strong> ${distance}</p>` : ''}
// 			${duration ? `<p><strong>Duration:</strong> ${duration}</p>` : ''}
// 		</div>
// 	`;
// }

// // Utility: InfoWindow display
// function showInfoWindow(
// 	map: google.maps.Map,
// 	infoWindow: google.maps.InfoWindow,
// 	marker: google.maps.marker.AdvancedMarkerElement,
// 	label: string,
// 	contentString: string,
// ) {
// 	const contentElement = document.createElement('div');
// 	const heading = document.createElement('h2');
// 	heading.textContent = `Stop ${label}`;
// 	heading.style.fontSize = '16px';
// 	heading.style.fontWeight = 'bold';
// 	contentElement.appendChild(heading);

// 	infoWindow.setContent(contentString);
// 	infoWindow.setHeaderContent(contentElement);
// 	infoWindow.open(map, marker);
// }

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
