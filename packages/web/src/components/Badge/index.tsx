import React, { ReactElement } from 'react';

export interface Props {
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
  children: ReactElement;
}

const Badge: React.FC<Props> = props => {
  const {
    // size = 'large',
    // disabled = false,
    // color = '#000',
    // textDark = false,
    children,
  } = props;

  return <span>{children}</span>;
};

export default Badge;
