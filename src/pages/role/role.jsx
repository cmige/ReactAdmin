import React, { Component, PureComponent, lazy, Suspense } from 'react'
import {
    Card,
    Button,
    Table
} from 'antd'
import { PAGE_SIZE } from '../../utils/contants'
import { getRoleList, selectRole, showForm, addRole, updateRole } from '../../redux/Actions/roleActions'
import { connect } from 'react-redux'
import moment from 'moment'
import Lazy from '../../components/lazy'



class Role extends PureComponent{
    constructor(){
        super()
        this.state = {
            colums: this.initColums(),
            addRoleCom:null,
            setRoleCom:null,

        }
    }
    initColums = () => {
        return  [
            {
                title:"角色名称",
                dataIndex:"name"
            },
            {
                title:"创建时间",
                dataIndex:"create_time",
                render:(create_time)=>moment(create_time).format('Y-M-D, h:mm:ss')
            },
            {
                title:"授权时间",
                dataIndex:"auth_time",
                render:(auth_time)=>moment(auth_time).format('Y-M-D, h:mm:ss')
            },
            {
                title:"授权人",
                dataIndex:"auth_name"
            }
        ]
    }

    onRow = (role) => {
        return {
            onClick:event => {
                this.props.selectRole(role)
            }
        }
    }
    componentDidMount() {
        this.props.getRoleList()
    }

    render() {
        const { role } = this.props
        const title = (
            <div>
                <Lazy
                    onload={()=>import('./add-role')}
                    content='创建角色'
                    buttonType='Button'
                    onClick={ Com => {
                        this.props.showForm(1)
                        this.setState({ addRoleCom: Com })
                    }}
                    style={{ marginRight:15 }}
                />
                <Lazy
                    onload={()=>import('./set-role')}
                    content='设置角色权限'
                    buttonType='Button'
                    buttonName='setRole'
                    onClick={ Com => {
                        this.props.showForm(2)
                        this.setState({ setRoleCom:Com })
                    }}
                    selectRole_id={this.props.role.selectRole._id}
                />
            </div>
        )
        return (
            <Card title={title}>
                <Table
                    bordered
                    rowKey="_id"
                    dataSource={role.roleList}
                    columns={this.state.colums}
                    pagination={{defaultPageSize:PAGE_SIZE}}
                    rowSelection={{
                        type:"radio",
                        selectedRowKeys:[
                            role.selectRole._id ? role.selectRole._id : ''
                        ],
                        onSelect:(record) => this.props.selectRole(record)
                    }}
                    onSelect={this.onSelect}
                    onRow={ this.onRow }

                />

                {
                    this.state.addRoleCom ?
                        <this.state.addRoleCom
                            visibility={ role.visibility }
                            showForm={ this.props.showForm }
                            addRole={ this.props.addRole }
                        /> : null
                }

                {
                    this.state.setRoleCom ?
                        <this.state.setRoleCom
                            visibility={ role.visibility }
                            showForm={ this.props.showForm }
                            role={ role.selectRole || {} }
                            updateRole={ this.props.updateRole }
                            authName={ this.props.authName }
                        /> : null
                }

            </Card>

        )
    }
}

export default connect(
    state=> ({ role:state.role,authName:state.user.username }),
    { getRoleList, selectRole, showForm, addRole, updateRole }
)(Role)