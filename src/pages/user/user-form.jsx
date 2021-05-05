import React, { Component } from 'react'
import {
    Modal,
    Form,
    Input,
    Select,

} from 'antd'
import PropType from 'prop-types'

const Item = Form.Item
const Option = Select.Option
export default class UserForm extends Component{
    formRef = React.createRef()
    static formItemLayout = {
        labelCol: {
            span: 4,
        },
        wrapperCol: {
            span: 18,
        },
    }
    static propType = {
        visibility:PropType.bool,
        showForm:PropType.func,
        userItem:PropType.object,
        roles:PropType.object,
    }
    handleOk = () => {
        const form = this.formRef.current
        const { userItem } = this.props
        form.validateFields(['username','password','phone','email','role_id'])
            .then(user=>{
                 if (user.username && !userItem._id) {
                     this.props.addUser(user)
                 }
                 if (user.username && userItem._id) {
                     user.password = userItem.password
                     user._id = userItem._id
                     this.props.updateUser(user)
                 }
                this.props.showForm(false)
            })
        
    }
    handleCancel = () => {
        this.props.showForm(false)
    }

    render() {
        const { userItem } = this.props
        console.log(userItem)
        return(
            <Modal
                destroyOnClose={true}
                visible={this.props.visibility}
                title={ userItem._id ? '修改用户' : '创建用户' }
                onOk={ this.handleOk }
                onCancel={ this.handleCancel }
                cancelText='取消'
                okText='确认'
            >
                <Form
                    {...UserForm.formItemLayout}
                    ref={ this.formRef }
                    initialValues={{
                        username:userItem.username,
                        phone: userItem.phone,
                        email: userItem.email,
                        role_id: userItem.role_id
                    }}

                >
                    <Item
                        name='username'
                        label="用户名"
                        rules = {[{required: true, message:"必须填写用户名"}]}
                    >
                        <Input placeholder="请输入用户名"/>
                    </Item>

                    {
                        !userItem._id?
                            <Item
                                name='password'
                                label="密码"
                                rules = {[{required: true, message:"必须填写密码"}]}
                            >
                            <Input placeholder="请输入密码"/>
                            </Item>:''
                    }


                    <Item
                        name='phone'
                        label="手机号"
                        rules = {[{required: true, message:"必须填写密码"}]}
                    >
                        <Input placeholder="请输入手机号"/>
                    </Item>

                    <Item
                        name='email'
                        label="邮箱"
                        rules = {[{required: true, message:"必须填写邮箱"}]}
                    >
                        <Input placeholder="请输入邮箱" />
                    </Item>
                    <Item
                        name='role_id'
                        label="角色"
                        rules = {[{required: true, message:"必须选择角色"}]}
                    >
                        <Select placeholder="请选择一个角色" >
                            {
                                this.props.roles?this.props.roles.map(role =>(
                                    <Option key={role._id} value={role._id}> { role.name } </Option>
                                )):''
                            }
                        </Select>
                    </Item>

                </Form>
            </Modal>
        )
    }
}