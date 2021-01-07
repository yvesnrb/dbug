import React, { useCallback } from 'react';
import { Redirect, Route as BaseRoute, RouteProps } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

interface Props extends RouteProps {
  isPrivate?: boolean;
  component: React.ComponentType;
}

const Route: React.FC<Props> = props => {
  const { isPrivate = false, component: Component, ...rest } = props;
  const { data } = useAuth();
  const { jwt } = data;

  const render = useCallback(
    routeProps => {
      if (!jwt && isPrivate) return <Redirect to="/" />;
      if (jwt && !isPrivate) return <Redirect to="/dashboard" />;
      return <Component {...routeProps} />;
    },
    [isPrivate, jwt, Component],
  );

  return <BaseRoute render={render} {...rest} />;
};

export default Route;
