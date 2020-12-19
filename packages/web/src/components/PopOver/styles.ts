import styled, { css } from 'styled-components';

interface Props {
  $type: 'success' | 'danger';
}

const popOverVariations = {
  success: css`
    span {
      background: ${props => props.theme.primary};
      color: ${props => props.theme.secondary};

      &::before {
        border-color: ${props => props.theme.primary} transparent;
      }
    }
  `,

  danger: css`
    span {
      background: ${props => props.theme.danger};
      color: ${props => props.theme.foreground};

      &::before {
        border-color: ${props => props.theme.danger} transparent;
      }
    }
  `,
};

export const Container = styled.div<Props>`
  position: relative;

  span {
    font: ${props => props.theme.helpLargeFont};
    position: absolute;
    width: 140px;
    padding: 8px;
    border-radius: 4px;
    opacity: 0;
    transition: opacity 0.4s;
    visibility: hidden;
    bottom: calc(100% + 12px);
    left: 50%;
    transform: translateX(-50%);

    &::before {
      content: '';
      border-style: solid;
      border-width: 6px 6px 0 6px;
      top: 100%;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
    }
  }

  &:hover span {
    visibility: visible;
    opacity: 1;
  }

  ${props =>
    props.$type === 'success'
      ? popOverVariations.success
      : popOverVariations.danger}
`;
