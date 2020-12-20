import { transparentize } from 'polished';
import styled, { css } from 'styled-components';

interface Props {
  $error: string | undefined;
  $touched: boolean;
}

const containerVariations = {
  errorBorder: css`
    textarea {
      border-color: ${props => props.theme.danger};
    }
  `,
};

export const Container = styled.div<Props>`
  display: flex;
  flex-direction: column;

  textarea {
    resize: none;
    width: 31rem;
    height: 29rem;
    padding: 1rem;
    font: ${props => props.theme.copySmallFont};
    color: ${props => props.theme.foreground};
    background: ${props => props.theme.secondary};
    border: 1px solid ${props => props.theme.secondary};
    transition: border-color 0.2s;

    &::placeholder {
      color: ${props => transparentize(0.2, props.theme.foreground)};
    }

    &:focus {
      border-color: ${props => props.theme.primary};
      outline: none;
    }
  }

  .label {
    display: flex;
    align-items: center;
    justify-content: space-between;

    p {
      font: ${props => props.theme.helpLargeFont};
      color: ${props => props.theme.foreground};
      margin-bottom: 0.1rem;
    }

    label {
      font: ${props => props.theme.helpLargeFont};
      color: ${props => props.theme.foreground};
      margin-bottom: 0.1rem;
    }
  }

  ${props =>
    props.$touched && props.$error ? containerVariations.errorBorder : null}
`;
