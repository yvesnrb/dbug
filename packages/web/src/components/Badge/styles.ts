import styled, { css } from 'styled-components';

interface Props {
  $size: 'small' | 'large';
  $disabled: boolean;
  $color: string;
  $textDark: boolean;
}

const badgeVariations = {
  smallFont: css`
    font: ${props => props.theme.helpFont};
  `,

  largeFont: css`
    font: ${props => props.theme.helpLargeFont};
  `,

  disabled: css`
    pointer-events: none;
    opacity: 0.2;
  `,

  darkText: css`
    color: ${props => props.theme.background};
  `,
};

export const Container = styled.span<Props>`
  background: ${props => props.$color};
  color: ${props => props.theme.foreground};
  padding: 0.4rem 0.8rem;
  border-radius: 2rem;
  height: 1.5rem;
  text-transform: uppercase;

  ${props =>
    props.$size === 'small'
      ? badgeVariations.smallFont
      : badgeVariations.largeFont}

  ${props => (props.$textDark ? badgeVariations.darkText : null)}
  ${props => (props.$disabled ? badgeVariations.disabled : null)}
`;
