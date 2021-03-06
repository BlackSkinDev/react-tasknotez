import React, { Component } from "react";
import ReactDOM from "react-dom";


import Header from "./layouts/Header";
import TaskList from "./pages/tasks/TaskList"
import TaskCreate from "./pages/tasks/TaskCreate"
import TaskEdit from "./pages/tasks/TaskEdit"


import NotFound from "./pages/NotFound"
import {Button,Container} from 'react-bootstrap'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import {PUBLIC_URL} from "../constants"
import Swal from 'sweetalert2'
import { ToastContainer} from 'react-toastify';


class App extends Component {

  render() {
    return (
      <div>

        <Router>
          <Header />
          <div>

            <Container className="p-4">
              <Switch>
                <Route path="/" exact={true} component={TaskList} />
                <Route path={`${PUBLIC_URL}`} exact={true} component={TaskList} />
                <Route path={`${PUBLIC_URL}/create`} exact={true} component={TaskCreate} />
                <Route path={`${PUBLIC_URL}/edit-task/:id`} component={TaskEdit}/>
                <Route path='*'  component={NotFound} />
              </Switch>
            </Container>
          </div>
        </Router>
        <ToastContainer rtl/>
      </div>
    );
  }

}

export default App;


if (document.getElementById("app")) {
  ReactDOM.render(<App />, document.getElementById("app"));
}
