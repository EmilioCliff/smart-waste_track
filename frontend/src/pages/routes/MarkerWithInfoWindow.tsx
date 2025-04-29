import { SensorData } from '@/API';
import {
	AdvancedMarker,
	InfoWindow,
	useAdvancedMarkerRef,
} from '@vis.gl/react-google-maps';
import { useCallback, useState } from 'react';

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
						<p>Air Quality: {bin.air_quality}</p>
					</div>
				</InfoWindow>
			)}
		</>
	);
};

export default MarkerWithInfoWindow;
