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
import AddRole from './add-role'
import SetRole from './set-role'




class Role extends PureComponent{
    constructor(){
        super()
        this.state = {
            colums: this.initColums(),
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
        
        // role.roleList.forEach(item=>{
        //     item.create_time = moment(item.create_time).format('Y-M-D, h:mm:ss')
        //     item.auth_time = moment(item.auth_time).format('Y-M-D, h:mm:ss')
        // })
        const title = (
            <div>
                <Button type="primary" style={{ marginRight:15 }} onClick={()=>this.props.showForm(1)} >创建角色</Button>
                <Button type="primary" disabled={!this.props.role.selectRole._id} onClick={()=>this.props.showForm(2)}>设置角色权限</Button>
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
                
                <AddRole
                    visibility={ role.visibility }
                    showForm={ this.props.showForm }
                    addRole={ this.props.addRole }

                />
                
                <SetRole
                    visibility={ role.visibility }
                    showForm={ this.props.showForm }
                    role={ role.selectRole || {} }
                    updateRole={ this.props.updateRole }
                    authName={ this.props.authName }
                />
             
            </Card>

        )
    }
}

export default connect(
    state=> ({ role:state.role,authName:state.user.username }),
    { getRoleList, selectRole, showForm, addRole, updateRole }
)(Role)