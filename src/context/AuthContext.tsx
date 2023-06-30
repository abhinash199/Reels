import { createContext, useContext } from 'react';

interface AuthContextInterface {
    loggedIn: any
}

export const AuthContext = createContext<AuthContextInterface | null>(null);

export function useAuth() {
    return useContext(AuthContext);
}