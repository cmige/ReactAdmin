import React, { Component } from 'react'
import {
    Card,
    Statistic,
    DatePicker,
    Space,
    Timeline
} from 'antd'

import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons'
import './home.less'
import { Chart, Interval, Tooltip } from 'bizcharts';
import moment from 'moment'
import Line from './line'
const { RangePicker } = DatePicker


const tabListNoTitle = [
    {
        key: 'views',
        tab: '访问量',
    },
    {
        key: 'sale',
        tab: '销售量',
    },

];

const viewsData = [
    { month: '1 月', views: 40 },
    { month: '2 月', views: 52 },
    { month: '3 月', views: 100 },
    { month: '4 月', views: 80 },
    { month: '5 月', views: 99 },
    { month: '6 月', views: 88 },
    { month: '7 月', views: 155 },
    { month: '8 月', views: 50 },
    { month: '9 月', views: 77 },
    { month: '10 月', views: 111 },
    { month: '11 月', views: 66 },
    { month: '12 月', views: 55 },
]

const saleData = [
    { month: '1 月', sales: 5345 },
    { month: '2 月', sales: 3354 },
    { month: '3 月', sales: 4685 },
    { month: '4 月', sales: 12534 },
    { month: '5 月', sales: 14005 },
    { month: '6 月', sales: 15555 },
    { month: '7 月', sales: 8888 },
    { month: '8 月', sales: 6154 },
    { month: '9 月', sales: 3232 },
    { month: '10 月', sales: 2222 },
    { month: '11 月', sales: 1568 },
    { month: '12 月', sales: 3333 },
]
const contentListNoTitle = {
    views:(
        <>
            <Card title='访问趋势' className='home-bottom-left' >
                <Chart height={400}  autoFit data={viewsData} >
                    <Interval position="month*views" />
                    <Tooltip shared/>
                </Chart>
            </Card>

        </>
    ),
    sale: (
        <Card title='销售趋势' className='home-bottom-left' >
            <Chart height={400}  autoFit data={saleData} >
                <Interval position="month*sales" />
                <Tooltip shared/>
            </Chart>
        </Card>
    ),
};
const dateFormat = 'YYYY/MM/DD';

export default class Home extends Component{
    state = {
        noTitleKey:'views'
    }

    onTabChange(key){
        this.setState({ noTitleKey:key })
    }
    render() {
        console.log('home')
        return(
            <>
                <div className='home'>
                    <div className='home-top'>
                        <Card title="商品总销量" className='home-top-left'>
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
                        <Line />
                    </div>

                    <Card
                        className='home-bottom'
                        style={{ width: '100%', padding:10}}
                        tabList={tabListNoTitle}
                        activeTabKey={this.state.noTitleKey}
                        tabBarExtraContent={
                            <Space direction="vertical" size={12}>
                                <RangePicker
                                    defaultValue={[moment('2021/03/01', dateFormat), moment('2021/05/30', dateFormat)]}
                                    format={dateFormat}
                                />
                            </Space>
                        }
                        onTabChange={key => {
                            this.onTabChange(key, 'noTitleKey');
                        }}
                    >

                        <div className='home-bottom-left'>
                            {contentListNoTitle[this.state.noTitleKey]}
                        </div>

                        <Card
                            className='home-bottom-right'
                            title='任务'
                        >
                            <Timeline>
                                <Timeline.Item color='blue'>对项目性能进行优化处理</Timeline.Item>
                                <Timeline.Item color='green'>项目各种功能调试</Timeline.Item>
                                <Timeline.Item color='green'>项目初步搭建完成</Timeline.Item>
                                <Timeline.Item color='green'>实现项目各种功能</Timeline.Item>
                                <Timeline.Item color='green'>构建项目静态页面</Timeline.Item>
                            </Timeline>
                        </Card>

                    </Card>
               </div>


            </>
        )
    }
}