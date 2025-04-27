import { Calendar, Home, Inbox, Search } from 'lucide-react';
import { Link, useLocation } from 'react-router';

import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from '@/components/ui/sidebar';

function AppSidebar() {
	return (
		<Sidebar
			className="mt-20 sidebar"
			side="left"
			variant="sidebar"
			collapsible="icon"
		>
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupContent>
						<SidebarMenu>
							{items.map((item) => {
								const location = useLocation();
								const isActive = location.pathname === item.url;

								return (
									<SidebarMenuItem
										className={`${
											isActive
												? 'bg-green-800 text-white'
												: 'bg-transparent text-black dark:text-white'
										} rounded-md`}
										key={item.title}
									>
										{/* <SidebarMenuSkeleton /> */}
										<SidebarMenuButton asChild>
											<Link to={item.url}>
												<item.icon />
												<span>{item.title}</span>
											</Link>
										</SidebarMenuButton>
									</SidebarMenuItem>
								);
							})}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
		</Sidebar>
	);
}

export default AppSidebar;

const items = [
	{
		title: 'Dustbins',
		url: '/dustbins',
		icon: Home,
	},
	{
		title: 'Collection Routes',
		url: '/routes',
		icon: Inbox,
	},
	// {
	// 	title: 'Apartments',
	// 	url: '/apartments',
	// 	icon: Calendar,
	// },
	// {
	// 	title: 'Reviews',
	// 	url: '/reviews',
	// 	icon: Search,
	// },
];
