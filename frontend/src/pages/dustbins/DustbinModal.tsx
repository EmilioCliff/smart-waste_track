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

						{/* CO₂ Level */}
						<div className="bg-white shadow rounded-lg p-4 text-center w-full sm:w-[300px] flex flex-col items-center">
							<h2 className="text-lg font-semibold mb-2">
								CO₂ Level (ppm)
							</h2>
							<ResponsiveContainer width="100%" height={200}>
								<PieChart>
									<Pie
										data={[
											{
												name: 'CO2',
												value: selectedRow.co2_ppm,
											},
											{
												name: 'Max',
												value:
													2000 - selectedRow.co2_ppm,
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
												selectedRow.co2_ppm > 1000
													? '#e53e3e'
													: '#38a169'
											}
										/>
										<Cell fill="#f0f0f0" />
									</Pie>
								</PieChart>
							</ResponsiveContainer>
							<p className="mt-2 text-xl font-bold">
								{selectedRow.co2_ppm} ppm
							</p>
						</div>

						{/* Methane Level */}
						<div className="bg-white shadow rounded-lg p-4 text-center w-full sm:w-[300px] flex flex-col items-center">
							<h2 className="text-lg font-semibold mb-2">
								Methane Level (ppm)
							</h2>
							<ResponsiveContainer width="100%" height={200}>
								<PieChart>
									<Pie
										data={[
											{
												name: 'Methane',
												value: selectedRow.methane_ppm,
											},
											{
												name: 'Max',
												value:
													200 -
													selectedRow.methane_ppm,
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
												selectedRow.methane_ppm > 50
													? '#e53e3e'
													: '#38a169'
											}
										/>
										<Cell fill="#f0f0f0" />
									</Pie>
								</PieChart>
							</ResponsiveContainer>
							<p className="mt-2 text-xl font-bold">
								{selectedRow.methane_ppm} ppm
							</p>
						</div>
					</div>
				)}
			</DialogContent>
		</Dialog>
	);
}

export default DustbinModal;
