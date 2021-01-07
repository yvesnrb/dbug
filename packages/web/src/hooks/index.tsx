import React, { ReactNode } from 'react';
import { ThemeProvider } from 'styled-components';
import { QueryClient, QueryClientProvider } from 'react-query';
import theme from '../appTheme';
import { AuthProvider } from './useAuth';

interface Props {
  children: ReactNode;
}

const queryClient = new QueryClient();

const GlobalProvider: React.FC<Props> = props => {
  const { children } = props;

  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>{children}</AuthProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default GlobalProvider;
