import { DataTable } from '@/components/table/data-table';
import { dustbinColumns } from './dustbin';
import { testDustbinsStatus } from '@/lib/data';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import DustbinForm from './DustbinForm';
import { useState } from 'react';
import { getDustbins } from '@/services/getDustbins';
import { useQuery } from '@tanstack/react-query';
import TableSkeleton from '@/components/UI/TableSkeleton';

function DustbinPage() {
	const [formOpen, setFormOpen] = useState(false);

	const { isLoading, error, data } = useQuery({
		queryKey: ['dustbins'],
		queryFn: getDustbins,
		staleTime: 5 * 1000,
	});

	if (isLoading) {
		return <TableSkeleton />;
	}
	if (error) {
		return <div>Error: {error.message}</div>;
	}

	console.log('Dustbins:', data);

	return (
		<div className="px-4">
			<div className="flex justify-between items-center mb-4">
				<h1 className="text-3xl font-bold">Dustbins</h1>
				{/* <button onClick={getDustbins}>Click Here</button> */}
				<Dialog open={formOpen} onOpenChange={setFormOpen}>
					<DialogTrigger asChild>
						<Button className="text-xs py-1 font-bold" size="sm">
							Add New Dustbin
						</Button>
					</DialogTrigger>
					<DialogContent className="max-w-screen-lg max-h-screen overflow-y-auto">
						<DialogHeader>
							<DialogTitle>Add New Dustbin</DialogTitle>
							<DialogDescription>
								Enter the details for the new branch.
							</DialogDescription>
						</DialogHeader>
						<DustbinForm onFormOpen={setFormOpen} />
					</DialogContent>
				</Dialog>
			</div>
			<DataTable
				data={data || []}
				columns={dustbinColumns}
				searchableColumns={[
					{
						id: 'apartmentName',
						title: 'apartment name',
					},
				]}
				facetedFilterColumns={[
					{
						id: 'status',
						title: 'Status',
						options: testDustbinsStatus,
					},
				]}
			/>
		</div>
	);
}

export default DustbinPage;
