import { shade } from 'polished';
import styled, { css } from 'styled-components';

export const Header = styled.div`
  background: ${props => props.theme.secondary};

  .header__content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: ${props => props.theme.siteWidth};
    padding: 2rem 2rem;
    margin: 0 auto;
  }

  .header__userinfo {
    display: flex;
    align-items: center;

    img {
      width: 9rem;
      height: auto;
      border-radius: 50%;
      margin-right: 1.5rem;
    }

    h2 {
      font: ${props => props.theme.copyLargeFont};
      margin-bottom: 1rem;
    }
  }

  .header__badge {
    & + .header__badge {
      margin-left: 1rem;
    }
  }

  @media only screen and (max-width: ${props => props.theme.smallBreakpoint}) {
    .header__content {
      align-items: flex-start;
      flex-direction: column;
    }

    .header__userinfo {
      margin-bottom: 1.5rem;
    }

    .header__button {
      align-self: center;
    }
  }
`;

export const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1rem auto;
  padding: 1rem;
  width: 100%;
  max-width: 63.5rem;

  > div + div {
    margin-top: 2.5rem;
  }
`;

export const Card = styled.div`
  background: ${props => props.theme.secondary};
  padding: 2.5rem;
  display: flex;
  justify-content: stretch;
  align-items: start;

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

    .projectcard__stamp {
      color: ${props => props.theme.primary};
      text-decoration: none;
      align-self: flex-end;

      svg {
        vertical-align: text-bottom;
        margin-left: 1rem;
      }
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

export const Loading = styled.div`
  margin-bottom: 9rem;
  align-self: center;
  display: flex;
  justify-content: center;
  align-items: center;
  font: ${props => props.theme.copySmallFont};

  svg {
    margin-right: 1.5rem;
  }
`;

export const MessageContainer = styled.div`
  height: calc(100vh - 13rem - 8.3rem);
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

interface ShareButtonProps {
  disabled?: boolean;
}

export const ShareButton = styled.button<ShareButtonProps>`
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

  ${props =>
    props.disabled
      ? css`
          pointer-events: none;
          color: ${shade(0.5, props.theme.primary)};
        `
      : null}
`;
