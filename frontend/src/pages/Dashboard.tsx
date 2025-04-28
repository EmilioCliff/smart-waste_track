import Widget from '@/components/UI/Widget';
import DashTimeSeriesGraph from '@/components/UI/DashTimeSeries';
import { SensorData } from '@/API';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { getDustbins } from '@/services/getDustbins';
import DashboardSkeleton from '@/components/UI/DashboardSkeleton';
import ErrorComponent from '@/components/UI/Error';

function Dashboard() {
	const refetchInterval = Number(import.meta.env.VITE_REFETCH_INTERVAL);

	const { isLoading, error, data } = useQuery({
		queryKey: ['dustbins'],
		queryFn: getDustbins,
		staleTime: 5 * 1000,
		refetchInterval: refetchInterval,
		placeholderData: keepPreviousData,
	});

	if (isLoading) return <DashboardSkeleton />;

	if (error) {
		return <ErrorComponent message={error.message} />;
	}

	const widgets = transformSensorDataToWidgets(data ?? []);

	return (
		<div className="px-0 md:px-4">
			<h1 className="text-3xl font-bold mb-6 text-start">Dashboard</h1>
			<div className="space-y-6">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
					{widgets.map((item) => (
						<Widget
							key={item.title}
							title={item.title}
							firstTitle={item.firstTitle}
							firstValue={item.firstValue}
							secondTitle={item.secondTitle}
							secondValue={item.secondValue}
						/>
					))}
				</div>
				<div className="grid ">
					<DashTimeSeriesGraph data={data ?? []} />
				</div>
			</div>
		</div>
	);
}

export default Dashboard;

type WidgetData = {
	title: string;
	firstTitle: string;
	firstValue: number;
	secondTitle: string;
	secondValue: number;
};

function transformSensorDataToWidgets(sensorData: SensorData[]): WidgetData[] {
	const fillLevel = {
		title: 'Fill Level',
		firstTitle: 'Full bins',
		firstValue: sensorData.filter((data) => data.percentage_full >= 80)
			.length,
		secondTitle: 'Half bins',
		secondValue: sensorData.filter(
			(data) => data.percentage_full >= 40 && data.percentage_full < 80,
		).length,
	};

	const toxicLevel = {
		title: 'Toxic Level',
		firstTitle: 'High',
		firstValue: sensorData.filter((data) => data.is_gas_critical).length,
		secondTitle: 'Low',
		secondValue: sensorData.filter((data) => !data.is_gas_critical).length,
	};

	const apartments = {
		title: 'Apartments',
		firstTitle: 'Upcoming pickups',
		firstValue: sensorData.filter((data) => data.is_fill_critical).length,
		secondTitle: 'Later pickups',
		secondValue: sensorData.filter((data) => !data.is_fill_critical).length,
	};

	return [fillLevel, toxicLevel, apartments];
}
