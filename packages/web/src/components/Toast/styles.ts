import styled, { css } from 'styled-components';

interface Props {
  $type: 'success' | 'danger';
  $noContent: boolean;
}

const containerVariations = {
  danger: css`
    border-color: ${props => props.theme.danger};
  `,

  success: css`
    border-color: ${props => props.theme.primary};
  `,

  noContent: css`
    .header {
      margin-bottom: 0;
    }
  `,
};

export const Container = styled.div<Props>`
  width: 40rem;
  padding: 1rem;
  background: ${props => props.theme.secondary};
  border: 1px solid ${props => props.theme.secondary};

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
    color: ${props => props.theme.foreground};

    button {
      color: ${props => props.theme.foreground};
      border: none;
      background: none;
      outline: none;
      cursor: pointer;
    }

    .title {
      font: ${props => props.theme.copySmallFont};
    }

    .danger {
      color: ${props => props.theme.danger};
    }

    .success {
      color: ${props => props.theme.primary};
    }
  }

  .content {
    font: ${props => props.theme.helpLargeFont};
  }

  ${props =>
    props.$type === 'success'
      ? containerVariations.success
      : containerVariations.danger}

  ${props => (props.$noContent ? containerVariations.noContent : null)}
`;
