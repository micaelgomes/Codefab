import React from 'react';
import { Switch } from 'react-router-dom';
import Login from '../pages/Login';
import Workspace from '../pages/Workspace';
import Editor from '../pages/Editor';
import Route from './Route';
import Help from '../pages/Help';
import Gallery from '../pages/Gallery';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" isPrivate exact component={Workspace} />
      <Route path="/fable/view/:repo" isPrivate component={Editor} />
      <Route path="/fable/:repo" isPrivate component={Editor} />
      <Route path="/fable" isPrivate component={Editor} />
      <Route path="/gallery" isPrivate component={Gallery} />
      <Route path="/login" component={Login} />
      <Route path="/help" component={Help} />
    </Switch>
  );
};

export default Routes;
