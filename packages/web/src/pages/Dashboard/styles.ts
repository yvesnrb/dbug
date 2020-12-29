import styled from 'styled-components';

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
