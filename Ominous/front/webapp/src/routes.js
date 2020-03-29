import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import NewIncident from './pages/NewIncident'

import {
    CSSTransition,
    TransitionGroup,
} from 'react-transition-group';

export default function Routes() {
    return (
        <BrowserRouter>
            <Route render={({ location }) => (
                <TransitionGroup>
                    <CSSTransition key={location.key} timeout={450} classNames="fade">
                        <Switch location={location}>
                            <Route path="/" exact component={Login} />
                            <Route path="/register" component={Register} />
                            <Route path="/profile" component={Profile} />
                            <Route path="/incidents/new" component={NewIncident} />
                        </Switch>
                    </CSSTransition>
                </TransitionGroup>
            )} />
        </BrowserRouter>
    )
}