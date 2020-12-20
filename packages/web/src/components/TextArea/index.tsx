import { useField } from 'formik';
import React, { TextareaHTMLAttributes, useCallback, useState } from 'react';
import { Container } from './styles';

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
  const { name, label, maxChars, className, ...rest } = props;
  const [field, meta] = useField(name);
  const { onChange, value, ...restOfField } = field;
  const [contentLength, setContentLength] = useState<number>(value.length);
  const { error, touched } = meta;

  const interceptOnChange = useCallback(
    e => {
      setContentLength(e.target.value.length);
      onChange(e);
    },
    [onChange],
  );

  return (
    <Container className={className} $error={error} $touched={touched}>
      <div className="label">
        {label && <label htmlFor={name}>{label}</label>}
        {maxChars && (
          <p>
            {contentLength} / {maxChars}
          </p>
        )}
      </div>

      <textarea
        onChange={interceptOnChange}
        value={value}
        {...restOfField}
        {...rest}
      />
    </Container>
  );
};

export default TextArea;
