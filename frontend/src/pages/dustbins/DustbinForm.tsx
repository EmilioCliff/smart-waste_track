import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { z } from 'zod';
import { toast } from 'react-toastify';
import addDustin from '@/services/addDustbin';
import { Input } from '@/components/ui/input';
import { FixedSizeList as List } from 'react-window';
import { useAutocompleteSuggestions } from '@/hooks/use-autocomplete-suggestions';
import { useCallback, useState } from 'react';
import { cn } from '@/lib/utils';

interface LoanFormProps {
	onFormOpen: (isOpen: boolean) => void;
}

const dustbinFormSchema = z.object({
	device_id: z.string().min(4).startsWith('BIN-'),
	apartment: z.string().min(5),
	latitude: z.number().min(-90).max(90),
	longitude: z.number().min(-180).max(180),
});

type dustbinFormType = z.infer<typeof dustbinFormSchema>;

function DustbinForm({ onFormOpen }: LoanFormProps) {
	const [inputValue, setInputValue] = useState('');
	const [locationError, setLocationError] = useState('');
	const [locationChose, setLocationChose] = useState<string | undefined>('');
	const { suggestions, resetSession } =
		useAutocompleteSuggestions(inputValue);

	const form = useForm<dustbinFormType>({
		resolver: zodResolver(dustbinFormSchema),
		defaultValues: {
			latitude: 0,
			longitude: 0,
			apartment: '',
			device_id: '',
		},
	});

	function onSubmit(values: dustbinFormType) {
		console.log(values);
		if (!values.latitude || !values.longitude) {
			setLocationError('Please select a location');
			return;
		}
		addDustin(values)
			.then((res) => {
				toast.success(res.message);
			})
			.catch((err) => {
				toast.error(err.message);
			});
		onFormOpen(false);
	}

	function onError(errors: any) {
		console.log('Errors: ', errors);
	}

	const handleInput = (e: any) => {
		setInputValue(e.target.value);
	};

	function onPlaceSelect(place: google.maps.places.Place) {
		place.fetchFields({
			fields: ['displayName', 'formattedAddress', 'location', 'viewport'],
		});

		form.setValue('latitude', place.location?.lat() || 0);
		form.setValue('longitude', place.location?.lng() || 0);
		setLocationError('');
	}

	const handleSuggestionClick = useCallback(
		async (suggestion: google.maps.places.AutocompleteSuggestion) => {
			if (!suggestion.placePrediction) return;

			const place = suggestion.placePrediction.toPlace();

			await place.fetchFields({
				fields: [
					'viewport',
					'location',
					'svgIconMaskURI',
					'iconBackgroundColor',
				],
			});

			setInputValue('');

			resetSession();

			onPlaceSelect(place);
		},
		[onPlaceSelect],
	);

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
							name="device_id"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Device ID</FormLabel>
									<FormControl>
										<Input
											placeholder="BIN-xxx"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="apartment"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Apartment Name</FormLabel>
									<FormControl>
										<Input
											placeholder="Tripleas Suites"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<div className="autocomplete-container md:col-span-2">
							<FormItem>
								<FormLabel>Select location</FormLabel>
								<Input
									placeholder="Select location"
									value={
										inputValue ? inputValue : locationChose
									}
									onInput={(event) => handleInput(event)}
								/>
								<FormMessage>
									{locationError && locationError}
								</FormMessage>
							</FormItem>

							{suggestions.length > 0 && (
								<List
									height={200}
									itemCount={suggestions.length}
									itemSize={60}
									width="100%"
									className="absolute z-10"
								>
									{({ index, style }) => (
										<div
											style={style}
											className={cn(
												'px-4 py-2 cursor-pointer hover:bg-green-200 dark:hover:bg-[hsl(145,40%,25%)]',
												index % 2
													? 'bg-green-100 dark:bg-[hsl(145,35%,20%)]'
													: 'bg-white dark:bg-[hsl(145,50%,15%)]',
											)}
											onClick={() => {
												setLocationChose(
													suggestions[index]
														.placePrediction?.text
														.text,
												);
												handleSuggestionClick(
													suggestions[index],
												);
											}}
										>
											{
												suggestions[index]
													.placePrediction?.text.text
											}
										</div>
									)}
								</List>
							)}
						</div>
					</div>
					<Button className="ml-auto block" type="submit">
						Add Bin
					</Button>
				</form>
			</Form>
		</>
	);
}

export default DustbinForm;
