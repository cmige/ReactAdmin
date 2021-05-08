import React, { Component } from 'react'
import './index.less'
import { Menu, Layout } from 'antd';
import menuList from '../../config/menuConfig'
import { Link, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'

const { SubMenu } = Menu;
const { Sider } = Layout;
class LeftNav extends Component{
    constructor(props){
        super(props)
        this.state = {
            menuList:this.getMenuNode(menuList,props.user),
            collapsed: false
        }
    }
    onCollapse = collapsed => {
        this.setState({ collapsed });
    }

    static propType = {
        user:PropTypes.object
    }
    AuthMenu = (item, user) => {

        if(user.username === 'admin') return true
        if(item.isPublic) return true
        if(user.menus.find(menu => menu === item.path)) return true
        if(item.children){
            if(item.children.find(child => user.menus.indexOf(child.path) !== -1)) return true
        }
        return false
    }
    getMenuNode = (menuList,user) => {
        this.path = this.props.location.pathname
        if (this.path.indexOf('/product') === 0) {
            this.path = '/product'
        }

        return menuList.map( item =>{
            if (item.children) {
                if (item.children.find(c=> c.path.indexOf(this.path) === 0 )) {
                    this.openKey = item.path
                }
            }
            if (this.AuthMenu(item,user)){
                if (!item.children) {
                    // console.log('-------------')
                    return (
                        <Menu.Item key={ item.path } icon={ item.icon }>
                            <Link to={ item.path }/>
                            { item.title }
                        </Menu.Item>
                        )
                }else {
                            // console.log('++++++++++++')
                    return (
                        <SubMenu key={ item.path } icon={ item.icon } title={ item.title }>
                            {
                                this.getMenuNode(item.children,user)
                            }
                        </SubMenu>
                    )
                }
            }
            //     return ''
            // }

        })
    }

    // componentDidMount() {
    //     this.setState({
    //         menuList: this.getMenuNode(menuList)
    //     })
    // }


    render() {
        // const { collapsed } = this.state
        // console.log(this.state.menuList)
        return(
            <>
                <Sider
                    // collapsible
                       // collapsed={ collapsed } onCollapse={this.onCollapse}
                >
                    <div className='left-nav'>
                        <header className='left-nav-header'>
                            <img src={require('../../assets/images/logo.png').default} alt=""/>
                            {/*{*/}
                                {/*this.state.collapsed?null:*/}
                            {/*}*/}
                            <h1>后台管理项目</h1>
                        </header>
                    </div>
                    <Menu
                        defaultSelectedKeys={[this.path]}
                        defaultOpenKeys={[this.openKey]}
                        mode="inline"
                        theme="dark"
                    >
                        {
                            this.state.menuList
                        }
                    </Menu>

                </Sider>

            </>
        )
    }
}

export default withRouter(LeftNav)