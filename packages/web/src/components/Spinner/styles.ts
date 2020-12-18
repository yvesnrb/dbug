import { SVGProps } from 'react';
import styled, { css } from 'styled-components';

interface Props extends SVGProps<SVGElement> {
  $color: 'light' | 'dark';
  $small: boolean;
}

const sizeVariations = {
  small: css`
    width: 1.8rem;
    height: 1.8rem;
  `,
  large: css`
    width: 2.4rem;
    height: 2.4rem;
  `,
};

export const Container = styled.svg<Props>`
  ${props => (props.$small ? sizeVariations.small : sizeVariations.large)}

  path {
    ${props =>
      props.$color === 'light'
        ? `stroke: ${props.theme.foreground};`
        : `stroke: ${props.theme.secondary};`}
    stroke-opacity: 0;
  }
`;
