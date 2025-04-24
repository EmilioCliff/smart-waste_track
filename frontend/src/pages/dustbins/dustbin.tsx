import { ColumnDef } from '@tanstack/react-table';
import DataTableColumnHeader from '@/components/table/data-table-column-header';
import { Badge } from '@/components/ui/badge';
import { SensorData } from '@/API';

export const dustbinColumns: ColumnDef<SensorData>[] = [
	{
		accessorKey: 'id',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="ID" />
		),
		cell: ({ row }) => (
			<div className="text-center">{row.getValue('device_id')}</div>
		),
		enableSorting: true,
		enableHiding: true,
	},
	{
		accessorKey: 'apartmentName',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Apartment Name" />
		),
		cell: ({ row }) => (
			<div className="w-[80]">
				N/A
				{/* {row.original.apartmentName.toLowerCase()} */}
			</div>
		),
		// filterFn: (row, id, filterValue) => {
		// 	const name = row.original.apartmentName.toLowerCase();
		// 	return name.includes(filterValue.toLowerCase());
		// },
		enableSorting: true,
	},
	{
		accessorKey: 'location',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Location" />
		),
		cell: ({ row }) => (
			<div>
				{'{lat' +
					row.original.latitude +
					',lgn' +
					row.original.longitude +
					'}'}
			</div>
		),
		enableHiding: true,
	},
	{
		accessorKey: 'status',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Status" />
		),
		cell: ({ row }) => {
			const distanceSensor = parseFloat(
				row.original.percentage_full || '0',
			);
			const methanePPM = parseFloat(row.original.methane_ppm || '0');
			const co2PPM = parseFloat(row.original.co2_ppm || '0');

			let status = 'defaulted';

			const isToxic = methanePPM >= 50 || co2PPM >= 400;

			if (isToxic) {
				status = 'toxic';
			} else if (distanceSensor <= 10) {
				status = 'full';
			} else if (distanceSensor > 10 && distanceSensor <= 20) {
				status = 'half full';
			} else if (distanceSensor > 20) {
				status = 'okay';
			}

			const statusColors: Record<string, string> = {
				full: 'bg-red-500 text-white',
				'half full': 'bg-yellow-500 text-black',
				okay: 'bg-green-500 text-white',
				toxic: 'bg-purple-500 text-white',
				defaulted: 'bg-gray-500 text-white',
			};

			return (
				<Badge
					className={`px-2 py-1 rounded-md ${statusColors[status]}`}
				>
					{status.toUpperCase()}
				</Badge>
			);
		},
		filterFn: (row, id, filterValues: string[]) => {
			const distanceSensor = parseFloat(
				row.original.percentage_full || '0',
			);
			const methanePPM = parseFloat(row.original.methane_ppm || '0');
			const co2PPM = parseFloat(row.original.co2_ppm || '0');

			let status = 'defaulted';

			const isToxic = methanePPM >= 50 || co2PPM >= 400;

			if (isToxic) {
				status = 'toxic';
			} else if (distanceSensor <= 10) {
				status = 'full';
			} else if (distanceSensor > 10 && distanceSensor <= 20) {
				status = 'half full';
			} else if (distanceSensor > 20) {
				status = 'okay';
			}

			return filterValues.includes(status);
		},
	},
	// {
	// 	accessorKey: 'status',
	// 	header: ({ column }) => (
	// 		<DataTableColumnHeader column={column} title="Status" />
	// 	),
	// 	cell: ({ row }) => {
	// 		// const { distanceSensor, gasSensor } = row.original as Dustbin;
	// 		const distanceSensor = row.original.percentage_full;
	// 		const methanePPM = row.original.methane_ppm;
	// 		const co2PPM = row.original.co2_ppm;

	// 		let status = 'defaulted';
	// 		if (gasSensor >= 50) {
	// 			status = 'toxic';
	// 		} else if (distanceSensor <= 10) {
	// 			status = 'full';
	// 		} else if (distanceSensor > 10 && distanceSensor <= 20) {
	// 			status = 'half full';
	// 		} else if (distanceSensor > 20) {
	// 			status = 'okay';
	// 		}

	// 		const statusColors: Record<string, string> = {
	// 			full: 'bg-red-500 text-white',
	// 			'half full': 'bg-yellow-500 text-black',
	// 			okay: 'bg-green-500 text-white',
	// 			toxic: 'bg-purple-500 text-white',
	// 			defaulted: 'bg-gray-500 text-white',
	// 		};

	// 		return (
	// 			<Badge
	// 				className={`px-2 py-1 rounded-md ${statusColors[status]}`}
	// 			>
	// 				{status.toUpperCase()}
	// 			</Badge>
	// 		);
	// 	},
	// 	filterFn: (row, id, filterValues: string[]) => {
	// 		const { distanceSensor, gasSensor } = row.original as Dustbin;

	// 		let status = 'defaulted';
	// 		if (gasSensor >= 50) {
	// 			status = 'toxic';
	// 		} else if (distanceSensor <= 10) {
	// 			status = 'full';
	// 		} else if (distanceSensor > 10 && distanceSensor <= 20) {
	// 			status = 'half full';
	// 		} else if (distanceSensor > 20) {
	// 			status = 'okay';
	// 		}

	// 		return filterValues.includes(status);
	// 	},
	// },
];
