import { testWidgets } from '@/lib/data';
import Widget from '@/components/UI/Widget';
import DashTimeSeriesGraph from '@/components/UI/DashTimeSeries';

function Dashboard() {
	return (
		<div className="px-4">
			<h1 className="text-3xl font-bold mb-6 text-start">Dashboard</h1>
			<div className="space-y-6">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
					{testWidgets.map((item) => (
						<Widget
							title={item.title}
							firstTitle={item.firstTitle}
							firstValue={item.firstValue}
							secondTitle={item.secondTitle}
							secondValue={item.secondValue}
						/>
					))}
				</div>
				<div className="grid ">
					<DashTimeSeriesGraph />
				</div>
			</div>
		</div>
	);
}

export default Dashboard;
