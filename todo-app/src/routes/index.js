import React from 'react'
import Homepage from '../components/homePage/homePage'
import Dashboard from '../components/dashBoard/dashBoard'
import Login from '../components/login/login'
import Register from '../components/register/register'
import PageNotFound from '../components/pageNotFound/pageNotFound'
import { BrowserRouter, Route, Switch } from 'react-router-dom'


function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Homepage} />
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
                <Route path="/dashboard" component={Dashboard} />
                <Route path="**" component={PageNotFound} />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes
