import React, { ReactHTMLElement } from 'react';

export interface Props extends ReactHTMLElement<HTMLInputElement> {
  name: string;
}

const Input: React.FC<Props> = props => {
  const { name, ...rest } = props;

  return <input name={name} {...rest} />;
};

export default Input;
