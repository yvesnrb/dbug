import React, { useCallback } from 'react';
import { Redirect, Route as BaseRoute, RouteProps } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';

interface Props extends RouteProps {
  isPrivate?: boolean;
  component: React.ComponentType;
}

const Route: React.FC<Props> = props => {
  const { isPrivate = false, component: Component, ...rest } = props;
  // const {
  //   data: { token },
  // } = useAuth();
  const token = null;

  const render = useCallback(
    routeProps => {
      if (!token && isPrivate) return <Redirect to="/" />;
      if (token && !isPrivate) return <Redirect to="/dashboard" />;
      return <Component {...routeProps} />;
    },
    [isPrivate, token, Component],
  );

  return <BaseRoute render={render} {...rest} />;
};

export default Route;
