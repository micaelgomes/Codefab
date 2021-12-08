import React from 'react';

import {
  Route as ReactDOMRoute,
  RouteProps as ReactDOMRouteProps,
  Redirect,
} from 'react-router-dom';

import { useAuth } from '../hooks/auth';

interface RouteProps extends ReactDOMRouteProps {
  isPrivate?: boolean;
  component: React.ComponentType;
}

const Route: React.FC<RouteProps> = ({
  isPrivate = false,
  component: Component,
  path,
  ...rest
}) => {
  const { user } = useAuth();

  return (
    <ReactDOMRoute
      path={path}
      {...rest}
      render={({ location }) => {
        return isPrivate === !!user ? (
          <Component />
        ) : (
          <>
            {path === '/help' ? (
              <Component />
            ) : (
              <Redirect
                to={{
                  pathname: isPrivate ? '/login' : '/',
                  state: { from: location },
                }}
              />
            )}
          </>
        );
      }}
    />
  );
};

export default Route;
