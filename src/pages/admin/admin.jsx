import React, { Component, Suspense } from 'react'
import { connect } from "react-redux";
import { Layout } from 'antd';
import { Redirect, Route,Switch } from 'react-router-dom'
import { getUser, logout } from '../../redux/Actions/userActions'
import Cookie from 'js-cookie'
import './admin.less'

import Header from '../../components/header'
import LeftNav from '../../components/left-nav'


const {  Footer, Content } = Layout;
class Admin extends Component{
    componentDidMount() {
        const { _id } = this.props.user
        const userId = Cookie.get('userid')
        if (!userId) return null
            if (_id !== userId){
            // 自动登录请求 --> 用户页面刷新丢失redux 要重新获取
            //     this.props.getUser()
            }
    }

    render() {
        const { user } = this.props
        if (!user._id) return <Redirect to='/login' />
        return(
            <Layout className='main'>

                <LeftNav user={this.props.user}/>

                <Layout className='main-right'>
                    <Header user={this.props.user} logout={this.props.logout}>Header</Header>
                    <Content style={{margin:20,color:'black',background:"white" }}>
                        <Suspense fallback={<h1>loading..... -- inner</h1>}>
                            <Switch>
                                {
                                    this.props.routes.map(route => {
                                        return <Route path={ route.path } key={ route.name }
                                                      render={ props =>
                                                          <route.component  {...props} routes={route.routes} />

                                                      }/>
                                    })
                                }
                                <Redirect to='/home'/>
                            </Switch>
                        </Suspense>


                    </Content>
                    <Footer style={{textAlign:"center",color:"#000"}}>基于React的后台管理项目</Footer>
                </Layout>
            </Layout>
        )
    }
}
export default connect(
    state=>({ user: state.user }),
    { getUser, logout }
)(Admin)