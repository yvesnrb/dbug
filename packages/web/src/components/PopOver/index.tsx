import React, { ReactElement } from 'react';

export interface Props {
  /**
    coloscheme of this popover
  */
  type: 'success' | 'danger';
  /**
    content of this popover
  */
  content: string;
  /**
    all children of this popover will render it when hovered
  */
  children: ReactElement;
}

const PopOver: React.FC<Props> = () => {
  return <p>PopOver</p>;
};

export default PopOver;
