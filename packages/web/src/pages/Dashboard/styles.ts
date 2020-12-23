import styled from 'styled-components';

export const Container = styled.div`
  max-width: ${props => props.theme.siteWidth};
  padding: 2rem 2rem;
  margin: 0 auto;

  p {
    font: ${props => props.theme.copyFont};
  }
`;
