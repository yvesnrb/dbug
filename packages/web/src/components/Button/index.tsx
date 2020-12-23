import React, {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from 'react';
import { LinkProps as BaseLinkProps } from 'react-router-dom';
import Spinner from '../Spinner';
import { StyledAnchor, StyledButton, StyledLink } from './styles';

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

export interface LinkProps extends BaseLinkProps {
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

export interface AnchorProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
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
    <StyledButton
      $color={color}
      disabled={disabled}
      $small={small}
      $loading={loading}
      {...rest}
    >
      <Spinner className="spinner" color="dark" />
      <span className="content">{children}</span>
    </StyledButton>
  );
};

export const LinkButton: React.FC<LinkProps> = props => {
  const {
    color,
    disabled = false,
    small = false,
    loading = false,
    children,
    ...rest
  } = props;

  return (
    <StyledLink
      $color={color}
      disabled={disabled}
      $small={small}
      $loading={loading}
      {...rest}
    >
      <Spinner className="spinner" color="dark" />
      <span className="content">{children}</span>
    </StyledLink>
  );
};

export const AnchorButton: React.FC<AnchorProps> = props => {
  const {
    color,
    disabled = false,
    small = false,
    loading = false,
    children,
    ...rest
  } = props;

  return (
    <StyledAnchor
      $color={color}
      disabled={disabled}
      $small={small}
      $loading={loading}
      {...rest}
    >
      <Spinner className="spinner" color="dark" />
      <span className="content">{children}</span>
    </StyledAnchor>
  );
};

export default Button;
