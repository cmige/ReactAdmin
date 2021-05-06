import React, { Component } from 'react'
import {
    Select,
    Button,
    Input,
    Form
} from 'antd'

import PropTypes from 'prop-types'
import message from '../../../components/message'
const Item = Form.Item
const Option = Select.Option
export default class CardTitle extends Component{
    constructor(){
        super()
        this.state={
            onSelect: 'name'
        }
    }
    static propTypes = {
        search:PropTypes.func.isRequired
    }
    formRef = React.createRef()

    onFinish = (value) => {
        this.setState({ onSelect:value.searchType })
        const form = this.formRef.current
        form.validateFields(['searchType','searchName'])
            .then(async date=> {
                let { searchName, searchType } = date
                searchName = searchName? searchName:''
                const pageNum = 1
                message(await this.props.search(pageNum, searchName, searchType))
                // date.searchName?date.searchName:''
                form.resetFields();
            })

    }


    render() {
        console.log('title')
        return(
            <>
                <Form
                    className='form-title'
                    onFinish={this.onFinish}
                    ref={this.formRef}
                >
                    <Item
                        className='form-select'
                        name='searchType'
                        initialValue = { this.state.onSelect }
                    >
                        <Select>
                            <Option value='name'>按名称搜索</Option>
                            <Option value='desc'>按描述搜索</Option>
                        </Select>
                    </Item>
                    <Item
                        name='searchName'
                        className='form-input'
                        rules={[
                            { require:true, message:"请输入搜索名称" }
                        ]}

                    >
                        <Input placeholder='关键字'/>
                    </Item>
                    <Button
                        type='primary'
                        htmlType="submit"
                        className='form-button'
                    > 搜索 </Button>
                </Form>

            </>
        )
    }
}