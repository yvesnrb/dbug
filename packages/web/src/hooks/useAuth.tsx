import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import jsonwebtoken from 'jsonwebtoken';
import api from '../services/api';

interface AuthData {
  user: {
    id: string;
    contact_id: string | null;
    contact: Contact | null;
    githubId: number;
    login: string;
    avatar_url: string;
    bio: string;
    followers: number;
    public_repos: number;
    created_at: string;
    updated_at: string;
  };
  jwt: string;
}

interface Contact {
  id: string;
  meet: string;
  discord: string;
  zoom: string;
  created_at: string;
  updated_at: string;
}

interface AuthContextData {
  data: AuthData;
  loading: boolean;
  signIn(code: string): Promise<void>;
  signOut(): void;
  updateContact(contact: Contact): void;
}

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData,
);

export const AuthProvider: React.FC = props => {
  const { children } = props;
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<AuthData>(() => {
    const user = localStorage.getItem('@dbug:user');
    const jwt = localStorage.getItem('@dbug:jwt');

    if (jwt && user)
      return {
        user: JSON.parse(user),
        jwt,
      };

    return {} as AuthData;
  });

  const signIn = useCallback(async (code: string) => {
    setLoading(true);

    try {
      const response = await api.post<AuthData>('sessions', { code });

      setLoading(false);

      localStorage.setItem('@dbug:user', JSON.stringify(response.data.user));
      localStorage.setItem('@dbug:jwt', response.data.jwt);

      setData({
        user: response.data.user,
        jwt: response.data.jwt,
      });
    } catch (err) {
      setLoading(false);
    }
  }, []);

  const updateContact = useCallback(
    (contact: Contact) => {
      const updatedUser = { ...data.user };

      updatedUser.contact_id = contact.id;
      updatedUser.contact = contact;

      localStorage.setItem('@dbug:user', JSON.stringify(updatedUser));

      setData(currentData => ({
        ...currentData,
        user: updatedUser,
      }));
    },
    [data.user],
  );

  const signOut = useCallback(() => {
    localStorage.removeItem('@dbug:user');
    localStorage.removeItem('@dbug:jwt');

    setData({} as AuthData);
  }, []);

  useEffect(() => {
    const decodedToken = jsonwebtoken.decode(data.jwt);

    if (decodedToken && typeof decodedToken === 'object') {
      const expDate = decodedToken.exp * 1000;
      const now = Date.now();

      const timeout = setTimeout(() => {
        signOut();
      }, expDate - now);

      return () => clearTimeout(timeout);
    }

    return () => null;
  }, [data, signOut]);

  return (
    <AuthContext.Provider
      value={{ data, loading, signIn, signOut, updateContact }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextData => {
  const context = useContext(AuthContext);

  if (!context) throw new Error('useAuth must be used within an AuthProvider');

  return context;
};
