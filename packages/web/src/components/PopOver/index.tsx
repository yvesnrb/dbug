import React, { HTMLAttributes, ReactNode } from 'react';
import { Container } from './styles';

export interface Props extends HTMLAttributes<HTMLDivElement> {
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
  children: ReactNode;
}

const PopOver: React.FC<Props> = props => {
  const { type, content, children, ...rest } = props;

  return (
    <Container $type={type} {...rest}>
      {children}
      <span>{content}</span>
    </Container>
  );
};

export default PopOver;
