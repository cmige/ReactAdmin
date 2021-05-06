import React, { PureComponent } from 'react'
import {
    Form,
    Input,
    Modal
} from 'antd'
import PropType from 'prop-types'

const Item = Form.Item
export default class AddRole extends PureComponent{
    static propType = {
        visibility:PropType.number.isRequired,
        showForm:PropType.func.isRequired,
        addRole:PropType.func.isRequired,
    }
    formRef = React.createRef()

    handleOk = async () => {
        const form = this.formRef.current
        form.validateFields(['roleName'])
            .then(data=> {
                if (!data.roleName) return
                const result = this.props.addRole(data.roleName)
                result.then(value => console.log(value))
                form.resetFields()
            })

    }
    handleCancel = () => {
        this.props.showForm(0)

    }


    render() {
        
        console.log('render addRole')
        
        return(
            
          <Modal
                visible={ this.props.visibility === 1 }
                destroyOnClose
                title="添加角色"
                onOk={ this.handleOk }
                // confirmLoading={confirmLoading}
                onCancel={ this.handleCancel }
                cancelText='取消'
                okText='确认'
            >
                <Form
                    name='form'
                    ref={this.formRef}

                >
                    <Item
                        label= '角色名称'
                        name='roleName'
                        rules={[{required:true,message:'角色名称必须指定或者角色名称已存在'}]}
                    >
                        <Input/>
                    </Item>
                </Form>
            </Modal>
        )
    }
}