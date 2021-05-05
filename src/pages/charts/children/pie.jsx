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
        return {
            legend: {},
            tooltip: {
                trigger: 'axis',
                    showContent: false
            },
            dataset: {
                source: [
                    ['product', '2012', '2013', '2014', '2015', '2016', '2017'],
                    ['Milk Tea', 56.5, 82.1, 88.7, 70.1, 53.4, 85.1],
                    ['Matcha Latte', 51.1, 51.4, 55.1, 53.3, 73.8, 68.7],
                    ['Cheese Cocoa', 40.1, 62.2, 69.5, 36.4, 45.2, 32.5],
                    ['Walnut Brownie', 25.2, 37.1, 41.2, 18, 33.9, 49.1]
                ]
            },
            xAxis: {type: 'category'},
            yAxis: {gridIndex: 0},
            grid: {top:'55%'},
            series: [
                {type: 'line', smooth: true, seriesLayoutBy: 'row', emphasis: {focus: 'series'}},
                {type: 'line', smooth: true, seriesLayoutBy: 'row', emphasis: {focus: 'series'}},
                {type: 'line', smooth: true, seriesLayoutBy: 'row', emphasis: {focus: 'series'}},
                {type: 'line', smooth: true, seriesLayoutBy: 'row', emphasis: {focus: 'series'}},
                {
                    type: 'pie',
                    id: 'pie',
                    radius: '30%',
                    center: ['50%', '25%'],
                    emphasis: {focus: 'data'},
                    label: {
                        formatter: '{b}: {@2012} ({d}%)'
                    },
                    encode: {
                        itemName: 'product',
                        value: '2012',
                        tooltip: '2012'
                    }
                }
            ]
        };
    }
    render() {
        return(
            <>
                <Card >
                    <Button type='primary' onClick={this.update}>更新</Button>
                </Card>
                <Card className='pie'>
                    <ReactECharts option={this.getOption()}/>
                </Card>
                <Card className='pie' style={{height:500}}>
                    <ReactECharts option={this.getOption2()}/>
                </Card>
            </>
        )
    }
}