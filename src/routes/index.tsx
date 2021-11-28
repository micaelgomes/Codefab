import React from 'react';
import { Switch } from 'react-router-dom';
import Login from '../pages/Login';
import Workspace from '../pages/Workspace';
import Editor from '../pages/Editor';
import Route from './Route';
import Help from '../pages/Help';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" isPrivate exact component={Workspace} />
      <Route path="/fable/:repo" isPrivate component={Editor} />
      <Route path="/help" isPrivate component={Help} />
      <Route path="/login" exact component={Login} />
    </Switch>
  );
};

export default Routes;
