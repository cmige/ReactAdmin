import React, { Component,PureComponent } from 'react'

import {
    Card,
    Input,
    Form,
    Cascader,
    Button
} from 'antd';
import LinkButton from "../../../components/link-button";
import {ArrowLeftOutlined} from "@ant-design/icons";
import { connect } from 'react-redux'
import { getCascaderName, loading, addOrUpdate } from '../../../redux/Actions/productAction'
import PictureWall from './pictures-wall'
import RichEditor from '../rich-text-editor'
import Message from '../../../components/message'

const Item = Form.Item
const TextArea = Input.TextArea

class AddUpdate extends PureComponent{

    static formItemLayout = {
        labelCol: {
            span: 2,
        },
        wrapperCol: {
            span: 8,
        },
    }

    validatePrice = (rule,value) => {
         if (value * 1 <= 0) return Promise.reject('价格必须大于0')
            return Promise.resolve()
    }

    getCategory = (parentId) => {
        this.props.getCascaderName(parentId)
    }

    componentDidMount() {
        this.getCategory(0)
        const { child } = this.props
        if (child && child.pCategoryId !== '0') {
            this.getCategory( child.pCategoryId )
        }
    }

    loadData = selectedOptions => {
        let targetOption = selectedOptions[0];
        this.props.loading(targetOption)
        this.props.getCascaderName(targetOption.value,targetOption)

    }

    editorRef = React.createRef()
    onFinish = async (value) => {
        const detail = this.editorRef.current.getDetail()
        const imgs =  this.ref.getImgs()
        const { name, desc, price, categorys } = value
        const pCategoryId = categorys.length === 1 ? '0' : categorys[0]
        const categoryId = categorys.length === 2 ? categorys[1] : categorys[0]
        const product = { detail, imgs, name, desc, price, pCategoryId, categoryId }
        const { child } = this.props
        if (child) product._id = child._id
        const result = await this.props.addOrUpdate(product)
        Message(result.status,result.msg)
        setTimeout(()=>{
            if (result.status === 0) this.props.history.goBack()
        },1000)

    }

    render() {
        console.log('product-addd-update')
        const  title = (
            <>
                <LinkButton onClick={this.props.history.goBack}> <ArrowLeftOutlined/> </LinkButton>
                <span style={{ marginLeft:15, fontWeight:800 }}>{ this.props.child?'更新商品':'添加商品' }</span>
            </>
        )
        const { child } = this.props

        return(

            <>

            <Card title={title}>
                <Form
                    {...AddUpdate.formItemLayout}
                    onFinish={this.onFinish}
                    validateTrigger="onSubmit"
                    initialValues={{
                        name: child? child.name: '',
                        desc: child? child.desc: '',
                        price: child? child.price: '',
                        categorys: child?
                            ( child.pCategoryId==='0'?
                                [ child.categoryId ]:
                                [ child.pCategoryId, child.categoryId ]
                            ): ''
                    }}
                >
                    <Item
                        label="商品名称"
                        name="name"
                        rules = {[{required: true, message:"必须输入商品名"}]}
                    >
                        <Input placeholder="请输入商品名称" />
                    </Item>

                    <Item
                        label="商品描述"
                        name="desc"
                        rules = {[{required: true, message:"必须输入商品描述"}]}
                    >
                        <TextArea placeholder="请输入商品描述" autoSize={{ minRows:2, maxRows:6 }} />
                    </Item>

                    <Item
                        label="商品价格"
                        name="price"
                        rules = {[
                            { required: true, message:"必须输入商品价格" },
                            {validator:this.validatePrice}
                        ]}
                    >
                        <Input type="number" placeholder="请输入商品价格" suffix="元" prefix="￥"/>
                    </Item>

                    <Item
                        label="商品分类"
                        name="categorys"
                        rules = {[{required: true, message:"必须选择商品分类"}]}
                    >
                        <Cascader
                            options={ this.props.cascaderOptions }
                            loadData={ this.loadData }
                            onChange={ this.onChange }
                            changeOnSelect
                            placeholder="请选择商品分类"
                        />
                    </Item>
                    <Item
                        label="商品图片"
                        name="imgs"
                    >
                        <PictureWall getRef={ref=> this.ref = ref} imgs={child? child.imgs: []}/>

                    </Item>
                    <Item
                        label="商品详情"
                        name="detail"
                        labelCol={{span: 2}}
                        wrapperCol={{span: 20}}
                    >
                        <RichEditor ref={this.editorRef} detail={ child? child.detail: '' }/>

                    </Item>

                    <Button type='primary' htmlType="submit"> 提交 </Button>
                </Form>
            </Card>
            </>
        )
    }
}



export default connect(
    state=>({ cascaderOptions:state.product.cascaderOptions, child:state.product.child }),
    { getCascaderName, loading, addOrUpdate }
)(AddUpdate)