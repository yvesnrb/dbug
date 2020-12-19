import React, { HTMLAttributes, ReactNode } from 'react';
import { Container } from './styles';

export interface Props extends HTMLAttributes<HTMLSpanElement> {
  /**
    size of this badge
  */
  size?: 'small' | 'large';
  /**
    true if this badge is disabled
  */
  disabled?: boolean;
  /**
    hex code of the background color of this badge
  */
  color?: string;
  /**
    true if the foreground color of this badge should be dark
  */
  textDark?: boolean;
  /**
    contents of this badge
  */
  children: ReactNode;
}

const Badge: React.FC<Props> = props => {
  const {
    size = 'large',
    disabled = false,
    color = '#000',
    textDark = false,
    children,
    ...rest
  } = props;

  return (
    <Container
      $size={size}
      $disabled={disabled}
      $color={color}
      $textDark={textDark}
      {...rest}
    >
      {children}
    </Container>
  );
};

export default Badge;
