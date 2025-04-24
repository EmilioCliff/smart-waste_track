import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { DustbinFormSchema, DustbinFormType } from './schema';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import VirtualizedSelect from '@/components/UI/VisualizedSelect';
import { testApartments } from '@/lib/data';

interface LoanFormProps {
	onFormOpen: (isOpen: boolean) => void;
}

function DustbinForm({ onFormOpen }: LoanFormProps) {
	const form = useForm<DustbinFormType>({
		resolver: zodResolver(DustbinFormSchema),
		defaultValues: {
			latitude: 0,
			longitude: 0,
			apartmentId: 0,
		},
	});

	function onSubmit(values: DustbinFormType) {
		console.log(values);
		onFormOpen(false);
	}

	function onError(errors: any) {
		console.log('Errors: ', errors);
	}

	return (
		<>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit, onError)}
					className="space-y-8"
				>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
						<FormField
							control={form.control}
							name="apartmentId"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Branch</FormLabel>
									<FormControl>
										<VirtualizedSelect
											options={testApartments}
											placeholder="Select Customer Branch"
											value={field.value}
											onChange={(id) =>
												field.onChange(id)
											}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<Button className="ml-auto block" type="submit">
						Add Branch
					</Button>
				</form>
			</Form>
		</>
	);
}

export default DustbinForm;
