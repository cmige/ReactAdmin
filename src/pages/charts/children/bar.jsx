import React, { Component } from 'react'
import { Card,Button } from 'antd'
import ReactECharts from 'echarts-for-react'

export default class Bar extends Component{
    state = {
        sale: [120, 199, 99, 176, 77, 222],
        stores: [199, 299, 399, 299, 199, 99]
    }
    getOption = () => {
        return {
            title: {
                text: '柱状图'
            },
            tooltip: {},
            legend: {
                data:['销量','库存']
            },
            xAxis: {
                data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
            },
            yAxis: {},
            series: [
                {
                    name: '销量',
                    type: 'bar',
                    data: this.state.sale
                },
                {
                    name: '库存',
                    type: 'bar',
                    data: this.state.stores
                }
            ]
        }
    }
    update = () => {
        this.setState(state => ({
            sale:state.sale.map(sale => sale + 20),
            stores:state.stores.map(store => store - 20),
        }))
    }
    render() {
        return(
            <>
                <Card>
                    <Button type='primary' onClick={this.update}>更新</Button>
                </Card>
                <Card>
                    <ReactECharts option={this.getOption()}/>
                </Card>
            </>
        )
    }
}