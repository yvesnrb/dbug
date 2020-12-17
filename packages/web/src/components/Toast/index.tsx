import React from 'react';

export interface Props {
  /**
    will change the colorscheme and icon of this toast
  */
  type: 'success' | 'danger';
  /**
    title of this toast
  */
  title: string;
  /**
    content body of this toast
  */
  content?: string;
}

const Toast: React.FC<Props> = () => {
  // const { type, title, content = '' } = props;
  return <p>Toast</p>;
};

export default Toast;
