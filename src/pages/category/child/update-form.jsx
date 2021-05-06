import React, { PureComponent } from 'react'
import {
    Form,
    Input, Modal
} from 'antd'
import PropTypes from 'prop-types'
const { Item } = Form
export default class UpdateForm extends PureComponent{

    formRef = React.createRef()
    handleOk = () => {
        this.props.confirmLoading(true)
        const form = this.formRef.current
        form.validateFields(['name'])
            .then(date=> {
                if (date.name === this.props.updateItem.name) return this.props.showForm(0)
                const categoryId = this.props.updateItem._id
                const name = date.name
                this.props.update(categoryId,name)
                form.resetFields();
            })


    }
    handleCancel = () => {
        this.props.showForm(0)
    }
    static propTypes ={
        updateItem : PropTypes.object.isRequired,
        category : PropTypes.object.isRequired,
        showForm : PropTypes.func.isRequired,
        update : PropTypes.func.isRequired,
        confirmLoading : PropTypes.func.isRequired,

    }
    render() {
        console.log('caategroy - update form')
        console.log(this.props)
        const category = this.props.category
        const { visible, confirmLoading } = category
        return(
            <>
                <Modal
                    destroyOnClose
                    title="更新分类"
                    visible={ visible === 2 }
                    onOk={this.handleOk}
                    confirmLoading={confirmLoading}
                    onCancel={this.handleCancel}
                    cancelText='取消'
                    okText='确认'
                >
                    <Form
                        ref={this.formRef}
                        initialValues={
                            { name:this.props.updateItem.name }
                        }

                    >
                        <Item
                            name='name'
                            label="分类名称"
                            rules={[{ required:true, message:"请输入分类名称" }]}
                        >
                            <Input />
                        </Item>
                    </Form>
                </Modal>
            </>
        )
    }
}