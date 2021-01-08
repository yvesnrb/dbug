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
`;

export const Card = styled.div`
  padding: 2.5rem;
  display: flex;
  flex-direction: column;
  justify-content: stretch;
  align-items: stretch;

  img {
    width: 7rem;
    height: auto;
    border-radius: 50%;
    margin-bottom: 1rem;
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
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      margin-bottom: 1rem;

      span + span {
        margin-top: 1rem;
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
  }

  @media only screen and (max-width: ${props => props.theme.smallBreakpoint}) {
    flex-direction: column;
    align-items: stretch;

    img {
      margin-bottom: 1rem;
    }
  }
`;
