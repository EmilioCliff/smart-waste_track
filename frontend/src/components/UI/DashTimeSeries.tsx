import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SensorData } from '@/API';

const colors = [
	'#8884d8',
	'#82ca9d',
	'#ff7300',
	'#ff0000',
	'#00C49F',
	'#FFBB28',
	'#FF8042',
	'#A28DFF',
	'#FF6666',
	'#00C9FF',
];

const DashTimeSeriesGraph = ({ data }: { data: SensorData[] }) => {
	const sortedData = [...data].sort(
		(a, b) =>
			new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime(),
	);
	const timeseriesData = transformSensorDataToTimeSeries(sortedData);

	const deviceIds = Array.from(new Set(data.map((d) => d.device_id)));

	if (timeseriesData.length === 0) {
		return (
			<Card className="col-span-1">
				<CardHeader>
					<CardTitle>Bin Timeseries Data</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="flex items-center justify-center h-[400px] text-muted-foreground">
						No data available to display
					</div>
				</CardContent>
			</Card>
		);
	}

	return (
		<Card className="col-span-1">
			<CardHeader>
				<CardTitle>Bin Timeseries Data</CardTitle>
			</CardHeader>
			<CardContent className="px-0">
				<ResponsiveContainer width="100%" height={400}>
					<LineChart
						data={timeseriesData}
						margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
					>
						<CartesianGrid strokeDasharray="3 3" />
						<XAxis
							dataKey="time"
							padding={{ left: 30, right: 30 }}
						/>
						<YAxis
							yAxisId="left"
							label={{
								value: 'Distance',
								angle: -90,
								position: 'insideLeft',
							}}
						/>
						<YAxis
							yAxisId="right"
							orientation="right"
							label={{
								value: 'Gas (ppm)',
								angle: -90,
								position: 'insideRight',
							}}
						/>
						<Tooltip />
						<Legend />

						{deviceIds.map((deviceId, index) => (
							<Line
								key={`${deviceId}_distance`}
								type="monotone"
								dataKey={`${deviceId}_distance`}
								stroke={colors[index % colors.length]}
								name={`${deviceId} - Distance`}
								yAxisId="left"
								connectNulls={true}
								activeDot={{ r: 8 }}
							/>
						))}

						{deviceIds.map((deviceId, index) => (
							<Line
								key={`${deviceId}_gas`}
								type="monotone"
								dataKey={`${deviceId}_gas`}
								stroke={colors[(index + 5) % colors.length]}
								strokeDasharray="5 5"
								name={`${deviceId} - Gas`}
								yAxisId="right"
								connectNulls={true}
								activeDot={{ r: 8 }}
							/>
						))}
					</LineChart>
				</ResponsiveContainer>
			</CardContent>
		</Card>
	);
};

export default DashTimeSeriesGraph;

type TimeSeriesData = {
	time: string;
	[key: string]: number | string;
};

function transformSensorDataToTimeSeries(
	sensorData: SensorData[],
): TimeSeriesData[] {
	const groupedByTime: Record<string, TimeSeriesData> = {};

	sensorData.forEach((entry) => {
		const time = new Date(entry.timestamp).toLocaleTimeString([], {
			hour: '2-digit',
			minute: '2-digit',
		});

		if (!groupedByTime[time]) {
			groupedByTime[time] = { time };
		}

		groupedByTime[time][`${entry.device_id}_distance`] = Number(
			(100 - entry.percentage_full).toFixed(1),
		);
		groupedByTime[time][`${entry.device_id}_gas`] = Number(entry.co2_ppm);
	});

	return Object.values(groupedByTime).sort((a, b) => {
		const timeA = new Date(`1970-01-01T${a.time}`);
		const timeB = new Date(`1970-01-01T${b.time}`);
		return timeA.getTime() - timeB.getTime();
	});
}
