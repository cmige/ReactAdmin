import React, { Component } from 'react'
import {Button, Card} from "antd";
import ReactECharts from 'echarts-for-react'

export default class Pie extends Component{
    state = {
        // [120, 199, 99, 176, 77, 222]
        sale: [
            {value: 120, name: '衬衫'},
            {value: 199, name: '羊毛衫'},
            {value: 99, name: '雪纺衫'},
            {value: 176, name: '裤子'},
            {value: 77, name: '高跟鞋'},
            {value: 222, name: '袜子'},
        ],
        stores: [
            {value: 1199, name: '衬衫'},
            {value: 1299, name: '羊毛衫'},
            {value: 3199, name: '雪纺衫'},
            {value: 1299, name: '裤子'},
            {value: 1919, name: '高跟鞋'},
            {value: 919, name: '袜子'}
        ]
    }


    getOption = () => {
        return  {
            title: {
                text: '销量',
                left: 'center'
            },
            tooltip: {
                trigger: 'item'
            },
            legend: {
                orient: 'vertical',
                left: 'left',
            },
            series: [
                {
                    name: '访问来源',
                    type: 'pie',
                    radius: '50%',
                    data: this.state.sale,
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        };
    }
    getOption2 = () => {
        return  {
            title: {
                text: '库存',
                left: 'center'
            },
            tooltip: {
                trigger: 'item'
            },
            legend: {
                orient: 'vertical',
                left: 'left',
            },
            series: [
                {
                    name: '访问来源',
                    type: 'pie',
                    radius: '50%',
                    data: this.state.stores,
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        };
    }
    render() {
        return(
            <>
                {/*<Card >*/}
                    {/*<Button type='primary' onClick={this.update}>更新</Button>*/}
                {/*</Card>*/}
                <Card className='pie'>
                    <ReactECharts option={this.getOption()}/>
                </Card>
                <Card className='pie'>
                    <ReactECharts option={this.getOption2()}/>
                </Card>
            </>
        )
    }
}