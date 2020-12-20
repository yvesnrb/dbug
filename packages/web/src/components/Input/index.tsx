import { useField } from 'formik';
import React, { InputHTMLAttributes } from 'react';
import { FiCheckCircle, FiXCircle } from 'react-icons/fi';
import PopOver from '../PopOver';
import { Container } from './styles';

export interface Props extends InputHTMLAttributes<HTMLInputElement> {
  /**
    name of this input on it's parent form
  */
  name: string;
  /**
    label for this input
  */
  label?: string;
  /**
    placeholder for this input
  */
  placeholder?: string;
}

const Input: React.FC<Props> = props => {
  const { name, label, className, ...rest } = props;
  const [field, meta] = useField(name);
  const { touched, error } = meta;

  return (
    <Container className={className} $touched={touched} $error={error}>
      {label && <label htmlFor={name}>{label}</label>}

      <div className="input">
        <input {...field} {...rest} />

        {touched && !error && field.value && (
          <FiCheckCircle className="check" size={16} />
        )}
        {touched && error && (
          <PopOver type="danger" content={error}>
            <FiXCircle className="error" size={16} />
          </PopOver>
        )}
      </div>
    </Container>
  );
};

export default Input;
