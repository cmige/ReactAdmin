import React, { PureComponent, lazy, Suspense } from 'react'
import {
    Card,
    Button,
    Table,
    Modal
} from 'antd'
import { PlusOutlined, ArrowRightOutlined } from '@ant-design/icons'
import LinkButton from '../../components/link-button'
import { connect } from 'react-redux'
import { getCategoryList, showForm, update, confirmLoading, add } from '../../redux/Actions/categoryActioon'
import Lazy from '../../components/lazy'
import message from '../../components/message'

class Category extends PureComponent{
    constructor(){
        super()
        this.state = {
            columns:this.initColumns(),
            addCom:null,
            updateCom:null
        }
    }
    handleClick = async (type,category) => {
        if (type === 'showCategoryChild') {
            const parentId = category._id
            const parentName = category.name
            const result = await this.props.getCategoryList(parentId,parentName)
            message(result)
        }
        if (type === 'showCategory') {
            this.props.getCategoryList('0')
        }
        if (type==='add'){
            this.props.showForm(1)
        }
        if (type === 'updateCategory'){
            this.updateItem = category
            if (!this.state.updateCom) {
                const updateCom = await lazy(()=>import('./child/update-form'))
                this.setState({
                    updateCom
                })
            }
            this.props.showForm(2)

        }
    }
    initColumns = () => {
        const columns = [
            {
                title: '品类名称',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: '操作',
                dataIndex: '',
                key: 'age',
                width:300,
                render:category=><>
                    <LinkButton onClick={()=>this.handleClick('updateCategory',category)}>修改分类</LinkButton>
                    {
                        this.props.category.parentId === '0'?
                            <LinkButton onClick={()=>this.handleClick('showCategoryChild',category)}>查看子分类</LinkButton>: null

                    }
                </>

            },
        ];
        return columns
    }

    async componentDidMount() {
        const { parentId } = this.props.category
        const result = await this.props.getCategoryList(parentId)
        message(result)
    }

    render() {
        console.log('category')
        const { category } = this.props
        const { parentId,parentName } = category
        const categoryList  = category.categoryList.length>0? category.categoryList: []
        const title = parentId === '0'? '商品总分类':(
            <>
                <LinkButton
                    onClick={()=>this.handleClick('showCategory')}
                    style={{fontSize:15}}
                >商品总分类</LinkButton>
                <ArrowRightOutlined style={{margin:"0 15px"}}/>
                <span>{ parentName }</span>
            </>
        )
        const extra = (
            <Lazy
                onload={()=>import('./child/add-form')}
                content={ '添加'}
                buttonType='Button'
                onClick={ Com => {

                    this.handleClick('add')
                    this.setState({ addCom:Com })
                }}
            />
        )
        return(
            <>
                <Card title={title}  extra={extra} style={{ width: '100%' }}>
                    <Table
                        rowKey='_id'
                        dataSource={categoryList}
                        columns={this.state.columns}
                        bordered
                        loading={category.loading}
                        pagination={{ defaultPageSize:3,showQuickJumper:true }}
                    />
                    {/*<AddForm
                        category={category}
                        showForm={this.props.showForm}
                        add={this.props.add}
                        confirmLoading={this.props.confirmLoading}
                    />*/}
                    {
                        this.state.addCom ?
                            <this.state.addCom
                                category={category}
                                showForm={this.props.showForm}
                                add={this.props.add}
                                confirmLoading={this.props.confirmLoading}
                            /> : null
                    }
                    {
                        this.state.updateCom ?
                            <this.state.updateCom
                                updateItem={this.updateItem?this.updateItem:{}}
                                category={category}
                                showForm={this.props.showForm}
                                update={this.props.update}
                                confirmLoading={this.props.confirmLoading}
                            /> : null
                    }



                </Card>
            </>
        )
    }
}

export default connect(
    state=>({ category:state.category }),
    { getCategoryList, showForm, update, confirmLoading, add }
)(Category)