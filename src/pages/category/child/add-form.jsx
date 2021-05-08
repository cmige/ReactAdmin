import React, { PureComponent } from 'react'
import {
    Form,
    Select,
    Input, Modal
} from 'antd'
import PropTypes from 'prop-types'
import message from '../../../components/message'
const { Option } = Select
const { Item } = Form
export default class AddForm extends PureComponent{

    static propTypes = {
        category:PropTypes.object.isRequired,
        showForm:PropTypes.func.isRequired,
        add:PropTypes.func.isRequired,
        confirmLoading:PropTypes.func.isRequired
    }
    formRef = React.createRef()

    handleOk = () => {

        const form = this.formRef.current
        form.validateFields(['parentId','name'])
            .then(async date=> {
                if (!date.parentId) return
                this.props.confirmLoading(true)
                const result = await this.props.add(date)
                message(result)
                form.resetFields();
            })

    }
    handleCancel = () => {
        this.props.showForm('0')
    }
    render() {
        console.log('caategroy - add form')
        const { category } = this.props
        const { categoryList, confirmLoading, visible, parentName, parentId } = category
        return(
            <>
                <Modal
                    destroyOnClose
                    title="添加分类"
                    visible={visible === 1}
                    onOk={()=>this.handleOk('add')}
                    confirmLoading={confirmLoading}
                    onCancel={()=>this.handleCancel('add')}
                    cancelText='取消'
                    okText='确认'
                >
                    <Form
                        name='form'
                        ref={this.formRef}
                        
                    >
                        <Item
                            label="所属分类"
                            name='parentId'
                            rules={[{ required:true, message:"请选择分类" }]}
                            hasFeedback
                        >
                            <Select
                                // value={`${this.state.value}`}
                                // onChange={(value,option)=>this.handleChange(value,option)}
                                placeholder="请选择分类"
                            >
                                {
                                    parentId === '0'? <Option value='0' >一级分类</Option>:
                                        <Option value={ category.parentId } >{ parentName }</Option>
                                }
                                {
                                    categoryList.map(item =><Option key={ item._id } value={ item._id }>{ item.name }</Option>)
                                }
                            </Select>
                        </Item>
                        <Item
                            label='分类名称'
                            name='name'
                            rules={[{ required:true, message:"请输入分类名称" }]}
                            hasFeedback
                        >
                            <Input placeholder='请输入分类名称'/>
                        </Item>
                    </Form>
                </Modal>
            </>
        )
    }
}