import styled from 'styled-components';

export const Container = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
  height: calc(100vh - 8.3rem);

  .two-pane-container_left {
    background: ${props => props.theme.secondary};
    display: flex;
    justify-content: flex-end;

    > div {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: start;
      width: 645px;
      padding: 2rem 8rem 2rem 2rem;
    }
  }

  .two-pane-container_right {
    display: flex;
    justify-content: flex-start;

    > div {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-end;
      width: 645px;
      padding: 2rem 2rem 2rem 8rem;
    }
  }

  @media only screen and (max-width: ${props => props.theme.mediumBreakpoint}) {
    grid-template-columns: 100%;
    height: 100vh;

    .two-pane-container_left {
      padding: 5rem 0;
      justify-content: center;

      > div {
        max-width: 100vw;
        padding: 2rem 2rem;
      }
    }

    .two-pane-container_right {
      padding: 5rem 0;
      justify-content: center;
      align-items: center;

      > div {
        max-width: 100vw;
        padding: 2rem 2rem;
        align-items: center;
      }
    }
  }

  @media only screen and (max-width: ${props => props.theme.smallBreakpoint}) {
    .two-pane-container_right {
      padding-bottom: 8.3rem;
    }
  }
`;
