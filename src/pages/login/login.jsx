import React, { Component } from 'react'
import {
    Form,
    Input,
    Button
} from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { connect } from 'react-redux'
import {login} from '../../redux/Actions/userActions'
import {Redirect} from 'react-router-dom'

import './login.less'
import logo from '../../assets/images/logo.png'
import message from '../../components/message'
class Login extends Component{
    loginRef = React.createRef()
    onFinish = (value) => {
        const form = this.loginRef.current
        form.validateFields(['username','password'])
            .then(async value =>{
                if (value.username && value.password) {
                    const result = await this.props.login(value.username,value.password)
                    message(result)
                }
            })
    }

    validatePwd =(rule, value)=>{
        if (!value){
            return Promise.reject("请输入密码");
        }else if(value.length<4){
            return Promise.reject("密码长度不能小于4位");
        }else if (value.length>12) {
            return Promise.reject('密码长度不能大于12位')
        } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
            return Promise.reject('密码必须是英文、数字或下划线组成')
        }else {
            return Promise.resolve();
        }
    }

    render() {
        const { user } = this.props
        if (user && user._id){
            return <Redirect to='/home'/>
        }
        return(
            <div className="login">

                <header className='login-header'>
                    <img src={logo} alt=""/>
                    <h1> React项目：后台管理系统 </h1>
                </header>

                <section className='login-content'>
                    <h2>用户登录</h2>
                    {/*<LoginForm login={this.props.login}/>*/}
                    <Form
                        className="login-form"
                        onFinish={this.onFinish}
                        initialValues={{username:"admin"}}
                        ref={this.loginRef}
                    >
                        {/*声明式验证*/}
                        <Form.Item
                            name="username"
                            rules={[
                                { required: true, whitespace:true, message: '请输入用户名' },
                                { min: 4, message: '用户名至少4位' },
                                { max: 12, message: '用户名最多12位' },
                                { pattern: /^[a-zA-Z0-9_]+$/, message: '用户名必须是英文、数字或下划线组成' },
                            ]}
                            validateTrigger="onBlur"
                            hasFeedback
                        >
                            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户名" />
                        </Form.Item>
                        {/*自定义验证*/}
                        <Form.Item
                            name="password"
                            rules={[{
                                validator: this.validatePwd
                            }]}
                            validateTrigger="onBlur"
                            hasFeedback
                        >
                            <Input
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                placeholder="密码"
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                Log in
                            </Button>
                        </Form.Item>
                    </Form>
                </section>

            </div>
        )
    }
}

export default connect(
    state => ({user:state.user}),
    { login }
)(Login)