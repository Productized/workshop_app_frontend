import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import NavBar from '../SharedComponents/NavBar';
import './Speaker.scss'
import Profile from "../SharedComponents/Profile";
import MyWorkshopAttendees from "../Speaker/MyWorkshopAttendees";

const Speaker = (props) => {
    return(
        <BrowserRouter>
              <div className="page">
                <NavBar />
                <div className="body">
                    <Switch>
                      <Route path={props.match.path} exact component={MyWorkshopAttendees} />
                      <Route path="/profile" component={Profile} />
                    </Switch>
                </div>
              </div>
          </BrowserRouter>
    )
}

export default Speaker;
