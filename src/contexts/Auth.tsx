import { createContext, useState, useEffect } from 'react';
import Login from '../services/Login';


interface AuthContextData {
  signed: boolean;
  signIn(email: string, password: string): Promise<boolean>;
  signOut(): void;
  verify: string;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<object | null>(null);
  const [verify, setVerify] = useState('');

  async function signIn(email: string, password: string) {
    const response = await Login(email, password);
    console.log(response)
    if (response == 'Incorrect password') {
      // @ts-ignore
      setVerify(response);
    }
    // @ts-ignore
    const token = response.token;
    // @ts-ignore
    setUser(response.data);
    //loginApi.defaults.headers.Authorization = `Bearer ${token}`;
    localStorage.setItem('@Auth:token', token);

    return response;
  }


  function signOut() {
    console.log('Signout');
    localStorage.clear();
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{ signed: !!user, signIn, signOut, verify }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;