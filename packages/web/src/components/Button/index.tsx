import React from 'react';

export interface Props {
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
}

const Button: React.FC<Props> = () => {
  // const { color, disabled = false, small = false, loading = false } = props;
  return <p>Button</p>;
};

export default Button;
