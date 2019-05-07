import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import IndexPage from './routes/IndexPage';
import Counter from "./components/Counter";
import Example from "./components/Example";

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={Counter} />
        <Route path="/example" component={Example} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
