// 矿工概览页面
import React, { Component } from 'react'
import { connect } from 'react-redux'
import "./index.css"
import { actionCreator } from './store'
import Layout from 'common/layout'
import { Breadcrumb, Spin, Radio } from 'antd'
import { Pie } from '@ant-design/charts';
import { Chart, Geom, Axis, Tooltip, Legend } from "bizcharts";

let overviewIsOne = true
let miningIsOne = true
class MinerOverview extends Component {
    constructor(props) {
        super(props)
        this.textAreaIpt = React.createRef()
        this.state = {
            avialiablePower: '',
            blocksMined: '',
            powerRank: '',
            powerRate: '',
            realityPower: '',
            storageSize: '',
            totalRewards: '',
            storage: {
                active: '',
                faulty: '',
                live: '',
                recovering: ''
            },
            powerIncrease: '', // 算力增量
            powerIncreaseRate: '', // 算力增速
            equivalentMiners: '', // 矿机当量
            blocksMineds: '', // 出块数量
            weightedBlocksMined: '', // 出块份数
            totalReward: '', // 出块奖励
            rewardPer: '', // 挖矿效率
            windowedPoStFeePer: '', // 抽查成本
            lunckValue: '' // 幸运值
        }
        this.handleRadioChange = this.handleRadioChange.bind(this)
    }
    componentDidMount() {
        // 调用发送方函数, 处理矿工概览饼形图数据
        let options = {name: 'minerdetail'}
        this.props.handleOverviewEchartsData(options)
        // 调用发送方函数, 处理挖矿数据
        let miningOptions = {name: 'powerchanges', time: ''}
        this.props.handleMiningCounts(miningOptions)
        // 调用发送方函数, 处理有效算力折线图数据
        this.props.handleEchartsData()
        setInterval(() => {
            this.props.handleOverviewEchartsData(options)
            this.props.handleMiningCounts(miningOptions)
            this.props.handleEchartsData()
        }, 7800000)
    }
    handleRadioChange (val) {
        console.log('val---------', val.target.value)
        let options = {
            name: 'powerchanges',
            time: val.target.value
        }
        console.log('options---------', options);
        return
        // 调用发送方函数, 处理各个时间段的数据
        this.props.handleMiningCounts(options)
    }



    render() {
        const { accountBalance, overviewEchartsDataList, overviewPowerData, miningCountsData, powerEchartsDataList } = this.props
        // ---------------------------------------------- 矿工概览数据 --------------------------------------------
        // 饼形图数据开始
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
                width: '220px',
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
        // 饼形图数据结束
        // 有效算力数据开始
        if (overviewPowerData != '' && overviewIsOne) {
            console.log(333333333, overviewPowerData)
            this.setState({
                avialiablePower: overviewPowerData.AvialiablePower,
                blocksMined: overviewPowerData.BlocksMined,
                powerRank: overviewPowerData.PowerRank,
                powerRate: overviewPowerData.PowerRate,
                realityPower: overviewPowerData.RealityPower,
                storageSize: overviewPowerData.StorageSize,
                totalRewards: overviewPowerData.TotalRewards,
                storage: {
                    active: overviewPowerData.Storage.Active,
                    faulty: overviewPowerData.Storage.Faulty,
                    live: overviewPowerData.Storage.Live,
                    recovering: overviewPowerData.Storage.Recovering
                }
            })
            overviewIsOne = false
        }
        // 有效算力数据结束
        // ---------------------------------------------- 矿工概览数据 --------------------------------------------
        // ---------------------------------------------- 挖矿统计数据 --------------------------------------------
        if (miningCountsData != '' && miningIsOne) {
            console.log('miningCountsData=============', miningCountsData);
            this.setState({
                powerIncrease: miningCountsData.PowerIncrease, // 算力增量
                powerIncreaseRate: miningCountsData.PowerIncreaseRate, // 算力增速
                equivalentMiners: miningCountsData.EquivalentMiners, // 矿机当量
                blocksMineds: miningCountsData.BlocksMined, // 出块数量
                weightedBlocksMined: miningCountsData.WeightedBlocksMined, // 出块份数
                totalReward: miningCountsData.TotalRewards, // 出块奖励
                rewardPer: miningCountsData.RewardPer, // 挖矿效率
                windowedPoStFeePer: miningCountsData.WindowedPoStFeePer, // 抽查成本
                lunckValue: miningCountsData.LunckValue // 幸运值
            })
            miningIsOne = false
        }
        // ---------------------------------------------- 挖矿统计数据 --------------------------------------------

        // ---------------------------------------------- 有效算力折线图数据 ----------------------------------------
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
        // ---------------------------------------------- 有效算力折线图数据 ----------------------------------------

        return (
            <div className="News">
                <Layout>
                    <Breadcrumb style={{ margin: '16px 0', textAlign: 'left', fontSize: '16px' }}>
                        <Breadcrumb.Item style={{paddingLeft: '18px'}}>矿工概览</Breadcrumb.Item>
                    </Breadcrumb>
                    <div className="content">
                        {
                            this.props.isLoading && <div className="spin_wrap"><Spin spinning={this.props.isLoading} /></div>
                        }
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
                                        <span style={{fontSize: '24px'}}>{this.state.avialiablePower != '' && this.state.avialiablePower}</span>
                                        <span>占比: {this.state.powerRate != '' && this.state.powerRate}</span>
                                        <span>排名: {this.state.powerRank != '' && this.state.powerRank}</span>
                                    </div>
                                </div>
                                <div className="power_msg_wrap">
                                    <div className="power_msg_left">
                                        <p>原值算力: {this.state.realityPower != '' && this.state.realityPower}</p>
                                        <p style={{marginBottom: '0'}}>累计出块奖励: {this.state.totalRewards != '' && this.state.totalRewards}</p>
                                    </div>
                                    <div className="power_msg_right">
                                        <p>累计出块份数: {this.state.blocksMined != '' && this.state.blocksMined}</p>
                                        <p style={{marginBottom: '0'}}>扇区大小: {this.state.storageSize != '' && this.state.storageSize}</p>
                                    </div>
                                </div>
                                <div className="status_msg_wrap">
                                    <div className="status_msg_content">
                                        <div>扇区状态:</div>
                                        <div>
                                            <span>{this.state.storage.live != '' && this.state.storage.live} 全部, </span>
                                            <span style={{color: '#38a169'}}>{this.state.storage.active != '' && this.state.storage.active} 有效, </span>
                                            <span style={{color: '#c53030'}}>{this.state.storage.faulty != '' ? this.state.storage.faulty : 0} 错误, </span>
                                            <span style={{color: '#ecc94b'}}>{this.state.storage.recovering != '' ? this.state.storage.recovering : 0} 恢复中</span>
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
                                    <Radio.Group defaultValue="24" buttonStyle="solid" onChange={this.handleRadioChange}>
                                        <Radio.Button value="24">24h</Radio.Button>
                                        <Radio.Button value="7">7天</Radio.Button>
                                        <Radio.Button value="30">30天</Radio.Button>
                                        <Radio.Button value="1">1年</Radio.Button>
                                    </Radio.Group>
                                </div>
                            </div>
                            <div className="statistics_msg">
                                <div>
                                    <p>算力增量: {this.state.powerIncrease != '' && this.state.powerIncrease}</p>
                                    <p>出块数量: {this.state.blocksMineds != '' && this.state.blocksMineds}</p>
                                    <p>挖矿效率: {this.state.rewardPer != '' && this.state.rewardPer}</p>
                                </div>
                                <div>
                                    <p>算力增速: {this.state.powerIncreaseRate != '' && this.state.powerIncreaseRate}</p>
                                    <p>出块份数: {this.state.weightedBlocksMined != '' && this.state.weightedBlocksMined}</p>
                                    <p>抽查成本: {this.state.windowedPoStFeePer != '' && this.state.windowedPoStFeePer}</p>
                                </div>
                                <div>
                                    <p>矿机当量: {this.state.equivalentMiners != '' && this.state.equivalentMiners}</p>
                                    <p>出块奖励 (占比): {this.state.totalReward != '' && this.state.totalReward}</p>
                                    <p>幸运值: {this.state.lunckValue != '' && this.state.lunckValue}</p>
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
    powerEchartsDataList: state.get('minerOverview').get('powerEchartsDataList'),
    overviewPowerData: state.get('minerOverview').get('overviewPowerData'),
    miningCountsData: state.get('minerOverview').get('miningCountsData')
})


// 发送方
const mapDispatchToProps = (dispatch) => ({
    handleOverviewEchartsData: (options) => {
        dispatch(actionCreator.handleOverviewEchartsDataAction(options))
    },
    handleEchartsData: () => {
        dispatch(actionCreator.handleEchartsDataAction())
    },
    handleMiningCounts: (options) => {
        dispatch(actionCreator.handleMiningCountsAction(options))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(MinerOverview)