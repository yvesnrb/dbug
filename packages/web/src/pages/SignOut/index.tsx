import React, { useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';

const SignOut: React.FC = () => {
  const { signOut } = useAuth();

  useEffect(() => {
    signOut();
  }, [signOut]);

  return null;
};

export default SignOut;
