import React from 'react';
import { FiGithub } from 'react-icons/fi';
import { AnchorButton } from '../../components/Button';
import { Container } from './styles';
import remoteIdeationImg from '../../assets/remote-ideation.svg';
import MainNav from '../../components/MainNav';

const SignIn: React.FC = () => {
  return (
    <>
      <MainNav />

      <Container>
        <div id="left">
          <div id="content">
            <h1>Double the Ideas</h1>

            <h1 className="primary">Double the Programmers</h1>

            <p>
              Use dbug to find people to pair program using your favorite
              communication platforms.
            </p>

            <AnchorButton
              href={`https://github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}`}
              id="button"
              color="primary"
            >
              Sign In With GitHub <FiGithub id="github" size={18} />
            </AnchorButton>
          </div>
        </div>
        <div id="right">
          <div id="content">
            <img src={remoteIdeationImg} alt="Two woman pair programming" />
          </div>
        </div>
      </Container>
    </>
  );
};

export default SignIn;
