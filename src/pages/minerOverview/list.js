// 矿工概览页面
import React, { Component } from 'react'
import { Link } from "react-router-dom"
import { connect } from 'react-redux'
import "./index.css"
import { actionCreator } from './store'
import Layout from 'common/layout'
import { Breadcrumb, Spin, Radio, Table, Select } from 'antd'
import { Pie } from '@ant-design/charts';
import { Chart, Geom, Axis, Tooltip, Legend } from "bizcharts";
const { Option } = Select;

let overviewIsOne = true
let miningIsOne = true
class OverviewList extends Component {
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
            lunckValue: '', // 幸运值
            newListType: '',
            newListSelectData: [],
            newListSelectType: ''
        }
        this.handleRadioChange = this.handleRadioChange.bind(this)
        this.handleNewListRadioChange = this.handleNewListRadioChange.bind(this)
        this.handleNewListSelectChange = this.handleNewListSelectChange.bind(this)
        this.handlePaginationChange = this.handlePaginationChange.bind(this)
        this.handleGoPage = this.handleGoPage.bind(this)
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
        // 调用发送方函数, 处理账户概览数据
        let accountOptions = {name: 'accoutSummary'}
        this.props.handleAccountData(accountOptions)
        // 调用发送方函数, 处理消息列表数据
        let newListOptions = {name: 'minermessage', page: 1}
        this.props.handleNewList(newListOptions)
        setInterval(() => {
            this.props.handleOverviewEchartsData(options)
            this.props.handleMiningCounts(miningOptions)
            this.props.handleEchartsData()
            this.props.handleAccountData(accountOptions)
            this.props.handleNewList(newListOptions)
        }, 7800000)
    }
    // 处理时间单选框改变事件
    handleRadioChange (val) {
        miningIsOne = true
        let options = {
            name: 'powerchanges',
            time: val.target.value
        }
        // 调用发送方函数, 处理各个时间段的数据
        this.props.handleMiningCounts(options)
    }
    // 处理消息列表单选框改变事件
    handleNewListRadioChange (val) {
        console.log('val++++++++++++', val.target.value)
        this.setState({newListType: val.target.value})
        let options = {
            name: '',
            page: 1
        }
        if (val.target.value == '消息列表') {
            options.name = 'minermessage'
        } else if (val.target.value == '区块列表') {
            options.name = 'minerblocks'
        } else if (val.target.value == '转账列表') {
            options.name = 'minertransfors'
        }
        // 调用发送函数, 处理消息, 区块, 转账列表数据
        this.props.handleNewList(options)
    }

    // 处理消息列表下拉框改变事件
    handleNewListSelectChange (val) {
        console.log('val==============', val);
        if (val == '全部') {
            this.setState({newListSelectType: 'minermessage'})
        } else {
            this.setState({newListSelectType: val})
        }
        // 调用发送方函数, 处理消息列表数据
        let newListOptions = {name: 'minermessagebymethod', page: 1, method: val}
        this.props.handleNewList(newListOptions)
    }
    // 处理表格分页器
    handlePaginationChange (page, pageSize) {
        console.log('page--------', page)
        let options = {
            name: '',
            page
        }
        if (this.state.newListSelectType == 'minermessage') {
            options.name = 'minermessage'
        } else {
            options.name = 'minermessagebymethod'
            options.method = this.state.newListSelectType
        }
        // 调用发送方函数, 处理消息列表数据
        this.props.handleNewList(options)
    }
    handleGoPage (val, type) {
        if (val == 'N/A') return
        if (type == 'messageIdDetailPage') {
            this.props.history.push({ pathname: "/minerOverview/messageIdDetail", state: { parameter: val } })
        } else if (type == 'heightDetailPage') {
            this.props.history.push({ pathname: "/minerOverview/heightDetail", state: { parameter: val } })
        } else if (type == 'senderDetailPage') {
            this.props.history.push({ pathname: "/minerOverview/senderDetail", state: { parameter: val } })
        } else if (type == 'blockDetailPage') {
            this.props.history.push({ pathname: "/minerOverview/blockDetail", state: { parameter: val } })
        } else if (type == 'nodeIdPage') {
            this.props.history.push({ pathname: "/minerOverview/nodeIdDetail", state: { parameter: val } })
        }
    }



    render() {
        const {
            accountBalance,
            overviewEchartsDataList,
            overviewPowerData,
            miningCountsData,
            powerEchartsDataList,
            newListData,
            newListSelectData,
            totalCount,
            accountOverviewData
        } = this.props
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
        // ---------------------------------------------- 消息列表表格数据 ----------------------------------------
        let columns = []
        let dataSource = []
        if (newListData.toJS().length > 0) {
            if (this.state.newListType == '' || this.state.newListType == '消息列表') {
                columns = [
                    { title: () => (<span className='text_title'>消息ID</span>), className: 'txt_bolder', dataIndex: 'Cid', key: 'Cid', align: 'center', ellipsis: true, render: (Cid) => (<span className="cursor_hover" onClick={ () => this.handleGoPage(Cid, 'messageIdDetailPage')}>{Cid}</span>) },
                    { title: () => (<span className='text_title'>区块高度</span>), className: 'txt_color txt_bolder', dataIndex: 'Height', key: 'Height', align: 'center', ellipsis: true, render: (Height) => (<span className="cursor_hover" style={{color: '#1a4fc9'}} onClick={ () => this.handleGoPage(Height, 'heightDetailPage')}>{Height}</span>) },
                    { title: () => (<span className='text_title'>时间</span>), className: 'txt_bolder', dataIndex: 'TimeCreate', key: 'TimeCreate', align: 'center', ellipsis: true },
                    { title: () => (<span className='text_title'>发送方</span>), className: 'txt_bolder', dataIndex: 'From', key: 'From', align: 'center', ellipsis: true, render: (From) => (<span className="cursor_hover" onClick={ () => this.handleGoPage(From, 'senderDetailPage')}>{From}</span>) },
                    { title: () => (<span className='text_title'>接收方</span>), className: 'txt_bolder', dataIndex: 'To', key: 'To', align: 'center', ellipsis: true },
                    { title: () => (<span className='text_title'>方法</span>), className: 'txt_bolder', dataIndex: 'Method', key: 'Method', align: 'center', ellipsis: true },
                    { title: () => (<span className='text_title'>金额</span>), className: 'txt_bolder', dataIndex: 'Balance', key: 'Balance', align: 'center', ellipsis: true },
                    { title: () => (<span className='text_title'>状态</span>), className: 'txt_bolder', dataIndex: 'Status', key: 'Status', align: 'center', ellipsis: true }
                ]
                dataSource = newListData.toJS()
            } else if (this.state.newListType == '区块列表') {
                columns = [
                    { title: () => (<span className='text_title'>区块高度</span>), dataIndex: 'Height', className: 'txt_color txt_bolder', key: 'Height', align: 'center', ellipsis: true, render: (Height) => (<span className="cursor_hover" style={{color: '#1a4fc9'}} onClick={ () => this.handleGoPage(Height, 'heightDetailPage')}>{Height}</span>)  },
                    { title: () => (<span className='text_title'>区块ID</span>), className: 'txt_bolder', dataIndex: 'Cid', key: 'Cid', align: 'center', ellipsis: true, render: (Cid) => (<span className="cursor_hover" onClick={ () => this.handleGoPage(Cid, 'blockDetailPage')}>{Cid}</span>) },
                    { title: () => (<span className='text_title'>奖励</span>), className: 'txt_bolder', dataIndex: 'Reward', key: 'Reward', align: 'center', ellipsis: true },
                    { title: () => (<span className='text_title'>时间</span>), className: 'txt_bolder', dataIndex: 'TimeCreate', key: 'TimeCreate', align: 'center', ellipsis: true },
                    { title: () => (<span className='text_title'>消息数</span>), className: 'txt_bolder', dataIndex: 'MessageAccounts', key: 'MessageAccounts', textAlign: 'center', ellipsis: true },
                    { title: () => (<span className='text_title'>区块大小</span>), className: 'txt_bolder', dataIndex: 'BlockSize', key: 'BlockSize', align: 'center', ellipsis: true }
                ]
                dataSource = newListData.toJS()
            } else if (this.state.newListType == '转账列表') {
                columns = [
                    { title: () => (<span className='text_title'>时间</span>), className: 'txt_bolder', dataIndex: 'TimeCreate', key: 'TimeCreate', align: 'center', ellipsis: true},
                    { title: () => (<span className='text_title'>消息ID</span>), className: 'txt_bolder', dataIndex: 'MessageId', key: 'MessageId', align: 'center', ellipsis: true, render: (MessageId) => (<span className="cursor_hover" onClick={ () => this.handleGoPage(MessageId, 'messageIdDetailPage')}>{MessageId}</span>) },
                    { title: () => (<span className='text_title'>发送方</span>), className: 'txt_bolder', dataIndex: 'From', key: 'From', align: 'center', ellipsis: true, render: (From) => (<span className="cursor_hover" onClick={ () => this.handleGoPage(From, 'senderDetailPage')}>{From}</span>) },
                    { title: () => (<span className='text_title'>接收方</span>), className: 'txt_bolder', dataIndex: 'To', key: 'To', align: 'center', ellipsis: true },
                    { title: () => (<span className='text_title'>净收入</span>), className: 'txt_bolder', dataIndex: 'Balance', key: 'Balance', align: 'center', ellipsis: true },
                    { title: () => (<span className='text_title'>类型</span>), className: 'txt_bolder', dataIndex: 'TransferType', key: 'TransferType', align: 'center', ellipsis: true }
                ]
                dataSource = newListData.toJS()
            }
        }
        // ---------------------------------------------- 消息列表表格数据 ----------------------------------------

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
                            {
                                miningCountsData != '' && (
                                    <div className="statistics_msg">
                                        <div>
                                            <p>算力增量: {miningCountsData.PowerIncrease}</p>
                                            <p>出块数量: {miningCountsData.BlocksMined}</p>
                                            <p>挖矿效率: {miningCountsData.RewardPer} FIL/TiB</p>
                                        </div>
                                        <div>
                                            <p>算力增速: {miningCountsData.PowerIncreaseRate}</p>
                                            <p>出块份数: {miningCountsData.WeightedBlocksMined}</p>
                                            <p>抽查成本: {miningCountsData.WindowedPoStFeePer}</p>
                                        </div>
                                        <div>
                                            <p>矿机当量: {miningCountsData.EquivalentMiners}</p>
                                            <p>出块奖励 (占比): {miningCountsData.TotalRewards}</p>
                                            <p>幸运值: {miningCountsData.LunckValue}</p>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                        <div style={{width: '100%', marginTop: '50px'}}>
                            <div>
                                <Breadcrumb style={{ margin: '16px 0', textAlign: 'left', fontSize: '16px' }}>
                                    <Breadcrumb.Item style={{paddingLeft: '20px'}}>算力变化</Breadcrumb.Item>
                                </Breadcrumb>
                            </div>
                            <div>
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
                        <div className="accountOverview_wrap">
                            <div>
                                <Breadcrumb style={{ margin: '16px 0', textAlign: 'left', fontSize: '16px' }}>
                                    <Breadcrumb.Item>账户概览</Breadcrumb.Item>
                                </Breadcrumb>
                            </div>
                            {
                                accountOverviewData != '' && (
                                    <div className="accountMsg_wrap">
                                        <div className="account_left">
                                            <p><span>地址:</span><span>{accountOverviewData.Address}</span></p>
                                            <p><span>消息数:</span><span>{accountOverviewData.MessageCount}</span></p>
                                            <p><span>类型:</span><span>{accountOverviewData.AccountType}</span></p>
                                            <p><span>创建时间:</span><span>{accountOverviewData.TimeCreate}</span></p>
                                        </div>
                                        <div className="account_right">
                                            <p><span>节点ID:</span><span className="cursor_hover" onClick={() => this.handleGoPage(accountOverviewData.NodeID, 'nodeIdPage')}>{accountOverviewData.NodeID}</span></p>
                                            <p><span>Owner:</span><span style={{color: '#1a4fc9', cursor: 'pointer'}} onClick={() => this.handleGoPage(accountOverviewData.Owner, 'senderDetailPage')}>{accountOverviewData.Owner}</span></p>
                                            <p><span>Worker:</span><span style={{color: '#1a4fc9', cursor: 'pointer'}} onClick={() => this.handleGoPage(accountOverviewData.Worker, 'senderDetailPage')}>{accountOverviewData.Worker}</span></p>
                                            <p><span>地区（公开IP）:</span><span>{accountOverviewData.Location}</span></p>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                        <div className="newList_wrap">
                            <div className="newList_top_wrap">
                                <div className="top_left_wrap">
                                    <Radio.Group defaultValue="消息列表" buttonStyle="solid" onChange={this.handleNewListRadioChange}>
                                        <Radio.Button value="消息列表">消息列表</Radio.Button>
                                        <Radio.Button value="区块列表">区块列表</Radio.Button>
                                        <Radio.Button value="转账列表">转账列表</Radio.Button>
                                    </Radio.Group>
                                </div>
                                {
                                    /*  有问题
                                    newListSelectData.toJS().length > 0 && (
                                        <div className="top_right_wrap">
                                            <Select defaultValue="全部" style={{ width: 200 }} onChange={this.handleNewListSelectChange}>
                                                <Option value='全部'>全部</Option>
                                                {
                                                    newListSelectData.toJS().map((item, index) => (
                                                        <Option value={item}>{item}</Option>
                                                    ))
                                                }
                                            </Select>
                                        </div>
                                    )
                                     */
                                }
                            </div>
                            <div className="newList_bottom_wrap">
                                <Table
                                    columns={columns}
                                    dataSource={dataSource}
                                    // bordered={true}
                                    rowKey='id'
                                    loading={
                                        {
                                            spinning: this.props.isLoading,
                                            tip: "加载中..."
                                        }
                                    }
                                    style={{ marginTop: '30px' }}
                                    pagination={{
                                        showQuickJumper: true,
                                        defaultCurrent: 1,
                                        total: totalCount,
                                        pageSize: 20,
                                        onChange: this.handlePaginationChange
                                    }}
                                />
                            </div>
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
    miningCountsData: state.get('minerOverview').get('miningCountsData'),
    newListData: state.get('minerOverview').get('newListData'),
    newListSelectData: state.get('minerOverview').get('newListSelectData'),
    totalCount: state.get('minerOverview').get('totalCount'),
    accountOverviewData: state.get('minerOverview').get('accountOverviewData')
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
    },
    handleNewList: (options) => {
        dispatch(actionCreator.handleNewListAction(options))
    },
    handleAccountData: (options) => {
        dispatch(actionCreator.handleAccountDataAction(options))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(OverviewList)