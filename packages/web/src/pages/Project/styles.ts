import { shade } from 'polished';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1rem auto 8rem auto;
  padding: 1rem;
  width: 100%;
  max-width: 63.5rem;
`;

export const Card = styled.div`
  background: ${props => props.theme.secondary};
  padding: 2.5rem;
  display: flex;
  justify-content: stretch;
  align-items: start;
  margin-bottom: 2.5rem;

  img {
    width: 7rem;
    height: auto;
    border-radius: 50%;
    margin-right: 2rem;
  }

  .projectcard__body {
    flex: 1;
    display: flex;
    flex-direction: column;

    h2 {
      font: ${props => props.theme.copyFont};
      margin-bottom: 1rem;
    }

    .projectcard__badges {
      margin-bottom: 1rem;

      span + span {
        margin-left: 1rem;
      }
    }

    .projectcard__stats {
      margin-bottom: 1.5rem;

      span {
        font: ${props => props.theme.copySmallFont};

        svg {
          vertical-align: text-bottom;
          margin-right: 0.5rem;
        }
      }

      span + span {
        margin-left: 1.6rem;
      }
    }

    p {
      font: ${props => props.theme.copyFont};
      margin-bottom: 1rem;
    }

    a {
      cursor: pointer;
      color: ${props => props.theme.primary};
      font: ${props => props.theme.copyFont};
      text-decoration: none;
      align-self: flex-end;
      transition: color 0.2s;
      background: none;
      border: none;

      svg {
        vertical-align: text-bottom;
        margin-left: 1rem;
      }

      &:hover {
        color: ${props => shade(0.2, props.theme.primary)};
      }
    }
  }

  @media only screen and (max-width: ${props => props.theme.smallBreakpoint}) {
    flex-direction: column;
    align-items: stretch;

    img {
      margin-bottom: 1rem;
    }
  }
`;

export const DeleteButton = styled.button`
  cursor: pointer;
  color: ${props => props.theme.danger};
  font: ${props => props.theme.copyFont};
  text-decoration: none;
  align-self: flex-end;
  transition: color 0.2s;
  background: none;
  border: none;

  svg {
    vertical-align: text-bottom;
    margin-left: 1rem;
  }

  &:hover {
    color: ${props => shade(0.2, props.theme.danger)};
  }
`;

export const ShareButton = styled(Link)`
  cursor: pointer;
  color: ${props => props.theme.primary};
  font: ${props => props.theme.copyFont};
  text-decoration: none;
  align-self: flex-end;
  transition: color 0.2s;
  background: none;
  border: none;

  svg {
    vertical-align: text-bottom;
    margin-left: 1rem;
  }

  &:hover {
    color: ${props => shade(0.2, props.theme.primary)};
  }
`;

export const MessageContainer = styled.div`
  height: calc(100vh - 8.3rem);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  max-width: 63.5rem;
  margin: 0 auto;

  p {
    font: ${props => props.theme.copyLargeFont};
    opacity: 0.8;
    margin-bottom: 3rem;
  }

  img {
    max-width: 63.5rem;
    width: 100%;
  }
`;

export const LoadingInformation = styled.div`
  margin-bottom: 4rem;

  h2 {
    font: ${props => props.theme.copyLargeFont};
  }

  div {
    display: flex;
    justify-content: flex-start;
    align-items: center;

    svg {
      margin-right: 1rem;
    }
  }

  p {
    margin-top: 1rem;
    font: ${props => props.theme.copySmallFont};
    opacity: 0.8;
  }
`;
