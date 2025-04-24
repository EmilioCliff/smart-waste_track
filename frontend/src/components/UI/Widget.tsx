import { Users, Wallet, Flag, DollarSign } from 'lucide-react';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';

interface WidgetProps {
	title: string;
	firstTitle: string;
	firstValue: number;
	secondTitle: string;
	secondValue: number;
}

function Widget(props: WidgetProps) {
	return (
		<Card>
			<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
				<CardTitle className="text-sm font-medium">
					{props.title}
				</CardTitle>
				{props.title === 'Fill Level' && (
					<Users className="h-4 w-4 text-muted-foreground" />
				)}
				{props.title === 'Toxic Level' && (
					<Wallet className="h-4 w-4 text-muted-foreground" />
				)}
				{props.title === 'Apartments' && (
					<Flag className="h-4 w-4 text-muted-foreground" />
				)}
				{props.title === 'Reviews' && (
					<DollarSign className="h-4 w-4 text-muted-foreground" />
				)}
			</CardHeader>
			<CardContent>
				<div className="text-2xl font-bold text-start">
					{(props.firstValue + props.secondValue).toLocaleString()}
				</div>
				<CardDescription className="text-xs flex flex-row justify-between text-muted-foreground">
					<span>
						{props.firstTitle} {props.firstValue}
					</span>
					<span className="ml-auto">
						{props.secondTitle} {props.secondValue}
					</span>
				</CardDescription>
				{/* )} */}
			</CardContent>
		</Card>
	);
}

export default Widget;
