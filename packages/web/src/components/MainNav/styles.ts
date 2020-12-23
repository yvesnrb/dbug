import { transparentize } from 'polished';
import styled, { css } from 'styled-components';

interface Props {
  $icons: boolean;
  $returnHtref: string | null;
  $noBackground: boolean;
}

const containerVariations = {
  noIcons: css`
    .settings {
      display: none;
    }

    .power {
      display: none;
    }
  `,

  noReturn: css`
    .back {
      display: none;
    }
  `,

  noBackground: css`
    background: transparent;
    backdrop-filter: none;
  `,

  hideBar: css`
    display: none;
  `,
};

export const Container = styled.div<Props>`
  background: ${props => props.theme.secondary};
  position: initial;

  img {
    width: 8.9rem;
    height: 3.3rem;
  }

  svg {
    height: 2.5rem;
    width: 2.5rem;
  }

  a {
    text-decoration: none;
    color: unset;

    & + a {
      margin-left: 1.6rem;
    }
  }

  .content {
    max-width: ${props => props.theme.siteWidth};
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 2.5rem 2rem;
  }

  .power {
    svg {
      stroke: ${props => props.theme.danger};
    }
  }

  ${props => (props.$icons ? null : containerVariations.noIcons)}
  ${props => (props.$returnHtref ? null : containerVariations.noReturn)}
  ${props => (props.$noBackground ? containerVariations.noBackground : null)}

  @media only screen and (max-width: ${props => props.theme.smallBreakpoint}) {
    background: ${props => transparentize(0.1, props.theme.secondary)};
    backdrop-filter: blur(20px);
    margin-bottom: 0;
    position: fixed;
    width: 100vw;
    bottom: 0;
    left: 0;
  }
`;
