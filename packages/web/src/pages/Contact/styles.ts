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

      p {
        display: flex;
        justify-content: center;
        margin-top: 1rem;
        font: ${props => props.theme.helpFont};
        color: ${props => props.theme.danger};
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
