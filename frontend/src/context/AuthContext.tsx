import { createContext, FC } from 'react';
import { ContextWrapperProps, User } from '@/lib/types';

export interface AuthContextType {
	isAuthenticated: boolean;
	logout: () => void;
	user?: User;
}

export const AuthContext = createContext<AuthContextType | undefined>(
	undefined,
);

export const AuthContextWrapper: FC<ContextWrapperProps> = ({ children }) => {
	const isAuthenticated = true;
	const logout = () => {
		console.log('logout');
	};
	const user = {
		role: 'admin',
		name: 'Emilio Cliff',
	};

	return (
		<AuthContext.Provider
			value={{
				logout,
				isAuthenticated,
				user,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthContextWrapper;
