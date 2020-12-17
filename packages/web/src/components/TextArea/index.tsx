import React, { TextareaHTMLAttributes } from 'react';

export interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  /**
    the name of this field in the formik form
  */
  name: string;
  /**
    the label for this text area
  */
  label?: string;
  /**
    the maximum amount of characters this text area can take
  */
  maxChars?: number;
}

const TextArea: React.FC<Props> = props => {
  const { name, ...rest } = props;

  return <textarea name={name} cols={30} rows={10} {...rest} />;
};

export default TextArea;
