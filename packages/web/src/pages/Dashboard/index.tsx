import React from 'react';
import { Redirect } from 'react-router-dom';
import MainNav from '../../components/MainNav';
import { useAuth } from '../../context/AuthContext';
import { Container } from './styles';

const Dashboard: React.FC = () => {
  const {
    data: { user },
  } = useAuth();

  return (
    <>
      {!user.contact_id ? <Redirect to="/contact" /> : null}

      <MainNav icons />
      <Container>
        <p>this page will be the dashboard very shortly!</p>
        <p>thanks for testing my application :)</p>
      </Container>
    </>
  );
};

export default Dashboard;
