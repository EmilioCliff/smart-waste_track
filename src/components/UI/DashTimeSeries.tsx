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
import { testSensorData } from '@/lib/data';

const DashTimeSeriesGraph = () => {
	return (
		<Card className="col-span-1">
			<CardHeader>
				<CardTitle>Bin Timeseries Data</CardTitle>
			</CardHeader>
			<CardContent>
				<ResponsiveContainer width="100%" height={400}>
					<LineChart
						data={testSensorData}
						margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
					>
						<CartesianGrid strokeDasharray="3 3" />
						<XAxis dataKey="time" />
						<YAxis />
						<Tooltip />
						<Legend />
						{/* Bin 1 Readings */}
						<Line
							type="monotone"
							dataKey="bin1_distance"
							stroke="#8884d8"
							name="Bin 1 - Distance"
						/>
						<Line
							type="monotone"
							dataKey="bin1_gas"
							stroke="#82ca9d"
							name="Bin 1 - Gas"
						/>
						{/* Bin 2 Readings */}
						<Line
							type="monotone"
							dataKey="bin2_distance"
							stroke="#ff7300"
							name="Bin 2 - Distance"
						/>
						<Line
							type="monotone"
							dataKey="bin2_gas"
							stroke="#ff0000"
							name="Bin 2 - Gas"
						/>
					</LineChart>
				</ResponsiveContainer>
			</CardContent>
		</Card>
	);
};

export default DashTimeSeriesGraph;
