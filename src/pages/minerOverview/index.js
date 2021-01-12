// 矿工概览页面
import React, { Component } from 'react'
import { connect } from 'react-redux'
import "./index.css"
import { actionCreator } from './store'
import Layout from 'common/layout'
import { Breadcrumb, Table, Button, Radio } from 'antd'
import { Pie } from '@ant-design/charts';
import { Chart, Geom, Axis, Tooltip, Legend } from "bizcharts";


class MinerOverview extends Component {
    constructor(props) {
        super(props)
        this.textAreaIpt = React.createRef()
        this.state = {
            accountBalance: '', // 账户余额
            availableBalance: '', // 可用余额
            sectorMortgage: '', // 扇区抵押
            miningLock: '' // 挖矿锁仓
        }
        this.handleRadioChange = this.handleRadioChange.bind(this)
    }
    componentDidMount() {
        // 调用发送方函数, 处理矿工概览饼形图数据
        this.props.handleOverviewEchartsData()
        // 调用发送方函数, 处理有效算力折线图数据
        this.props.handleEchartsData()
        setInterval(() => {
            this.props.handleEchartsData()
        }, 7800000)
    }
    handleRadioChange (val) {
        console.log('val---------', val.target.value)
    }



    render() {
        const { accountBalance, overviewEchartsDataList, powerEchartsDataList } = this.props
        let overviewEchartsData = []
        let overviewDataHtml = []
        if (overviewEchartsDataList.toJS().length > 0) {
            overviewEchartsData = overviewEchartsDataList.toJS()
            overviewDataHtml = overviewEchartsData.map((item, index) => {
                if (item.type == '可用余额') {
                    return (<p>可用余额: {item.value} FIL</p>)
                } else if (item.type == '扇区抵押') {
                    return (<p>扇区抵押: {item.value} FIL</p>)
                } else if (item.type == '挖矿锁仓') {
                    return (<p>挖矿锁仓: {item.value} FIL</p>)
                }
            })
        }
        let config = {
            appendPadding: 10,
            data: overviewEchartsData,
            angleField: 'value',
            colorField: 'type',
            radius: 1,
            innerRadius: 0.5,
            label: {
                type: 'inner',
                offset: '-50%',
                // content: '{value}',
                content: function () {
                    return ''
                },
                style: {
                    textBaseline: 'top',
                    textAlign: 'center',
                    fontSize: 14
                }
            },
            style: {
                width: '200px',
                height: '200px'
            },
            legend: false,
            interactions: [{ type: 'element-selected' }, { type: 'element-active' }],
            statistic: {
                title: false,
                content: {
                    formatter: function formatter() {
                        return '';
                    }
                }
            }
        }
        let powerEchartsData = []
        if (powerEchartsDataList.toJS().length > 0) {
            powerEchartsData = powerEchartsDataList.toJS();
        }
        const cols = {
            time: {
                nice: true,
                alias: "时间"
            },
            miner_power_quality: {
                nice: true,
                alias: "有效算力"
            }
        }

        return (
            <div className="News">
                <Layout>
                    <Breadcrumb style={{ margin: '16px 0', textAlign: 'left', fontSize: '16px' }}>
                        <Breadcrumb.Item style={{paddingLeft: '18px'}}>矿工概览</Breadcrumb.Item>
                    </Breadcrumb>
                    <div className="content">
                        <div className="overview_wrap">
                            <div className="overview_left">
                                <div style={{marginRight: '30px'}}>
                                    <Pie {...config} />
                                </div>
                                <div className="overview_msg">
                                    <h2>账户余额</h2>
                                    <p className="account-balance">{accountBalance && accountBalance}</p>
                                    <div className="charts_msg_num">
                                        {
                                            overviewDataHtml.length > 0 && overviewDataHtml
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="overview_right">
                                <div className="power_wrap">
                                    <h2>有效算力</h2>
                                    <div className="power_num">
                                        <span style={{fontSize: '24px'}}>487.97 TiB</span>
                                        <span>占比: 0.03%</span>
                                        <span>排名: 417</span>
                                    </div>
                                </div>
                                <div className="power_msg_wrap">
                                    <div className="power_msg_left">
                                        <p>原值算力: 487.97 TiB</p>
                                        <p style={{marginBottom: '0'}}>累计出块奖励: 2,581.00 FIL</p>
                                    </div>
                                    <div className="power_msg_right">
                                        <p>累计出块份数: 162</p>
                                        <p style={{marginBottom: '0'}}>扇区大小: 32 GiB</p>
                                    </div>
                                </div>
                                <div className="status_msg_wrap">
                                    <div className="status_msg_content">
                                        <div>扇区状态:</div>
                                        <div>
                                            <span>15,622 全部, </span>
                                            <span style={{color: '#38a169'}}>15,615 有效, </span>
                                            <span style={{color: '#c53030'}}>0 错误, </span>
                                            <span style={{color: '#ecc94b'}}>0 恢复中</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="statistics_wrap">
                            <div className="statistics_title_wrap">
                                <div>
                                    <Breadcrumb style={{ margin: '16px 0', textAlign: 'left', fontSize: '16px' }}>
                                        <Breadcrumb.Item>挖矿统计</Breadcrumb.Item>
                                    </Breadcrumb>
                                </div>
                                <div>
                                    <Radio.Group defaultValue="24h" buttonStyle="solid" onChange={this.handleRadioChange}>
                                        <Radio.Button value="24h">24h</Radio.Button>
                                        <Radio.Button value="7天">7天</Radio.Button>
                                        <Radio.Button value="30天">30天</Radio.Button>
                                        <Radio.Button value="1年">1年</Radio.Button>
                                    </Radio.Group>
                                </div>
                            </div>
                            <div className="statistics_msg">
                                <div>
                                    <p>算力增量: 5.56 TiB</p>
                                    <p>出块数量: 2</p>
                                    <p>挖矿效率: 0.0745 FIL/TiB</p>
                                </div>
                                <div>
                                    <p>算力增速: 5.56 TiB / 天</p>
                                    <p>出块份数: 2</p>
                                    <p>抽查成本: 0.0001 FIL/TiB</p>
                                </div>
                                <div>
                                    <p>矿机当量: 48.35</p>
                                    <p>出块奖励 (占比): 36.4051 FIL (0.01%)</p>
                                    <p>幸运值: 55.01%</p>
                                </div>
                            </div>
                        </div>
                        <div style={{width: '100%'}}>
                            <Chart height={400} data={powerEchartsData} scale={cols} forceFit padding={[ 20, 100, 20, 100 ]}>
                                <Axis
                                    name="time"
                                    line={{
                                        stroke: "#E6E6E6"
                                    }}
                                />
                                <Axis
                                    name="miner_power_quality"
                                    label={{
                                        formatter: val => `${val} TiB`
                                    }}
                                />
                                <Tooltip />
                                <Legend />
                                <Geom
                                    type="line"
                                    position="time*miner_power_quality"
                                    size={1}
                                    color="l (270) 0:rgba(255, 146, 255, 1) .5:rgba(100, 268, 255, 1) 1:rgba(215, 0, 255, 1)"
                                    shape="smooth"
                                    style={{
                                        shadowColor: "l (270) 0:rgba(21, 146, 255, 0)",
                                        shadowBlur: 60,
                                        shadowOffsetY: 6
                                    }}
                                    tooltip={['time*miner_power_quality', (time, miner_power_quality) => {
                                        return {
                                            name: '有效算力',
                                            title: time,
                                            value: miner_power_quality + ' TiB'
                                        };
                                    }]}
                                />
                            </Chart>
                        </div>

                    </div>
                </Layout>
            </div>
        )
    }
}

// 接收方
const mapStateToProps = (state) => ({
    isLoading: state.get('minerOverview').get('isLoading'),
    overviewEchartsDataList: state.get('minerOverview').get('overviewEchartsDataList'),
    accountBalance: state.get('minerOverview').get('accountBalance'),
    powerEchartsDataList: state.get('minerOverview').get('powerEchartsDataList')
})


// 发送方
const mapDispatchToProps = (dispatch) => ({
    handleOverviewEchartsData: () => {
        dispatch(actionCreator.handleOverviewEchartsDataAction())
    },
    handleEchartsData: () => {
        dispatch(actionCreator.handleEchartsDataAction())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(MinerOverview)