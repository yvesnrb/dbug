import React, { useEffect } from 'react';
import { FiChevronsRight, FiCodepen, FiUsers, FiXCircle } from 'react-icons/fi';
import { Redirect, useParams } from 'react-router-dom';
import Badge from '../../components/Badge';
import MainNav from '../../components/MainNav';
import { useAuth } from '../../hooks/useAuth';
import { useCloseProject, useGetProject } from '../../hooks/useProject';
import {
  LoadingInformation,
  Container,
  MessageContainer,
  Card,
  DeleteButton,
  ShareButton,
} from './styles';
import bugSpottingImg from '../../assets/bug-spotting.svg';
import Spinner from '../../components/Spinner';

const Project: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data } = useAuth();
  const { jwt } = data;
  const get = useGetProject(jwt, id);
  const close = useCloseProject(jwt);
  const { refetch } = get;

  useEffect(() => {
    refetch({ throwOnError: true });
  }, [id, refetch]);

  return (
    <>
      {close.data && <Redirect to="/dashboard" />}

      <MainNav returnHref="/dashboard" />

      {(get.isError || close.isError) && (
        <MessageContainer>
          <p>
            Looks like we need to do some debugging of our own! Please wait a
            few moments or refresh this page.
          </p>
          <img src={bugSpottingImg} alt="A man looking for bugs" />
        </MessageContainer>
      )}

      {(get.isLoading || close.isLoading) && (
        <MessageContainer>
          <p>Please wait...</p>
          <Spinner color="light" />
        </MessageContainer>
      )}

      <Container>
        {get.data && (
          <>
            <Card key={get.data.id}>
              <img
                src={get.data.author.avatar_url}
                alt={`${get.data.author.login} avatar`}
              />

              <div className="projectcard__body">
                <h2>{get.data.author.login}</h2>
                <div className="projectcard__badges">
                  <Badge
                    color="#0A897B"
                    size="small"
                    disabled={!get.data.author.contact.meet}
                  >
                    Meet
                  </Badge>
                  <Badge
                    color="#8A9CFA"
                    size="small"
                    disabled={!get.data.author.contact.discord}
                  >
                    Discord
                  </Badge>
                  <Badge
                    color="#2FA2FB"
                    size="small"
                    disabled={!get.data.author.contact.zoom}
                  >
                    Zoom
                  </Badge>
                </div>
                <div className="projectcard__stats">
                  <span>
                    <FiUsers size={20} /> {get.data.author.followers}
                  </span>

                  <span>
                    <FiCodepen size={20} /> {get.data.author.public_repos}
                  </span>
                </div>
                <p>{get.data.body}</p>

                <DeleteButton
                  disabled={close.isLoading}
                  type="button"
                  onClick={() => close.mutate(get.data.id)}
                >
                  Close this listing <FiXCircle size={20} />
                </DeleteButton>
              </div>
            </Card>

            <LoadingInformation>
              <div>
                <Spinner color="light" />
                <h2>Looking for candidates</h2>
              </div>
              <p>
                There is no need to refresh this page. Once you select someone
                you will receive their contact information and this listing will
                close.
              </p>
            </LoadingInformation>

            {get.data.shares.map(share => (
              <Card key={share.id}>
                <img src={share.avatar_url} alt={`${share.login} avatar`} />

                <div className="projectcard__body">
                  <h2>{share.login}</h2>
                  <div className="projectcard__badges">
                    <Badge
                      color="#0A897B"
                      size="small"
                      disabled={!share.contact.meet}
                    >
                      Meet
                    </Badge>
                    <Badge
                      color="#8A9CFA"
                      size="small"
                      disabled={!share.contact.discord}
                    >
                      Discord
                    </Badge>
                    <Badge
                      color="#2FA2FB"
                      size="small"
                      disabled={!share.contact.zoom}
                    >
                      Zoom
                    </Badge>
                  </div>
                  <div className="projectcard__stats">
                    <span>
                      <FiUsers size={20} /> {share.followers}
                    </span>

                    <span>
                      <FiCodepen size={20} /> {share.public_repos}
                    </span>
                  </div>
                  <p>{share.bio}</p>

                  <ShareButton
                    to={`/project/${get.data.id}/select/${share.id}`}
                  >
                    Choose this contact <FiChevronsRight size={20} />
                  </ShareButton>
                </div>
              </Card>
            ))}
          </>
        )}
      </Container>
    </>
  );
};

export default Project;
