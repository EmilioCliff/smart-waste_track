import { Link } from 'react-router';
import { useAuth } from '@/hooks/useAuth';
import ThemeToggle from './ThemeToogle';
import { ChevronDown, LogOut, Menu, ChevronLeft } from 'lucide-react';
import { useSidebar } from '@/components/ui/sidebar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

function Navbar() {
	const { toggleSidebar, open } = useSidebar();
	const { logout, user } = useAuth();

	return (
		<>
			<header className="shared-header-sidebar-styles shadow-lg fixed top-0 left-0 z-[20] w-full flex items-center pe-2">
				<div>
					<Link
						style={{ color: 'white' }}
						className={`flex-none flex border-r-2 py-2 px-2 gap-2 ${
							open ? 'w-64' : ''
						} hover:cursor-pointer border-indigo-200/20`}
						to="/dashboard"
					>
						<div className="flex justify-center items-center">
							<img
								className="w-16 h-auto object-contain"
								src="/afya_credit.png"
								alt=""
							/>
							<h3 className="text-lg text-black dark:text-white font-extrabold tracking-widest">
								Eco Bin
							</h3>
						</div>
					</Link>
				</div>
				<div className="border-r-2 py-6 px-4 border-indigo-200/20">
					{open ? (
						<ChevronLeft
							className="hover:cursor-pointer"
							onClick={toggleSidebar}
						/>
					) : (
						<Menu
							className="hover:cursor-pointer"
							onClick={toggleSidebar}
						/>
					)}
				</div>
				<div className="flex ml-auto items-center">
					<ThemeToggle />

					<div className="mr-4">
						<DropdownMenu>
							<DropdownMenuTrigger
								asChild
								className="bg-transparent border-none p-0 hover:bg-transparent cursor-default "
							>
								<div className="flex flex-row border-l-2 py-4 pl-2 border-grey gap-2 align-center hover:cursor-pointer">
									<Avatar>
										<AvatarImage src="https://github.com/shadcn.png" />
										<AvatarFallback>CN</AvatarFallback>
									</Avatar>
									<p className="my-auto">
										{user?.name
											?.split(' ')[0]
											.toUpperCase()}
									</p>
									<ChevronDown
										size={20}
										className="my-auto"
									/>
								</div>
							</DropdownMenuTrigger>
							<DropdownMenuContent>
								<DropdownMenuItem onClick={logout} className="">
									<LogOut /> Logout
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				</div>
			</header>
		</>
	);
}

export default Navbar;
