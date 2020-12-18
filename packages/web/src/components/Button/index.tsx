import React, { ButtonHTMLAttributes, ReactNode } from 'react';
import Spinner from '../Spinner';
import { Container } from './styles';

export interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
    colorscheme of this button
  */
  color: 'primary' | 'secondary';
  /**
    true if this button is disabled
  */
  disabled?: boolean;
  /**
    true if this button is small
  */
  small?: boolean;
  /**
    true to replace the text of this button with a spinner
  */
  loading?: boolean;
  /**
    contents of this button
  */
  children: ReactNode;
}

const Button: React.FC<Props> = props => {
  const {
    color,
    disabled = false,
    small = false,
    loading = false,
    children,
    ...rest
  } = props;

  return (
    <Container
      $color={color}
      disabled={disabled}
      $small={small}
      $loading={loading}
      {...rest}
    >
      <Spinner className="spinner" color="dark" />
      <span className="content">{children}</span>
    </Container>
  );
};

export default Button;
