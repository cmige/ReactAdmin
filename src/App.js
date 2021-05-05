import React, { Component, Suspense } from 'react'
import {  Route, Switch, HashRouter  } from 'react-router-dom'
import routers from './router.config'

export default class App extends Component{

    render() {
        return(
            <HashRouter >
                <Suspense fallback={<h1>loading....</h1>}>
                    <Switch>
                        {
                            routers.map( route => <Route path={ route.path } key={ route.name } exact render={ props =>
                                    <route.component {...props} routes={route.routes}/>
                                }/>
                            )
                        }
                    </Switch>
                </Suspense>
            </HashRouter>
        )
    }
}