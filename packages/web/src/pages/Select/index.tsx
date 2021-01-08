import React, { useEffect } from 'react';
import { FiCodepen, FiUsers } from 'react-icons/fi';
import { useParams } from 'react-router-dom';
import Badge from '../../components/Badge';
import MainNav from '../../components/MainNav';
import TwoPaneContainer from '../../components/TwoPaneContainer';
import { useAuth } from '../../hooks/useAuth';
import { useSelectProject } from '../../hooks/useProject';
import { Container, Card } from './styles';

const Select: React.FC = () => {
  const { projectId, userId } = useParams<{
    projectId: string;
    userId: string;
  }>();
  const { data } = useAuth();
  const { jwt } = data;
  const select = useSelectProject(jwt);
  const { mutate } = select;

  useEffect(() => {
    mutate({ projectId, userId });
  }, [mutate, projectId, userId]);

  return (
    <>
      <MainNav returnHref="/dashboard" />

      <Container>
        <TwoPaneContainer>
          <TwoPaneContainer.LeftPane className="left">
            <h1>New Contact!</h1>

            <p>
              Go ahead and use one of these platforms to let this person know
              you are looking to work with them.
            </p>
          </TwoPaneContainer.LeftPane>

          <TwoPaneContainer.RightPane className="right">
            {select.data && (
              <Card key={10}>
                <img
                  src={select.data.avatar_url}
                  alt={`${select.data.login} avatar`}
                />

                <div className="projectcard__body">
                  <h2>{select.data.login}</h2>

                  <div className="projectcard__badges">
                    {select.data.contact.meet && (
                      <Badge color="#0A897B" size="small">
                        {select.data.contact.meet}
                      </Badge>
                    )}
                    {select.data.contact.discord && (
                      <Badge color="#8A9CFA" size="small">
                        {select.data.contact.discord}
                      </Badge>
                    )}
                    {select.data.contact.zoom && (
                      <Badge color="#2FA2FB" size="small">
                        {select.data.contact.zoom}
                      </Badge>
                    )}
                  </div>

                  <div className="projectcard__stats">
                    <span>
                      <FiUsers size={20} /> {select.data.followers}
                    </span>

                    <span>
                      <FiCodepen size={20} /> {select.data.public_repos}
                    </span>
                  </div>

                  <p>{select.data.bio}</p>
                </div>
              </Card>
            )}
          </TwoPaneContainer.RightPane>
        </TwoPaneContainer>
      </Container>
    </>
  );
};

export default Select;
