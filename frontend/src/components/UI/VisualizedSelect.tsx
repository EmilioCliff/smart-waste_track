import { useState, useMemo } from 'react';
import { FixedSizeList as List } from 'react-window';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import {
	Select,
	SelectContent,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { commonDataResponse } from '@/lib/types';

interface VirtualizedSelectProps {
	options: commonDataResponse[];
	placeholder: string;
	value: number | string | null;
	onChange?: (id: number) => void;
	onPhoneChange?: (phoneNumber: string) => void;
}

export default function VirtualizedSelect({
	options,
	placeholder,
	value,
	onChange,
	onPhoneChange,
}: VirtualizedSelectProps) {
	const [searchQuery, setSearchQuery] = useState('');
	const [selectedOption, setSelectedOption] = useState('');
	const [open, setOpen] = useState(false);

	const filteredOptions = useMemo(() => {
		return options.filter((option) =>
			option.name.toLowerCase().includes(searchQuery.toLowerCase()),
		);
	}, [searchQuery, options]);

	return (
		<Select open={open} onOpenChange={setOpen}>
			<SelectTrigger>
				<SelectValue
					placeholder={
						selectedOption === '' ? placeholder : selectedOption
					}
				/>
			</SelectTrigger>
			<SelectContent>
				<div className="p-2">
					<Input
						placeholder={`Search ${placeholder.toLowerCase()}...`}
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
					/>
				</div>
				<List
					height={200}
					itemCount={filteredOptions.length}
					itemSize={40}
					width="100%"
				>
					{({ index, style }) => (
						<div
							style={style}
							className={cn(
								'px-4 py-2 cursor-pointer hover:bg-green-200 dark:hover:bg-[hsl(145,40%,25%)]',
								index % 2
									? 'bg-green-100 dark:bg-[hsl(145,35%,20%)]' // Lighter green for alternate rows
									: 'bg-white dark:bg-[hsl(145,50%,15%)]', // Darker green for contrast
							)}
							onClick={() => {
								setSelectedOption(filteredOptions[index].name);
								if (onChange) {
									onChange(filteredOptions[index].id);
								}
								if (onPhoneChange) {
									onPhoneChange(
										filteredOptions[index].name
											.split('-')[1]
											?.trim(),
									);
								}
								setOpen(false);
							}}
						>
							{filteredOptions[index].name}
						</div>
					)}
				</List>
			</SelectContent>
		</Select>
	);
}
