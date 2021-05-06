import React, { Component,PureComponent } from 'react'
import {
    Card,
    Button,
    Table,
} from 'antd'
import { connect } from 'react-redux'
import Title from './child/card-title'
import LinkButton from '../../components/link-button'
import { getProductList, search, oneProduct, updateState } from '../../redux/Actions/productAction'
import { PAGE_SIZE } from '../../utils/contants'
import message from '../../components/message'
import './product.less'
import {PlusOutlined} from "@ant-design/icons";

class ProductHome extends PureComponent{
    constructor(){
        super()
        this.state = {
            columns: this.initColumns(),
            searchCom:null,
            detailCom:null,
            addProductCom:null
        }
    }
    toDetailUpdate = (type,product) => {
        this.props.oneProduct(product)
        if (type === 'detail')
            this.props.history.push({
                pathname:"/product/detail"
            })
        if (type === 'update')
            this.props.history.push({
                pathname:"/product/addupdate"
            })
    }
    changeState = async (product) => {
        let { status, _id } = product
        message(await this.props.updateState(status, _id))
    }

    initColumns = () =>{
        return [
            {
                title: '商品名称',
                dataIndex: 'name',
            },
            {
                title: '商品描述',
                dataIndex: 'desc',
            },
            {
                title: '价格',
                dataIndex: 'price',
                render:price => `￥ ${price}`
            },
            {
                title: '状态',
                width:100,
                render: product => (
                    <>
                        <Button type="primary" onClick={()=>this.changeState(product)}>{product.status === 1?'上架销售': '下架'}</Button>
                        <Button  disabled type="primary" style={{ marginTop:3 }}>{product.status === 1?'下架': '上架销售'}</Button>
                    </>
                )
            },
            {
                title: '操作',
                width:100,
                render: product => (
                    <>  
                        {/**/}
                        <LinkButton
                            onClick={ () => this.toDetailUpdate('detail',product) }
                        >详情</LinkButton>
                        <LinkButton onClick={()=>this.toDetailUpdate('update',product)}>修改</LinkButton>
                    </>

                )
            }
        ]
    }
    async componentDidMount() {
        message(await this.props.getProductList(1))
    }

    render() {
        const { product } = this.props
        console.log('product home')
        return(
            <>
                <Card
                    title={<Title search={this.props.search} />}
                    extra={
                        <Button type="primary" onClick={()=>this.props.history.push('/product/addupdate')}><PlusOutlined/>添加商品</Button>
                    }
                >
                    <Table
                        rowKey='_id'
                        bordered
                        loading={product.loading}
                        dataSource={ product.list }
                        columns={ this.state.columns }
                        pagination={{
                            current:this.props.product.pageNum || 1,
                            defaultPageSize:PAGE_SIZE,
                            total:product.total,
                            showQuickJumper:true,
                            onChange: async pageNum => {
                                this.pageNum = pageNum
                                message(await this.props.getProductList(pageNum))
                            }
                        }}
                    >
                    </Table>
                </Card>
            </>
        )
    }
}

 export default connect(
    state=>({ product:state.product }),
    { getProductList, search, oneProduct, updateState }
)(ProductHome)

/*

*/