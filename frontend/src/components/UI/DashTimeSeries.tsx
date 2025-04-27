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
	const timeseriesData = transformSensorDataToTimeSeries(data ?? []);

	const deviceIds = Array.from(new Set(data.map((d) => d.device_id)));

	return (
		<Card className="col-span-1">
			<CardHeader>
				<CardTitle>Bin Timeseries Data</CardTitle>
			</CardHeader>
			<CardContent>
				<ResponsiveContainer width="100%" height={400}>
					<LineChart
						data={timeseriesData}
						margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
					>
						<CartesianGrid strokeDasharray="3 3" />
						<XAxis dataKey="time" />
						<YAxis />
						<Tooltip />
						<Legend />

						{deviceIds.map((deviceId, index) => (
							<Line
								key={`${deviceId}_distance`}
								type="monotone"
								dataKey={`${deviceId}_distance`}
								stroke={colors[index % colors.length]}
								name={`${deviceId} - Distance`}
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

		groupedByTime[time][`${entry.device_id}_distance`] =
			100 - entry.percentage_full;
		groupedByTime[time][`${entry.device_id}_gas`] = entry.co2_ppm;
	});

	return Object.values(groupedByTime);
}
