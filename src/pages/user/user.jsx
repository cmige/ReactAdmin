import React, { Component, lazy } from 'react'
import {
    Card,
    Table,
    Modal
} from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons';
import moment from 'moment'
import LinkButton from '../../components/link-button'
import { PAGE_SIZE } from "../../utils/contants";
import { connect } from 'react-redux'
import { getUserList, showForm, addUser, deleteUser, updateUser } from '../../redux/Actions/userActions'

import Lazy from '../../components/lazy'
import message from '../../components/message'
const confirm = Modal.confirm
class User extends Component{
    constructor() {
        super()
        this.state = {
            Com : null
        }
        this.initColums()
    }

    initColums = () => {
        this.colums =  [
            {
                title:"用户名",
                dataIndex:"username"
            },
            {
                title:"邮箱",
                dataIndex:"email"
            },
            {
                title:"电话",
                dataIndex:"phone",
            },
            {
                title:"注册时间",
                dataIndex:"create_time",
                render:(create_time)=>moment(create_time).format('Y-M-D, h:mm:ss')
            },
            {
                title:"所属角色",
                dataIndex:"role_id",
                render:role_id =>{
                    const roleList = this.props.user.roles? this.props.user.roles.reduce((pre,item)=> {
                        pre[item._id] = item.name
                        return pre
                    },{}):[]
                    return roleList[role_id]
                }
            },
            {
                title:"操作",
                render:userItem=>(
                    <>
                        <LinkButton onClick={()=>this.handleClick('update',userItem)}>修改</LinkButton>

                        <LinkButton onClick={()=>this.handleClick('delete',userItem)}>删除</LinkButton>
                    </>
                )
            },
        ]
    }

    handleClick = async (type,userItem) => {
        if (type === 'update') {
            this.userItem = userItem
            const Com = await lazy( ()=>import('./user-form'))
            this.setState({Com})
            this.props.showForm(true)
        }
        if(type === 'delete'){
            confirm({
                title: `确认删除${userItem.username}吗?`,
                icon: <ExclamationCircleOutlined />,
                okText:'确认',
                cancelText:'取消',
                onOk:async () => {
                    const result = await this.props.deleteUser(userItem._id)
                    message(result)
                }
            });
        }

    }

    async componentDidMount() {
        const result = await this.props.getUserList()
        message(result)
    }

    render() {
        const { user } = this.props
        const { userList } = user
        console.log('user')
        // console.log(UserForm)
        const title = (
            <>
                <Lazy
                    onload={()=>import('./user-form')}
                    content='创建用户'
                    buttonType='Button'
                    onClick={ Com => {
                        this.props.showForm(true)
                        this.userItem = null
                        this.setState({ Com })
                    }}
                >

                </Lazy>
            </>
        )
        return(
            <>
                <Card title={title}>
                    <Table
                        rowKey='_id'
                        dataSource={userList}
                        columns={this.colums}
                        bordered
                        // loading={category.loading}
                        pagination={{ defaultPageSize:PAGE_SIZE }}
                    />
                </Card>
                {
                    this.state.Com ?
                        <this.state.Com
                            visibility={ this.props.user.visibility }
                            showForm={ this.props.showForm }
                            userItem={ this.userItem || {} }
                            roles={ this.props.user.roles }
                            addUser={ this.props.addUser }
                            updateUser={ this.props.updateUser }
                        /> : null
                }

            </>

        )
    }
}

export default connect(
    state=>({ user:state.user }),
    {getUserList, showForm, addUser, deleteUser, updateUser }
)(User)