import React, { SVGAttributes } from 'react';
import { Container } from './styles';

export interface Props extends SVGAttributes<SVGElement> {
  /**
    colorscheme of this spinner
  */
  color: 'light' | 'dark';
  /**
    18px in size when set to small, 24px otherwise
  */
  small?: boolean;
}

const Spinner: React.FC<Props> = props => {
  const { color, small = false, ...rest } = props;

  return (
    <Container
      $color={color}
      $small={small}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      {...rest}
    >
      <path
        id="petal1"
        d="M12 2v4"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <animate
          attributeName="stroke-opacity"
          begin="0s"
          dur="1.3s"
          values="1;0;0;0;0;0;0;0"
          calcMode="linear"
          repeatCount="indefinite"
        />
      </path>
      <path
        id="petal2"
        d="M16.24 7.76l2.83-2.83"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <animate
          attributeName="stroke-opacity"
          begin="0s"
          dur="1.3s"
          values="0;1;0;0;0;0;0;0"
          calcMode="linear"
          repeatCount="indefinite"
        />
      </path>
      <path
        id="petal3"
        d="M18 12h4"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <animate
          attributeName="stroke-opacity"
          begin="0s"
          dur="1.3s"
          values="0;0;1;0;0;0;0;0"
          calcMode="linear"
          repeatCount="indefinite"
        />
      </path>
      <path
        id="petal4"
        d="M16.24 16.24l2.83 2.83"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <animate
          attributeName="stroke-opacity"
          begin="0s"
          dur="1.3s"
          values="0;0;0;1;0;0;0;0"
          calcMode="linear"
          repeatCount="indefinite"
        />
      </path>
      <path
        id="petal5"
        d="M12 18v4"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <animate
          attributeName="stroke-opacity"
          begin="0s"
          dur="1.3s"
          values="0;0;0;0;1;0;0;0"
          calcMode="linear"
          repeatCount="indefinite"
        />
      </path>
      <path
        id="petal6"
        d="M4.93 19.07l2.83-2.83"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <animate
          attributeName="stroke-opacity"
          begin="0s"
          dur="1.3s"
          values="0;0;0;0;0;1;0;0"
          calcMode="linear"
          repeatCount="indefinite"
        />
      </path>
      <path
        id="petal7"
        d="M2 12h4"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <animate
          attributeName="stroke-opacity"
          begin="0s"
          dur="1.3s"
          values="0;0;0;0;0;0;1;0"
          calcMode="linear"
          repeatCount="indefinite"
        />
      </path>
      <path
        id="petal8"
        d="M4.93 4.93l2.83 2.83"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <animate
          attributeName="stroke-opacity"
          begin="0s"
          dur="1.3s"
          values="0;0;0;0;0;0;0;1"
          calcMode="linear"
          repeatCount="indefinite"
        />
      </path>
    </Container>
  );
};

export default Spinner;
