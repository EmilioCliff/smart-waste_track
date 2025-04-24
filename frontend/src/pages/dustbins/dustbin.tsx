import { ColumnDef } from '@tanstack/react-table';
import { Dustbin } from '@/lib/types';
import DataTableColumnHeader from '@/components/table/data-table-column-header';
import { Badge } from '@/components/ui/badge';

export const dustbinColumns: ColumnDef<Dustbin>[] = [
	{
		accessorKey: 'id',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="ID" />
		),
		cell: ({ row }) => (
			<div className="text-center">{`${String(
				row.getValue('id'),
			).padStart(3, '0')}`}</div>
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
				{row.original.apartmentName.toLowerCase()}
			</div>
		),
		filterFn: (row, id, filterValue) => {
			const name = row.original.apartmentName.toLowerCase();
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
					row.original.location.latitude +
					',lgn' +
					row.original.location.longitude +
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
			const { distanceSensor, gasSensor } = row.original as Dustbin;

			let status = 'defaulted';
			if (gasSensor >= 50) {
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
			const { distanceSensor, gasSensor } = row.original as Dustbin;

			let status = 'defaulted';
			if (gasSensor >= 50) {
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
];
