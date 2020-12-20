import { transparentize } from 'polished';
import styled, { css } from 'styled-components';

interface Props {
  $touched: boolean;
  $error: string | undefined;
}

const containerVariations = {
  errorBorder: css`
    .input {
      border-color: ${props => props.theme.danger};
    }
  `,
};

export const Container = styled.div<Props>`
  display: flex;
  flex-direction: column;

  label {
    color: ${props => props.theme.foreground};
    font: ${props => props.theme.helpLargeFont};
    margin-bottom: 0.1rem;
  }

  input {
    flex: 1;
    background: none;
    border: none;
    font: ${props => props.theme.copySmallFont};
    color: ${props => props.theme.foreground};

    &::placeholder {
      font: ${props => props.theme.copySmallFont};
      color: ${props => transparentize(0.2, props.theme.foreground)};
    }

    &:focus {
      outline: none;
    }
  }

  .input {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 30rem;
    padding: 1rem;
    background: ${props => props.theme.secondary};
    border: 1px solid ${props => props.theme.secondary};
    transition: border-color 0.2s;

    &:focus-within {
      border-color: ${props => props.theme.primary};
    }

    .check {
      color: ${props => props.theme.primary};
    }

    .error {
      color: ${props => props.theme.danger};
    }
  }

  ${props =>
    props.$error && props.$touched ? containerVariations.errorBorder : null}
`;
