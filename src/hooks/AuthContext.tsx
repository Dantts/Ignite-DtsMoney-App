import * as AuthSession from 'expo-auth-session';
import React, { createContext, ReactNode, useContext } from 'react';

interface AuthProviderProps {
  children: ReactNode
}

interface UserProps {
  id: string;
  name: string;
  email: string;
  photo?: string;
}

interface IAuthContextDataProps {
  user: UserProps;
  signInWithGoogle: () => Promise<void>;
}

const AuthContext = createContext({} as IAuthContextDataProps);

const AuthProvider = ({ children }: AuthProviderProps) => {

  const user: UserProps = {
    id: '123',
    name: 'Gabriel Duarte',
    email: "gabriel@email.com",
  }

  const signInWithGoogle = async () => {
    try {
      const CLIENT_ID = '480688397913-1bq1urrkii126ugr8hl5s78j09o8ji6h.apps.googleusercontent.com';
      const REDIRECT_URI = 'https://auth.expo.io/@dantts/gofinances';
      const RESPONSE_TYPE = 'token';
      const SCOPE = encodeURI('profile email');

      const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=
          ${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;

      const response = await AuthSession.startAsync({ authUrl })
      console.log(response);


    } catch (error) {
      throw new Error(error)
    }
  }
  return (
    <AuthContext.Provider value={{ user, signInWithGoogle }}>
      {children}
    </AuthContext.Provider>
  )
}

const useAuth = () => {
  return useContext(AuthContext);
}

export { AuthProvider, useAuth }