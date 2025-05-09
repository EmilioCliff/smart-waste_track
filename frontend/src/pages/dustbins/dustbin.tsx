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
			<div className="text-center">{row.original.device_id}</div>
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
			<div className="w-[80]">{row.original.apartment}</div>
		),
		filterFn: (row, _id, filterValue) => {
			const name = row.original.apartment.toLowerCase();
			return name.includes(filterValue.toLowerCase());
		},
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
					parseFloat(row.original.latitude).toFixed(3) +
					',lgn' +
					parseFloat(row.original.longitude).toFixed(3) +
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
			const distanceSensor = row.original.percentage_full;
			const gasCritical = row.original.is_gas_critical;

			let status = 'defaulted';

			if (gasCritical) {
				status = 'toxic';
			} else if (distanceSensor >= 75) {
				status = 'full';
			} else if (distanceSensor >= 50 && distanceSensor < 75) {
				status = '3/4 full';
			} else if (distanceSensor >= 35 && distanceSensor < 50) {
				status = 'half full';
			} else if (distanceSensor < 35) {
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
		filterFn: (row, _id, filterValues: string[]) => {
			const distanceSensor = row.original.percentage_full;
			const gasCritical = row.original.is_gas_critical;

			let status = 'defaulted';

			if (gasCritical) {
				status = 'toxic';
			} else if (distanceSensor >= 75) {
				status = 'full';
			} else if (distanceSensor >= 50 && distanceSensor < 75) {
				status = '3/4 full';
			} else if (distanceSensor >= 35 && distanceSensor < 50) {
				status = 'half full';
			} else if (distanceSensor < 35) {
				status = 'okay';
			}

			return filterValues.includes(status);
		},
	},
];
