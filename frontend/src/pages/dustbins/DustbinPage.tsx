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
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import TableSkeleton from '@/components/UI/TableSkeleton';
import ErrorComponent from '@/components/UI/Error';
import DustbinModal from './DustbinModal';
import { APIProvider } from '@vis.gl/react-google-maps';

function DustbinPage() {
	const [formOpen, setFormOpen] = useState(false);

	// const refetchInterval = Number(import.meta.env.VITE_REFETCH_INTERVAL);

	const { isLoading, error, data } = useQuery({
		queryKey: ['dustbins'],
		queryFn: getDustbins,
		staleTime: 5 * 1000,
		// refetchInterval: refetchInterval,
		placeholderData: keepPreviousData,
	});

	// console.log(import.meta.env.VITE_REFETCH_INTERVAL);
	// useEffect(() => {
	// 	const f = async () => {
	// 		const data = await getDustbin('2025-04-24 21:19:11.646000000');
	// 		console.log('Dustbin:', data);
	// 	};
	// 	f();
	// }, []);

	if (isLoading) {
		return <TableSkeleton />;
	}
	if (error) {
		return <ErrorComponent message={error.message} />;
	}

	console.log('Dustbins:', data);

	return (
		<div className="px-4">
			<div className="flex justify-between items-center mb-4">
				<h1 className="text-3xl font-bold">Dustbins</h1>
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
						<APIProvider
							apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
							libraries={['places']}
							region="KE"
						>
							<DustbinForm onFormOpen={setFormOpen} />
						</APIProvider>
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
			<DustbinModal />
		</div>
	);
}

export default DustbinPage;
