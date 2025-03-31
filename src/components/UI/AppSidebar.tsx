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
	SidebarMenuSkeleton,
} from '@/components/ui/sidebar';

function AppSidebar() {
	return (
		<Sidebar
			className="mt-20"
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
									<SidebarMenuItem key={item.title}>
										{/* <SidebarMenuSkeleton /> */}
										<SidebarMenuButton
											asChild
											className={`${
												isActive
													? 'bg-sidebar-accent text-sidebar-accent-foreground'
													: 'bg-transparent text-gray-400'
											} `}
										>
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
		title: 'Dashboard',
		url: '/dashboard',
		icon: Home,
	},
	{
		title: 'Collection Routes',
		url: '/routes',
		icon: Inbox,
	},
	{
		title: 'Apartments',
		url: '/apartments',
		icon: Calendar,
	},
	{
		title: 'Reviews',
		url: '/reviews',
		icon: Search,
	},
];
