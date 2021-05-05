import React, { Component } from 'react'
import {
    Card,
} from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'
import LinkButton from '../../../components/link-button'
import { connect } from 'react-redux'
import { getCategoryName } from '../../../redux/Actions/productAction'
const BASE_URL = 'http://localhost:4000/upload/'

class ProductDetail extends Component{
    title = (
        <div>
            <LinkButton onClick={ this.props.history.goBack }> <ArrowLeftOutlined/> </LinkButton>
            <span style={{ marginLeft:15, fontWeight:800 }}>商品详情</span>
        </div>
    )
    componentDidMount() {
        this.getCategoryName()
    }

    getCategoryName = () => {
        const product = this.props.child
        this.props.getCategoryName( product )
    }

    render() {
        console.log('product detail')
        const product = this.props.child
        const { name, desc, price, imgs, category, pCategory, detail } = product
        return(
            <Card title={this.title} className='product-detail'>
                <Card type="inner" className="inner-card">
                    <span className="detail-left">商品名称：</span>
                    <span>{ name }</span>
                </Card>
                <Card type="inner" className="inner-card">
                    <span className="detail-left">商品描述：</span>
                    <span>{ desc }</span>
                </Card>
                <Card type="inner" className="inner-card">
                    <span className="detail-left">商品价格：</span>
                    <span>{ price }元</span>
                </Card>
                <Card type="inner" className="inner-card">
                    <span className="detail-left">所属分类：</span>
                    <span>{ pCategory? `${pCategory.name} --->`:'' } { category? category.name : '' }</span>
                </Card>
                <Card type="inner" className="inner-card detail-img">
                    <span className="detail-left">商品图片：</span>
                    {
                        imgs.map((item,index)=> <img className="img" src={ BASE_URL + item } key={index} alt="productImg"/>)
                    }

                </Card>
                <Card type="inner" className="inner-card">
                    <span className="detail-left">商品详情：</span>
                    <span dangerouslySetInnerHTML={{__html:product.detail}}></span>
                    {/*<span>{detail}</span>*/}
                </Card>
            </Card>
        )
    }
}

export default connect(
    state=>({ child:state.product.child }),
    { getCategoryName }
)(ProductDetail)