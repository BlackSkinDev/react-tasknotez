import React, { Component } from "react";
import ReactDOM from "react-dom";


import Header from "./layouts/Header";
import TaskList from "./pages/tasks/TaskList"
import {Button,Container} from 'react-bootstrap'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

class App extends Component {
    state ={
        info: {
            key:1,
            task:{
                created_at:'12/12/12',
                completed_at:'13/23/12',
                label:'Cool'
            }
        },
    }
  render() {
    return (
      <div>

        <Router>
          <Header />
          <div>

            <Container className="p-4">
              <Switch>
                <Route path="/" exact={true} component={TaskList} />
                <Route path="/tasks" exact={true} component={TaskList} />
               

              </Switch>

            </Container>
          </div>
        </Router>
      </div>
    );
  }

}

export default App;


if (document.getElementById("app")) {
  ReactDOM.render(<App />, document.getElementById("app"));
}
