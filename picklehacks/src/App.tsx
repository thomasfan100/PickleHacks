import React from 'react';
// import { Router, Switch, Route } from 'brow';
import './App.css';

import Navbar from './navbar';
import Schedule from './schedule';

function App() {
  return (
    <div>
      <Navbar />
      {/* <Router>
        <Switch>
          <Route path="/" component={App}>
            <Route path="schedule" component={Schedule} />
          </Route>
        </Switch>
      </Router> */}
      <Schedule />
    </div>
  );
}

export default App;
