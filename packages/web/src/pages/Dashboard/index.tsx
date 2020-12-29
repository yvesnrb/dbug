import React from 'react';
import { FiPlusCircle } from 'react-icons/fi';
import { Redirect } from 'react-router-dom';
import Badge from '../../components/Badge';
import { LinkButton } from '../../components/Button';
import MainNav from '../../components/MainNav';
import { useAuth } from '../../context/AuthContext';
import { Header } from './styles';

const Dashboard: React.FC = () => {
  const {
    data: { user },
  } = useAuth();

  return (
    <>
      {!user.contact_id ? <Redirect to="/contact" /> : null}

      <MainNav icons />
      <Header>
        <div className="header__content">
          <div className="header__userinfo">
            <img src={user.avatar_url} alt={`${user.login} avatar`} />

            <div>
              <h2>{user.login}</h2>

              <Badge
                color="#0A897B"
                className="header__badge"
                disabled={!user.contact?.meet}
              >
                Meet
              </Badge>

              <Badge
                color="#8A9CFA"
                className="header__badge"
                disabled={!user.contact?.discord}
              >
                Discord
              </Badge>

              <Badge
                color="#2FA2FB"
                className="header__badge"
                disabled={!user.contact?.zoom}
              >
                Zoom
              </Badge>
            </div>
          </div>

          <LinkButton
            className="header__button"
            to="newproject"
            color="primary"
          >
            Post a Project <FiPlusCircle size={18} />
          </LinkButton>
        </div>
      </Header>
    </>
  );
};

export default Dashboard;
