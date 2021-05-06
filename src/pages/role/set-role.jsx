import React, { PureComponent } from 'react'
import {
    Modal,
    Form,
    Input,
    Tree,
    message
} from 'antd'
import PropType from "prop-types";
import Menus from '../../config/menuConfig'


const Item = Form.Item
message.config({
    duration:1
})
export default class SetRole extends PureComponent{
    constructor(props){
        super(props)
        this.state = {
            treeData: [{
                title:'平台权限',
                key:'all',
                children:this.initTreeData(Menus)
            }]
        }
        this.setRoleRef = React.createRef()
    }


    static propType = {
        visibility:PropType.number.isRequired,
        showForm:PropType.func.isRequired,
        updateRole:PropType.func.isRequired,
        role:PropType.object,
        authName:PropType.string
    }



    initTreeData = (Menus) => {
        const arr = []
        Menus.map(menu => {
            return arr.push({
                title:menu.title,
                key:menu.path,
                children:menu.children?this.initTreeData(menu.children):''
            })
        })
        return arr
    }

    handleOk = async () => {
        const menus = this.setRoleRef.current.state.checkedKeys
        this.props.role.menus = menus
        this.props.role.auth_name = this.props.authName
        const result = await this.props.updateRole(this.props.role)
        if (result === 0){
            return Promise.resolve(message.success('更新角色权限成功'))
        } else {
            return Promise.resolve(message.error(result))
        }
    }
    handleCancel = () => {
        this.props.showForm(0)
    }
    onCheck = (checkedKeys, info) => {
        // console.log('onCheck', checkedKeys, info);
    };
    render() {
        console.log('setRole')
        return(
            <Modal
                destroyOnClose
                title="设置角色权限"
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                cancelText='取消'
                okText='确认'
                visible={this.props.visibility === 2}
            >
                <Form

                >
                    <Item
                        label='角色名称'
                        name='roleName'
                        initialValue={this.props.role.name}

                    >
                        <Input disabled />
                    </Item>
                </Form>
                <Tree
                    ref={this.setRoleRef}
                    checkable
                    defaultExpandAll
                    defaultCheckedKeys={this.props.role.menus}
                    onCheck={this.onCheck}
                    treeData={this.state.treeData}
                />
            </Modal>
        )
    }
}