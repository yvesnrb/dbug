import React, { Fragment, useEffect } from 'react';
import {
  FiCheckCircle,
  FiChevronsRight,
  FiCodepen,
  FiPlusCircle,
  FiUsers,
} from 'react-icons/fi';
import { Link, Redirect } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import Badge from '../../components/Badge';
import { LinkButton } from '../../components/Button';
import MainNav from '../../components/MainNav';
import Spinner from '../../components/Spinner';
import { useAuth } from '../../hooks/useAuth';
import {
  Loading,
  Card,
  CardContainer,
  Header,
  MessageContainer,
  ShareButton,
} from './styles';
import { useProject } from '../../hooks/useProject';
import lonelyFoxImg from '../../assets/lonely-fox.svg';
import bugSpottingImg from '../../assets/bug-spotting.svg';

const Dashboard: React.FC = () => {
  const { data } = useAuth();
  const { jwt, user } = data;
  const { ref, inView } = useInView({ threshold: 1 });
  const { list, ownList, share } = useProject({ jwt });
  const { fetchNextPage } = list;

  useEffect(() => {
    if (inView) fetchNextPage();
  }, [inView, fetchNextPage]);

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
            disabled={ownList.data && ownList.data.total !== 0}
            className="header__button"
            to="newproject"
            color="primary"
          >
            Post a Project <FiPlusCircle size={18} />
          </LinkButton>
        </div>
      </Header>

      {!list.isLoading && list.data && list.data.pages[0].total === 0 && (
        <MessageContainer>
          <p>
            Looks like there aren&apos;t any projects right now, create your own
            or come back later.
          </p>
          <img src={lonelyFoxImg} alt="A fox sitting alone" />
        </MessageContainer>
      )}

      {list.isError && (
        <MessageContainer>
          <p>
            Looks like we need to do some debugging of our own! Please wait a
            few moments or refresh this page.
          </p>
          <img src={bugSpottingImg} alt="A man looking for bugs" />
        </MessageContainer>
      )}

      {list.isLoading && (
        <MessageContainer>
          <p>Please wait...</p>
          <Spinner color="light" />
        </MessageContainer>
      )}

      {!list.isLoading && !list.isError && (
        <CardContainer>
          {list.data &&
            list.data.pages.map((group, i) => (
              <Fragment key={i}>
                {group.projects.map(project => (
                  <Card key={project.id}>
                    <img
                      src={project.author.avatar_url}
                      alt={`${project.author.login} avatar`}
                    />

                    <div className="projectcard__body">
                      <h2>{project.author.login}</h2>
                      <div className="projectcard__badges">
                        <Badge
                          color="#0A897B"
                          size="small"
                          disabled={!project.author.contact.meet}
                        >
                          Meet
                        </Badge>
                        <Badge
                          color="#8A9CFA"
                          size="small"
                          disabled={!project.author.contact.discord}
                        >
                          Discord
                        </Badge>
                        <Badge
                          color="#2FA2FB"
                          size="small"
                          disabled={!project.author.contact.zoom}
                        >
                          Zoom
                        </Badge>
                      </div>
                      <div className="projectcard__stats">
                        <span>
                          <FiUsers size={20} /> {project.author.followers}
                        </span>

                        <span>
                          <FiCodepen size={20} /> {project.author.public_repos}
                        </span>
                      </div>
                      <p>{project.body}</p>

                      {project.author.id === user.id ? (
                        <Link to={`project/${project.id}`}>
                          Continue <FiChevronsRight size={20} />
                        </Link>
                      ) : project.hasShared ? (
                        <span className="projectcard__stamp">
                          <FiCheckCircle size={20} />
                        </span>
                      ) : (
                        <ShareButton
                          disabled={share.isLoading}
                          type="button"
                          onClick={() =>
                            share.mutate({ id: project.id, page: i })
                          }
                        >
                          Share my contact <FiChevronsRight size={20} />
                        </ShareButton>
                      )}
                    </div>
                  </Card>
                ))}
              </Fragment>
            ))}

          {list.isFetchingNextPage && (
            <Loading>
              <Spinner color="light" />
              Loading More Projects
            </Loading>
          )}

          {!list.hasNextPage && list.data && list.data.pages[0].total !== 0 && (
            <Loading>
              <FiCheckCircle size={24} />
              All Done!
            </Loading>
          )}

          <span ref={ref} />
        </CardContainer>
      )}
    </>
  );
};

export default Dashboard;
