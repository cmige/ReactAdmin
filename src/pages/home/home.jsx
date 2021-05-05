import React, { Component } from 'react'
import { Card, Statistic } from 'antd'
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons'
import './home.less'
import { Chart, Line, Tooltip, Legend } from 'bizcharts';

const data = [
    {
        month: "Jan",
        city: "Tokyo",
        temperature: 7
    },
    {
        month: "Jan",
        city: "London",
        temperature: 3.9
    },
    {
        month: "Feb",
        city: "Tokyo",
        temperature: 6.9
    },
    {
        month: "Feb",
        city: "London",
        temperature: 4.2
    },
    {
        month: "Mar",
        city: "Tokyo",
        temperature: 9.5
    },
    {
        month: "Mar",
        city: "London",
        temperature: 5.7
    },
    {
        month: "Apr",
        city: "Tokyo",
        temperature: 14.5
    },
    {
        month: "Apr",
        city: "London",
        temperature: 8.5
    },
    {
        month: "May",
        city: "Tokyo",
        temperature: 18.4
    },
    {
        month: "May",
        city: "London",
        temperature: 11.9
    },
    {
        month: "Jun",
        city: "Tokyo",
        temperature: 21.5
    },
    {
        month: "Jun",
        city: "London",
        temperature: 15.2
    },
    {
        month: "Jul",
        city: "Tokyo",
        temperature: 25.2
    },
    {
        month: "Jul",
        city: "London",
        temperature: 17
    },
    {
        month: "Aug",
        city: "Tokyo",
        temperature: 26.5
    },
    {
        month: "Aug",
        city: "London",
        temperature: 16.6
    },
    {
        month: "Sep",
        city: "Tokyo",
        temperature: 23.3
    },
    {
        month: "Sep",
        city: "London",
        temperature: 14.2
    },
    {
        month: "Oct",
        city: "Tokyo",
        temperature: 18.3
    },
    {
        month: "Oct",
        city: "London",
        temperature: 10.3
    },
    {
        month: "Nov",
        city: "Tokyo",
        temperature: 13.9
    },
    {
        month: "Nov",
        city: "London",
        temperature: 6.6
    },
    {
        month: "Dec",
        city: "Tokyo",
        temperature: 9.6
    },
    {
        month: "Dec",
        city: "London",
        temperature: 4.8
    }
]

const scale = {
    temperature: { min: 0 },
    city: {
        formatter: v => {
            return {
                London: '伦敦',
                Tokyo: '东京'
            }[v]
        }
    }
}

export default class Home extends Component{
    
    render() {
        console.log('home')
        return(
            <>
                <div className='home'>
                    <div className='home-top'>
                        <Card title="商品总销量" className='home-top-left' style={{ margin:15,width: 300,font:20 }}>
                            <p >共计 1,128,163个</p>
                            <Statistic
                                title="周同比："
                                value={11.28}
                                precision={2}
                                valueStyle={{ color: '#3f8600' }}
                                prefix={<ArrowUpOutlined />}
                                suffix="%"
                            />
                            <Statistic
                                title="日同比："
                                value={9.3}
                                precision={2}
                                valueStyle={{ color: '#cf1322' }}
                                prefix={<ArrowDownOutlined />}
                                suffix="%"
                            />
                        </Card>
                        <div className='home-top-right'>
                            <Chart
                                scale={scale}
                                autoFit
                                width='100%'
                                data={data}
                                padding={[30, 20, 60, 40]}
                                interactions={['element-active']}
                            >
                                <Line shape="smooth" position="month*temperature" color="city" label="temperature" />
                                <Tooltip shared showCrosshairs />
                                <Legend background={{
                                    padding:[5,100,5,36],
                                    style: {
                                        fill: '#eaeaea',
                                        stroke: '#fff'
                                    }
                                }} />
                            </Chart>
                        </div>.
                    </div>
                   <div className="home-bottom">
                       <Card title="商品总销量" className='home-top-left' style={{ margin:15,width: 300,font:20 }}>
                           <p >共计 1,128,163个</p>
                           <Statistic
                               title="周同比："
                               value={11.28}
                               precision={2}
                               valueStyle={{ color: '#3f8600' }}
                               prefix={<ArrowUpOutlined />}
                               suffix="%"
                           />
                           <Statistic
                               title="日同比："
                               value={9.3}
                               precision={2}
                               valueStyle={{ color: '#cf1322' }}
                               prefix={<ArrowDownOutlined />}
                               suffix="%"
                           />
                       </Card>
                   </div>

                </div>
            </>
        )
    }
}