import { SensorData } from '@/API';
import {
	AdvancedMarker,
	InfoWindow,
	useAdvancedMarkerRef,
} from '@vis.gl/react-google-maps';
import { useCallback, useState } from 'react';

// const MarkerWithInfoWindow = () => {
// 	const [markerRef, marker] = useAdvancedMarkerRef();

// 	const [infoWindowShown, setInfoWindowShown] = useState(false);

// 	const handleMarkerClick = useCallback(
// 		() => setInfoWindowShown((isShown) => !isShown),
// 		[],
// 	);

// 	const handleClose = useCallback(() => setInfoWindowShown(false), []);

// 	return (
// 		<>
// 			<AdvancedMarker
// 				ref={markerRef}
// 				position={{ lat: -1.2921, lng: 36.8219 }}
// 				onClick={handleMarkerClick}
// 			>
// 				{/* <Drumstick
//                     size={32}
//                     style={{
//                         color: 'red',
//                         cursor: 'pointer',
//                     }}
//                 /> */}
// 				{/* <img src="/afya_credit.png" width={32} height={32} /> */}
// 			</AdvancedMarker>
// 			{infoWindowShown && (
// 				<InfoWindow anchor={marker} onClose={handleClose}>
// 					<h2>InfoWindow content!</h2>
// 					<p>
// 						Some arbitrary html to be rendered into the InfoWindow.
// 					</p>
// 				</InfoWindow>
// 			)}
// 		</>
// 	);
// };
const MarkerWithInfoWindow = ({ bin }: { bin: SensorData }) => {
	const [markerRef, marker] = useAdvancedMarkerRef();
	const [infoWindowShown, setInfoWindowShown] = useState(false);
	const position = {
		lat: Number(bin.latitude),
		lng: Number(bin.longitude),
	};

	const handleMarkerClick = useCallback(
		() => setInfoWindowShown((isShown) => !isShown),
		[],
	);

	const handleClose = useCallback(() => setInfoWindowShown(false), []);

	return (
		<>
			<AdvancedMarker
				ref={markerRef}
				position={position}
				onClick={handleMarkerClick}
			>
				<div
					style={{
						width: 20,
						height: 20,
						borderRadius: '50%',
						backgroundColor:
							bin.is_fill_critical || bin.is_gas_critical
								? 'red'
								: 'green',
						border: '2px solid white',
					}}
				></div>
			</AdvancedMarker>
			{infoWindowShown && (
				<InfoWindow
					anchor={marker}
					headerContent={<h3>Apartment: {bin.apartment}</h3>}
					onClose={handleClose}
				>
					<div>
						<h3>Bin #{bin.device_id}</h3>
						<p>Fill Level: {bin.percentage_full}%</p>
						<p>
							CO<sub>2</sub> Level: {bin.co2_ppm}
						</p>
						<p>Methane Level: {bin.methane_ppm}</p>
					</div>
				</InfoWindow>
			)}
		</>
	);
};

export default MarkerWithInfoWindow;
