// 区块id详情页面
import React, { Component } from 'react'
import { connect } from 'react-redux'
import "./index.css"
import { actionCreator } from './store'
import Layout from 'common/layout'
import {Breadcrumb, Radio, Select, Table} from 'antd'

class BlockDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            newListType: '消息列表',
            newListSelectType: '全部',
            currentPage: 1
        }
        this.handleNewListSelectChange = this.handleNewListSelectChange.bind(this)
        this.handlePaginationChange = this.handlePaginationChange.bind(this)
        this.handleGoPage = this.handleGoPage.bind(this)
    }
    componentDidMount() {
        // console.log(111111111111, this.props.location.state.parameter)
        // 调用发送方函数, 处理区块Id详情数据
        let blockDetailOptions = {name: 'minerblockdetail', address: this.props.location.state.parameter}
        this.props.handleBlockDetail(blockDetailOptions)
        // 调用发送方函数, 处理消息列表数据
        let newListOptions = {name: 'minerblockmessage', page: 1, address: this.props.location.state.parameter}
        this.props.handleBlockNewList(newListOptions)
        setInterval(() => {
            this.props.handleBlockDetail(blockDetailOptions)
            this.props.handleBlockNewList(newListOptions)
        }, 7800000)

    }
    // 处理消息列表下拉框改变事件
    handleNewListSelectChange (val) {
        console.log('val==============', val);
        this.setState({newListSelectType: val, currentPage: 1})
        // 调用发送方函数, 处理消息列表数据
        let newListOptions = {name: 'minerblockmessage', page: 1, method: val, address: this.props.location.state.parameter}
        this.props.handleBlockNewList(newListOptions)
    }
    // 处理表格分页器
    handlePaginationChange (page, pageSize) {
        let options = {
            name: '',
            page: page,
            address: this.props.location.state.parameter
        }
        if (this.state.newListType == '消息列表') {
            options.name = 'minerblockmessage'
            options.method = this.state.newListSelectType
        } else if (this.state.newListType == '转账列表') {
            options.name = 'minertransfors'
        }
        // 调用发送方函数, 处理消息列表数据
        this.props.handleBlockNewList(options)
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
        const { newListData, newListSelectData, totalCount, blockIdDetailData } = this.props
        // ---------------------------------------------- 消息列表表格数据 ----------------------------------------
        let columns = []
        let dataSource = []
        if (newListData.toJS().length > 0) {
            if (this.state.newListType == '' || this.state.newListType == '消息列表') {
                columns = [
                    { title: () => (<span className='text_title'>消息ID</span>), dataIndex: 'Cid', key: 'Cid', align: 'center', ellipsis: true, render: (Cid) => (<span className="cursor_hover" onClick={ () => this.handleGoPage(Cid, 'messageIdDetailPage')}>{Cid}</span>) },
                    { title: () => (<span className='text_title'>发送方</span>), dataIndex: 'From', key: 'From', align: 'center', ellipsis: true, render: (From) => (<span className="cursor_hover" onClick={ () => this.handleGoPage(From, 'senderDetailPage')}>{From}</span>) },
                    { title: () => (<span className='text_title' onClick={() => { this.props.history.push({ pathname: "/minerOverview" }) }}>接收方</span>), dataIndex: 'To', key: 'To', align: 'center', ellipsis: true },
                    { title: () => (<span className='text_title'>方法</span>), dataIndex: 'Method', key: 'Method', align: 'center', ellipsis: true },
                    { title: () => (<span className='text_title'>金额</span>), dataIndex: 'Balance', key: 'Balance', align: 'center', ellipsis: true },
                    { title: () => (<span className='text_title'>状态</span>), dataIndex: 'Status', key: 'Status', align: 'center', ellipsis: true }
                ]
                dataSource = newListData.toJS()
            }
        }
        // ---------------------------------------------- 消息列表表格数据 ----------------------------------------

        return (
            <div className="News">
                <Layout>
                    <Breadcrumb style={{ margin: '16px 0', textAlign: 'left', fontSize: '16px' }}>
                        <Breadcrumb.Item style={{color: '#000'}}>区块详情</Breadcrumb.Item>
                    </Breadcrumb>
                    <div className="content" style={{boxSizing: 'border-box', padding: '0 20px'}}>
                        <div className="blockDetail_wrap">
                            <div>
                                <Breadcrumb style={{ margin: '16px 0', textAlign: 'left', fontSize: '16px' }}>
                                    <Breadcrumb.Item style={{color: '#000'}}>区块概览</Breadcrumb.Item>
                                </Breadcrumb>
                            </div>
                            {
                                blockIdDetailData != '' && (
                                    <div className="blockDetail_content">
                                        <p><span>区块ID</span><span>{blockIdDetailData.BlockId}</span></p>
                                        <p><span>高度</span><span style={{color: '#1a4fc9', cursor: 'pointer'}} onClick={ () => this.handleGoPage(blockIdDetailData.Height, 'heightDetailPage')}>{blockIdDetailData.Height}</span></p>
                                        <p><span>矿工</span><span style={{color: '#1a4fc9', cursor: 'pointer'}} onClick={() => { this.props.history.push({ pathname: "/minerOverview" }) }}>{blockIdDetailData.Miner}</span></p>
                                        <p><span>时间</span><span>{blockIdDetailData.Times}</span></p>
                                        <p><span>大小</span><span>{blockIdDetailData.Size}</span></p>
                                        <p><span>消息</span><span>{blockIdDetailData.MessageCount}</span></p>
                                        <p><span>奖励</span><span>{blockIdDetailData.Reward}</span></p>
                                        <p><span>奖励份数</span><span>{blockIdDetailData.WinCount}</span></p>
                                        <p><span>父区块</span><span>{blockIdDetailData.ParentBlocks.length > 0 && blockIdDetailData.ParentBlocks.map((item, index) => (<span style={{color: '#1a4fc9', cursor: 'pointer'}} onClick={ () => this.handleGoPage(item, 'blockDetailPage')}>{item}</span>))}</span></p>
                                        <p><span>父区块权重</span><span>{blockIdDetailData.ParentWeight}</span></p>
                                        <p><span>罚金</span><span>{blockIdDetailData.Penalty}</span></p>
                                        <p><span>Parent Base Fee</span><span>{blockIdDetailData.ParentBaseFee}</span></p>
                                    </div>
                                )
                            }
                        </div>
                        <div className="newList_wrap" style={{padding: '0'}}>
                            <div className="newList_top_wrap">
                                <div className="top_left_wrap">
                                    <span style={{fontSize: '16px', color: '#000'}}>消息列表</span>
                                </div>
                                {
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
                                }
                            </div>
                            <div className="newList_bottom_wrap">
                                <Breadcrumb style={{ margin: '16px 0', textAlign: 'left', fontSize: '16px' }}>
                                    <Breadcrumb.Item>共 <span>{totalCount != '' && totalCount}</span> 条信息</Breadcrumb.Item>
                                </Breadcrumb>
                                <Table
                                    columns={columns}
                                    dataSource={dataSource}
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
                                        defaultCurrent: this.state.currentPage,
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
    newListData: state.get('minerOverview').get('newListData'),
    newListSelectData: state.get('minerOverview').get('newListSelectData'),
    totalCount: state.get('minerOverview').get('totalCount'),
    blockIdDetailData: state.get('minerOverview').get('blockIdDetailData')
})


// 发送方
const mapDispatchToProps = (dispatch) => ({
    handleBlockDetail: (options) => {
        dispatch(actionCreator.handleBlockDetailAction(options))
    },
    handleBlockNewList: (options) => {
        dispatch(actionCreator.handleBlockNewListAction(options))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(BlockDetail)