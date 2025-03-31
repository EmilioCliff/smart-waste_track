export const testWidgets = [
	{
		title: 'Fill Level',
		firstTitle: 'Full bins',
		firstValue: 20,
		secondTitle: 'Half bins',
		secondValue: 30,
	},
	{
		title: 'Toxic Level',
		firstTitle: 'High',
		firstValue: 7,
		secondTitle: 'Low',
		secondValue: 12,
	},
	{
		title: 'Apartments',
		firstTitle: 'Upcoming pickups',
		firstValue: 10,
		secondTitle: 'Later pickups',
		secondValue: 30,
	},
	{
		title: 'Reviews',
		firstTitle: 'Good',
		firstValue: 1,
		secondTitle: 'Bad',
		secondValue: 8,
	},
];

export const testSensorData = [
	{
		time: '10:00',
		bin1_distance: 30,
		bin1_gas: 80,
		bin2_distance: 25,
		bin2_gas: 90,
	},
	{
		time: '10:10',
		bin1_distance: 28,
		bin1_gas: 85,
		bin2_distance: 22,
		bin2_gas: 88,
	},
	{
		time: '10:20',
		bin1_distance: 27,
		bin1_gas: 78,
		bin2_distance: 20,
		bin2_gas: 85,
	},
	{
		time: '10:30',
		bin1_distance: 25,
		bin1_gas: 72,
		bin2_distance: 18,
		bin2_gas: 80,
	},
	{
		time: '10:40',
		bin1_distance: 22,
		bin1_gas: 65,
		bin2_distance: 15,
		bin2_gas: 75,
	},
];

export const testDustbinsStatus = [
	{
		value: 'toxic',
		label: 'TOXIC',
	},
	{
		value: 'full',
		label: 'FULL',
	},
	{
		value: 'half full',
		label: 'HALF FULL',
	},
	{
		value: 'okay',
		label: 'OKAY',
	},
];

export const testDustbins = [
	{
		id: 'bin-001',
		distanceSensor: 5, // Full
		gasSensor: 30,
		location: { latitude: -1.286389, longitude: 36.817223 }, // Nairobi
		apartmentName: 'Greenwood Apartments',
	},
	{
		id: 'bin-002',
		distanceSensor: 15, // Half Full
		gasSensor: 40,
		location: { latitude: -1.292066, longitude: 36.821945 }, // CBD
		apartmentName: 'Sunrise Towers',
	},
	{
		id: 'bin-003',
		distanceSensor: 25, // Okay
		gasSensor: 20,
		location: { latitude: -1.3, longitude: 36.85 },
		apartmentName: 'West End Apartments',
	},
	{
		id: 'bin-004',
		distanceSensor: 7, // Full
		gasSensor: 70, // Toxic
		location: { latitude: -1.315, longitude: 36.825 },
		apartmentName: 'Blue Sky Residences',
	},
	{
		id: 'bin-005',
		distanceSensor: 18, // Half Full
		gasSensor: 50, // Toxic
		location: { latitude: -1.27, longitude: 36.81 },
		apartmentName: 'Eco Haven',
	},
	{
		id: 'bin-006',
		distanceSensor: 30, // Okay
		gasSensor: 10,
		location: { latitude: -1.29, longitude: 36.82 },
		apartmentName: 'Garden Villas',
	},
	{
		id: 'bin-007',
		distanceSensor: 8, // Full
		gasSensor: 55, // Toxic
		location: { latitude: -1.35, longitude: 36.88 },
		apartmentName: 'Ocean View Apartments',
	},
	{
		id: 'bin-008',
		distanceSensor: 22, // Okay
		gasSensor: 35,
		location: { latitude: -1.3, longitude: 36.78 },
		apartmentName: 'Palm Grove',
	},
	{
		id: 'bin-009',
		distanceSensor: 12, // Half Full
		gasSensor: 45,
		location: { latitude: -1.31, longitude: 36.8 },
		apartmentName: 'Serene Heights',
	},
	{
		id: 'bin-010',
		distanceSensor: 4, // Full
		gasSensor: 20,
		location: { latitude: -1.32, longitude: 36.85 },
		apartmentName: 'Horizon Towers',
	},
];
