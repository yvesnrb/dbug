import React from 'react';
import MainNav from '../../components/MainNav';
import { Container } from './styles';

const Dashboard: React.FC = () => {
  return (
    <>
      <MainNav icons />
      <Container>
        <p>this page will be the dashboard very shortly!</p>
        <p>thanks for testing my application :)</p>
      </Container>
    </>
  );
};

export default Dashboard;
