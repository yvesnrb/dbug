import React, { HTMLAttributes } from 'react';
import { Container } from './styles';

type Props = HTMLAttributes<HTMLDivElement>;
type TwoPaneContainer = React.FC<Props> & {
  LeftPane: typeof LeftPane;
  RightPane: typeof RightPane;
};

const TwoPaneContainer: TwoPaneContainer = props => {
  const { children, ...rest } = props;

  return <Container {...rest}>{children}</Container>;
};

const LeftPane: React.FC<Props> = props => {
  const { children, ...rest } = props;

  return (
    <div className="two-pane-container_left">
      <div {...rest}>{children}</div>
    </div>
  );
};

const RightPane: React.FC<Props> = props => {
  const { children, ...rest } = props;

  return (
    <div className="two-pane-container_right">
      <div {...rest}>{children}</div>
    </div>
  );
};

TwoPaneContainer.LeftPane = LeftPane;
TwoPaneContainer.RightPane = RightPane;

export default TwoPaneContainer;
