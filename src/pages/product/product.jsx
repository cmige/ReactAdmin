import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'


export default class Product extends Component{

    render() {
        return(
            <>
                <Switch>
                    {
                        this.props.routes.map(route=>
                            <Route
                                key={ route.name }
                                path={ route.path }
                                render={
                                    props=> <route.component {...props} routes={route.routes}/>
                                }
                            />
                        )
                    }
                    {/*<Route path="/product" component={ProductHome} exact/>*/}
                    {/*<Route path="/product/addupdate" component={ProductAddUpdate}/>*/}
                    {/*<Route path="/product/detail" component={ProductDetail}/>*/}
                    <Redirect to='/product'/>
                    {/*<Redirect to='/product/home'/>*/}
                </Switch>

            </>
        )
    }
}

