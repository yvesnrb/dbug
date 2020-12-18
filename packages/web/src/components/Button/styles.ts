import styled, { css } from 'styled-components';
import { lighten, shade } from 'polished';

interface Props {
  $color: 'primary' | 'secondary';
  disabled?: boolean;
  $small?: boolean;
  $loading?: boolean;
}

const buttonVariations = {
  disabled: css`
    opacity: 0.2;
    pointer-events: none;
  `,

  primary: css`
    background: ${props => props.theme.primary};
    color: ${props => props.theme.secondary};

    &:hover {
      background: ${props => shade('0.2', props.theme.primary)};
    }
  `,

  secondary: css`
    background: ${props => props.theme.secondary};
    color: ${props => props.theme.foreground};

    &:hover {
      background: ${props => lighten('0.2', props.theme.secondary)};
    }
  `,

  small: css`
    padding: 0.9rem;

    .content {
      font: ${props => props.theme.buttonSmallFont};
    }
  `,

  noContent: css`
    .content {
      opacity: 0;
    }
  `,

  noSpinner: css`
    .spinner {
      opacity: 0;
    }
  `,
};

export const Container = styled.button<Props>`
  position: relative;
  padding: 1rem;
  border: none;
  min-width: 23rem;
  transition: background 0.2s;
  cursor: pointer;

  .content {
    font: ${props => props.theme.buttonFont};
  }

  .spinner {
    position: absolute;
    top: calc(50% - 1.2rem);
    left: calc(50% - 1.2rem);
  }

  ${props =>
    props.$color === 'primary'
      ? buttonVariations.primary
      : buttonVariations.secondary}
  ${props => (props.$small ? buttonVariations.small : null)}
  ${props => (props.$loading ? buttonVariations.noContent : null)}
  ${props => (props.$loading ? null : buttonVariations.noSpinner)}
  ${props => (props.disabled ? buttonVariations.disabled : null)}
`;
