import styled from 'styled-components';

export const Container = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
  height: calc(100vh - 8.3rem);

  #left {
    background: ${props => props.theme.secondary};
    display: flex;
    justify-content: flex-end;

    h1 {
      font: ${props => props.theme.displayFont};
    }

    h1.primary {
      color: ${props => props.theme.primary};
    }

    p {
      font: ${props => props.theme.copyFont};
      opacity: 0.8;
      margin: 2.5rem 0;
    }

    #content {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: start;
      width: 645px;
      padding: 2rem 8rem 2rem 2rem;
    }
  }

  #right {
    display: flex;
    justify-content: flex-start;

    #content {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-end;
      width: 645px;
      padding: 2rem 2rem 2rem 8rem;

      img {
        width: 100%;
        max-width: 39.3rem;
        height: auto;
      }
    }
  }

  @media only screen and (max-width: ${props => props.theme.mediumBreakpoint}) {
    grid-template-columns: 100%;
    height: 100vh;

    #left {
      padding: 5rem 0;
      justify-content: center;

      #content {
        max-width: 100vw;
        padding: 2rem 2rem;

        #button {
          align-self: center;
        }
      }
    }

    #right {
      padding: 5rem 0;
      justify-content: center;
      align-items: center;

      #content {
        max-width: 100vw;
        padding: 2rem 2rem;
        align-items: center;
      }
    }
  }

  @media only screen and (max-width: ${props => props.theme.smallBreakpoint}) {
    #right {
      padding-bottom: 8.3rem;
    }
  }
`;
