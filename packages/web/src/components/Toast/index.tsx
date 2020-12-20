import React from 'react';
import { FiCheckCircle, FiX, FiXCircle } from 'react-icons/fi';
import { Container } from './styles';

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
  /**
    function to handle closing of this toast
  */
  onClose(): void;
}

const Toast: React.FC<Props> = props => {
  const { type, title, content = '', onClose } = props;

  return (
    <Container $type={type} $noContent={!content}>
      <div className="header">
        {type === 'success' && <FiCheckCircle className="success" size={18} />}
        {type === 'danger' && <FiXCircle className="danger" size={18} />}

        <span className="title">{title}</span>

        <button onClick={onClose} type="button">
          <FiX size={18} />
        </button>
      </div>

      {content && <p className="content">{content}</p>}
    </Container>
  );
};

export default Toast;
