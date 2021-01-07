import React, { useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';

const SignOut: React.FC = () => {
  const { signOut } = useAuth();

  useEffect(() => {
    signOut();
  }, [signOut]);

  return null;
};

export default SignOut;
