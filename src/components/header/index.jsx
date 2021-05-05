import React, { Component } from 'react'
import './index.less'
import { reqWeather } from '../../api'
import propTypes from 'prop-types'
import moment from 'moment'
import { withRouter } from 'react-router-dom'
import menuConfig from '../../config/menuConfig'
import LinkButton from '../link-button'
import Cookie from 'js-cookie'

import { Modal } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'
const { confirm } = Modal
class Header extends Component{
    static PropType = {
        user:propTypes.object.isRequired,
        logout:propTypes.func.isRequired
    }
    state = {
        info:{},
        currentTime:Date.now(),
    }
    getWeather = async (cityCode) => {
        const result = await reqWeather(cityCode)
        if (result.status === "1"){
            this.setState({
                info:result.lives[0]
            })
        }
    }
    getTime = () =>{
        this.interval = setInterval(()=>{
            const currentTime = Date.now()
            this.setState({ currentTime })
        },1000)
    }
    getTitle = () => {
        const path = this.props.location.pathname  
        let title = ''
        menuConfig.forEach(item => {  
            if ( item.path === path ){
                title = item.title
            } else if (item.children){

                const cItem = item.children.find( c => path.indexOf(c.path)===0)
                if (cItem) {
                    title = cItem.title
                }
            }
        })
        return title
    }
    logout = () => {
        confirm({
            title:'确认退出?',
            icon: <ExclamationCircleOutlined />,
            okText:'确认',
            cancelText:'取消',
            onOk:()=>{
                Cookie.remove('userId')
                this.props.logout()
                this.props.history.replace('/login')
            }
        })
    }
    componentDidMount() {
        this.getWeather(442000)
        this.getTime()
        this.getTitle()
    }
    componentWillUnmount() {
        clearInterval(this.interval)
    }

    render() {
        const title = this.getTitle()
        const { user } = this.props
        const { info } = this.state
        return(
            <div className='header'>
                <div className="header-top">
                    <LinkButton onClick={this.logout}>退出 </LinkButton>
                    <span>欢迎 { user.username }</span>
                </div>
                <div className="header-bottom">
                    <div className="header-bottom-left">{title}</div>
                    <div className='header-bottom-right'>
                        <span>{ moment(this.state.currentTime).format('Y-M-D, h:mm:ss') }</span>
                        <span>{ info.city }</span>
                        <span>{ info.weather }</span>
                        <span>{ info.temperature }°C</span>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Header)