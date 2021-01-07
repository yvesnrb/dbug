import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { GlobalStyle } from './globalStyle';
import GlobalProvider from './hooks';
import Routes from './routes';

const App: React.FC = () => {
  return (
    <>
      <GlobalProvider>
        <GlobalStyle />
        <Router>
          <Routes />
        </Router>
      </GlobalProvider>
    </>
  );
};

export default App;
