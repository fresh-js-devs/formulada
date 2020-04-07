import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

import FormikExample from './pages/FormikExample';

export default () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={FormikExample} />
      </Switch>
    </BrowserRouter>
  );
};
