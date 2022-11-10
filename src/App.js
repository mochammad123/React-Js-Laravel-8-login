import React from "react";
import { Route, Switch } from "react-router-dom";

import Dashboard from "./Dashboard";
import Login from "./Login";

function App() {
  return (
    <div class="wrapper">
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/dashboard" component={Dashboard} />
      </Switch>
    </div>
  );
}

export default App;
