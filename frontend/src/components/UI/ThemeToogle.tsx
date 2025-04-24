import { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';

export default function ThemeToggle() {
	const [darkMode, setDarkMode] = useState(() => {
		return localStorage.getItem('theme') === 'dark';
	});

	useEffect(() => {
		if (darkMode) {
			document.documentElement.classList.add('dark');
			localStorage.setItem('theme', 'dark');
		} else {
			document.documentElement.classList.remove('dark');
			localStorage.setItem('theme', 'light');
		}
	}, [darkMode]);

	return (
		<button
			onClick={() => setDarkMode(!darkMode)}
			className="p-1 rounded-lg hover:cursor-pointer bg-gray-200 dark:bg-gray-800 transition max-h-8"
		>
			{darkMode ? (
				<Sun className=" text-yellow-500" />
			) : (
				<Moon className=" text-gray-900" />
			)}
		</button>
	);
}
