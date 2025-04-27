import { useState } from 'react';
import { useNavigate } from 'react-router';
import { AlertTriangle, RefreshCw, Coffee } from 'lucide-react';

export default function ErrorComponent(message: any) {
	const [bounceActive, setBounceActive] = useState(false);
	const navigate = useNavigate();

	const handleRetry = () => {
		setBounceActive(true);
		setTimeout(() => {
			setBounceActive(false);
			navigate('/');
		}, 1000);
	};

	return (
		<div className="flex flex-col items-center justify-center p-8 bg-gray-50 rounded-lg shadow-md border border-red-200 max-w-md mx-auto text-center">
			<div
				className={`transition-all duration-500 ${
					bounceActive ? 'animate-bounce' : ''
				}`}
			>
				<AlertTriangle
					className="dark:text-[#1b3a2b] mb-4"
					size={64}
					strokeWidth={1.5}
				/>
			</div>

			<h2 className="text-2xl dark:text-[#1b3a2b] font-bold mb-2">
				Oops! Error Loading Data
			</h2>

			<div className="flex items-center bg-amber-50 p-3 rounded-md mb-4 text-amber-800 text-sm">
				<Coffee className="mr-2" size={18} />
				<span>
					Maybe it's time for a coffee break while we fix this?
				</span>
				<span>{message}</span>
			</div>

			<button
				onClick={handleRetry}
				className="flex items-center dark:bg-[#1b3a2b] dark:hover:bg-green-900 bg-green-900 hover:bg-[#1b3a2b] cursor-pointer text-white font-medium py-2 px-4 rounded-md transition-colors duration-300"
			>
				<RefreshCw className="mr-2" size={18} />
				Try Again
			</button>
		</div>
	);
}
