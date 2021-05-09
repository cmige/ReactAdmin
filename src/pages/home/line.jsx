import React, { Component } from 'react'

import {
    Chart,
    Line,
    Tooltip,
    Legend,
    Interval
} from 'bizcharts';
const data = [
    {
        month: "Jan",
        type: "stock",
        number: 100000
    },
    {
        month: "Jan",
        type: "sale",
        number: 5345
    },
    {
        month: "Jan",
        type: "monSale",
        number: 5345
    },
    {
        month: "Feb",
        type: "stock",
        number: 94655
    },
    {
        month: "Feb",
        type: "sale",
        number: 8699
    },
    {
        month: "Feb",
        type: "monSale",
        number: 3354
    },
    {
        month: "Mar",
        type: "stock",
        number: 91301
    },
    {
        month: "Mar",
        type: "sale",
        number: 13384
    },
    {
        month: "Mar",
        type: "monSale",
        number: 4685
    },
    {
        month: "Apr",
        type: "stock",
        number: 86616
    },
    {
        month: "Apr",
        type: "sale",
        number: 25918
    },
    {
        month: "Apr",
        type: "monSale",
        number: 12534
    },
    {
        month: "May",
        type: "stock",
        number: 74082
    },
    {
        month: "May",
        type: "sale",
        number: 39923
    },
    {
        month: "May",
        type: "monSale",
        number: 14005
    },
    {
        month: "Jun",
        type: "stock",
        number: 60077
    },
    {
        month: "Jun",
        type: "sale",
        number: 55478
    },
    {
        month: "Jun",
        type: "monSale",
        number: 15555
    },
    {
        month: "Jul",
        type: "stock",
        number: 44522
    },
    {
        month: "Jul",
        type: "sale",
        number: 64366
    },
    {
        month: "Jul",
        type: "monSale",
        number: 8888
    },
    {
        month: "Aug",
        type: "stock",
        number: 35634
    },
    {
        month: "Aug",
        type: "sale",
        number: 70520
    },
    {
        month: "Aug",
        type: "monSale",
        number: 6154
    },
    {
        month: "Sep",
        type: "stock",
        number: 29480
    },
    {
        month: "Sep",
        type: "sale",
        number: 73752
    },
    {
        month: "Sep",
        type: "monSale",
        number: 3232
    },
    {
        month: "Oct",
        type: "stock",
        number: 26248
    },
    {
        month: "Oct",
        type: "sale",
        number: 75974
    },
    {
        month: "Oct",
        type: "monSale",
        number: 2222
    },
    {
        month: "Nov",
        type: "stock",
        number: 24026
    },
    {
        month: "Nov",
        type: "sale",
        number: 77542
    },
    {
        month: "Nov",
        type: "monSale",
        number: 1568
    },
    {
        month: "Dec",
        type: "stock",
        number: 22458
    },
    {
        month: "Dec",
        type: "sale",
        number: 80875
    },
    {
        month: "Dec",
        type: "monSale",
        number: 3333
    },
]
const scale = {
    number: { min: 0 },
    type: {
        formatter: v => {
            return {
                sale: '总销售量',
                stock: '库存量',
                monSale: '月销售量'
            }[v]
        }
    }
}
export default class AllSale extends Component{

    render() {
        return(
            <div className='home-top-right'>
                <Chart
                    scale={scale}
                    autoFit
                    width='100%'
                    data={data}
                    padding={[30, 20, 60, 40]}
                    interactions={['element-active']}
                >
                    <Line shape="smooth" position="month*number" color="type" label="number" />
                    <Tooltip shared showCrosshairs />
                    <Legend background={{
                        padding:[5,100,5,36],
                        style: {
                            fill: '#ffffff',
                            stroke: '#fff'
                        }
                    }} />
                </Chart>
            </div>
        )
    }
}