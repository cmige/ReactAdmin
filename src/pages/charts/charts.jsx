import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
export default class Charts extends Component{
    
    render() {
        console.log('charts')
        return(
            <>
                <Switch>
                    {
                        this.props.routes.map(route => {
                            return <Route path={ route.path } key={ route.name } render={ props =>
                                <route.component  {...props} routes={route.routes} />

                            }/>
                        })
                    }
                </Switch>
            </>

        )
    }
}