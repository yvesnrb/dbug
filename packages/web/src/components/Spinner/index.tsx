import React from 'react';

export interface Props {
  /**
    colorscheme of this spinner
  */
  color: 'light' | 'dark';
  /**
    18px in size when set to small, 24px otherwise
  */
  small?: boolean;
}

const Spinner: React.FC<Props> = () => {
  // const { color, small = false } = props;
  return <p>Spinner</p>;
};

export default Spinner;
