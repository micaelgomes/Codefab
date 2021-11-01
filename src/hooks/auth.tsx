import React, { createContext, useCallback, useContext, useState } from 'react';
import { api } from '../services/api';

interface AuthState {
  user: any;
}

interface SignInCredentials {
  githubCode: string;
}

interface AuthContextData {
  user: any;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const userInCache = localStorage.getItem('@codefab:user');

    if (userInCache) {
      const user = JSON.parse(userInCache);

      return { user };
    }

    return {} as AuthState;
  });

  const signIn = useCallback(async ({ githubCode }: SignInCredentials) => {
    const requestData = {
      code: githubCode,
    };

    const response = await api.post<AuthState>('/auth', requestData);
    const user = response.data;

    localStorage.setItem('@codefab:user', JSON.stringify(user));

    setData({ user: user });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@codefab:user');

    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider value={{ signIn, signOut, user: data.user }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = (): AuthContextData => {
  const context = useContext(AuthContext);

  if (!context) throw new Error('useAuth must be used in auth context.');

  return context;
};

export { AuthProvider, useAuth };
