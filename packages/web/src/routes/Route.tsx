import React, { useCallback } from 'react';
import { Redirect, Route as BaseRoute, RouteProps } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface Props extends RouteProps {
  isPrivate?: boolean;
  component: React.ComponentType;
}

const Route: React.FC<Props> = props => {
  const { isPrivate = false, component: Component, ...rest } = props;
  const {
    data: { jwt, user },
  } = useAuth();

  const render = useCallback(
    routeProps => {
      if (user && !user.contact_id) return <Redirect to="/contact" />;
      if (!jwt && isPrivate) return <Redirect to="/" />;
      if (jwt && !isPrivate) return <Redirect to="/dashboard" />;
      return <Component {...routeProps} />;
    },
    [isPrivate, jwt, Component, user],
  );

  return <BaseRoute render={render} {...rest} />;
};

export default Route;
