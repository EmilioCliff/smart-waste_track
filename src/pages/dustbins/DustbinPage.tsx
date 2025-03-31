import { DataTable } from '@/components/table/data-table';
import { dustbinColumns } from './dustbin';
import { testDustbins, testDustbinsStatus } from '@/lib/data';

function DustbinPage() {
	return (
		<div className="px-4">
			<div className="flex justify-between items-center mb-4">
				<h1 className="text-3xl font-bold">Dustbins</h1>
			</div>
			<DataTable
				data={testDustbins || []}
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
