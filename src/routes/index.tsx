import React from 'react';
import { Switch } from 'react-router-dom';
import Login from '../pages/Login';
import Editor from '../pages/Editor';
import Route from './Route';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" isPrivate exact component={Editor} />
      <Route path="/login" exact component={Login} />
    </Switch>
  );
};

export default Routes;
