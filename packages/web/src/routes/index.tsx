import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';
import SignIn from '../pages/SignIn';
import Dashboard from '../pages/Dashboard';
import SignOut from '../pages/SignOut';
import Contact from '../pages/Contact';
import Settings from '../pages/Settings';
import NewProject from '../pages/NewProject';
import Project from '../pages/Project';
import Select from '../pages/Select';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route exact path="/" component={SignIn} />
      <Route exact path="/dashboard" component={Dashboard} isPrivate />
      <Route exact path="/signout" component={SignOut} isPrivate />
      <Route exact path="/contact" component={Contact} isPrivate />
      <Route exact path="/settings" component={Settings} isPrivate />
      <Route exact path="/newproject" component={NewProject} isPrivate />
      <Route exact path="/project/:id" component={Project} isPrivate />
      <Route
        exact
        path="/project/:projectId/select/:userId"
        component={Select}
        isPrivate
      />
    </Switch>
  );
};

export default Routes;
