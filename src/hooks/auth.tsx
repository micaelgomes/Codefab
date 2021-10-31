import React, { createContext, useCallback, useContext, useState } from 'react';
import { api } from '../services/api';

interface AuthState {
  token: string;
  user: UserModel;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface SignUpData {
  name: string;
  email: string;
  password: string;
}

interface UserModel {
  id: string;
  email: string;
  name: string;
  createAt: string;
  updateAt: string;
}

interface AuthContextData {
  user: UserModel;
  signIn(credentials: SignInCredentials): Promise<void>;
  signUp(user: SignUpData): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@codefab:t0k3n');
    const userInCache = localStorage.getItem('@codefab:user');

    if (token && userInCache) {
      const user = JSON.parse(userInCache);

      return { token, user };
    }

    return {} as AuthState;
  });

  const signIn = useCallback(async ({ email, password }: SignInCredentials) => {
    const response = await api.post<AuthState>('/sessions', {
      email,
      password,
    });

    const { token, user } = response.data;

    localStorage.setItem('@codefab:t0k3n', token);
    localStorage.setItem('@codefab:user', JSON.stringify(user));

    setData({ token, user });
  }, []);

  const signUp = useCallback(async ({ name, email, password }: SignUpData) => {
    await api.post<AuthState>('/users', {
      name,
      email,
      password,
    });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@codefab:t0k3n');
    localStorage.removeItem('@codefab:user');

    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider value={{ signIn, signUp, signOut, user: data.user }}>
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
