import { useTable } from '@/hooks/useTable';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';

function DustbinModal() {
	const { selectedRow, setSelectedRow } = useTable();

	return (
		<Dialog
			open={!!selectedRow}
			onOpenChange={(open: boolean) => {
				if (!open) {
					setSelectedRow(null);
				}
			}}
		>
			<DialogContent className="lg:max-w-screen-lg overflow-y-scroll max-h-screen flex flex-col">
				<DialogHeader>
					<DialogTitle>Dustbin Details</DialogTitle>
					<DialogDescription>
						View dustbin details here.
					</DialogDescription>
				</DialogHeader>

				{selectedRow && (
					<div className="flex flex-wrap gap-4 justify-center">
						{/* Fill Level */}
						<div className="bg-white shadow rounded-lg p-4 text-center w-full sm:w-[300px] flex flex-col items-center">
							<h2 className="text-lg font-semibold mb-2">
								Dustbin Fill Level
							</h2>
							<ResponsiveContainer width="100%" height={200}>
								<PieChart>
									<Pie
										data={[
											{
												name: 'Fill Level',
												value: selectedRow.percentage_full,
											},
											{
												name: 'Max',
												value:
													100 -
													selectedRow.percentage_full,
											},
										]}
										cx="50%"
										cy="50%"
										innerRadius="60%"
										outerRadius="80%"
										startAngle={180}
										endAngle={0}
										dataKey="value"
									>
										<Cell
											fill={
												selectedRow.percentage_full > 70
													? '#e53e3e'
													: '#38a169'
											}
										/>
										<Cell fill="#f0f0f0" />
									</Pie>
								</PieChart>
							</ResponsiveContainer>
							<p className="mt-2 text-xl font-bold">
								{selectedRow.percentage_full} %
							</p>
						</div>

						{/* Gas Level */}
						<div className="bg-white shadow rounded-lg p-4 text-center w-full sm:w-[300px] flex flex-col items-center">
							<h2 className="text-lg font-semibold mb-2">
								Air Quality
							</h2>
							<ResponsiveContainer width="100%" height={200}>
								<PieChart>
									<Pie
										data={[
											{
												name: 'Air Quality',
												value: selectedRow.air_quality,
											},
											{
												name: '3',
												value:
													3 - selectedRow.air_quality,
											},
										]}
										cx="50%"
										cy="50%"
										innerRadius="60%"
										outerRadius="80%"
										startAngle={180}
										endAngle={0}
										dataKey="value"
									>
										<Cell
											fill={
												selectedRow.air_quality > 0.8
													? '#e53e3e'
													: '#38a169'
											}
										/>
										<Cell fill="#f0f0f0" />
									</Pie>
								</PieChart>
							</ResponsiveContainer>
							<p className="mt-2 text-xl font-bold">
								{selectedRow.air_quality}
							</p>
						</div>
					</div>
				)}
			</DialogContent>
		</Dialog>
	);
}

export default DustbinModal;
