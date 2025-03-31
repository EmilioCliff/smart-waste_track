import { SidebarProvider } from '@/components/ui/sidebar';
import { Outlet } from 'react-router';
import AppSidebar from '@/components/UI/AppSidebar';
import Navbar from '@/components/UI/Navbar';
import AuthContextWrapper from '@/context/AuthContext';
import TableContextWrapper from '@/context/TableContext';

function AppLayout() {
	return (
		<AuthContextWrapper>
			<TableContextWrapper>
				<SidebarProvider>
					<AppSidebar />
					<Navbar />
					<div className="p-4 overflow-x-auto my-28 px-2 w-full">
						<Outlet />
					</div>
				</SidebarProvider>
			</TableContextWrapper>
		</AuthContextWrapper>
	);
}

export default AppLayout;
