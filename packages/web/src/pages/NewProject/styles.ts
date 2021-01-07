import styled from 'styled-components';

export const Container = styled.div`
  .left {
    h1 {
      font: ${props => props.theme.displayFont};
      color: ${props => props.theme.primary};
    }

    p {
      margin-top: 2.5rem;
      font: ${props => props.theme.copyFont};
      opacity: 0.8;
    }
  }

  .right {
    form {
      width: 100%;
      max-width: 35rem;

      div + div {
        margin-top: 1.6rem;
      }

      button {
        margin-top: 1.6rem;
        width: 100%;
      }
    }
  }

  @media only screen and (max-width: ${props => props.theme.mediumBreakpoint}) {
    .right {
      form {
        width: 100%;
        max-width: 45rem;
      }
    }
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
