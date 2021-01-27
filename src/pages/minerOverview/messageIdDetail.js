// 消息Id详情页面
import React, { Component } from 'react'
import { connect } from 'react-redux'
import "./index.css"
import { actionCreator } from './store'
import Layout from 'common/layout'
import { Breadcrumb, Table } from 'antd'

class MessageIdDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
        this.handleGoPage = this.handleGoPage.bind(this)
        this.handlePaginationChange = this.handlePaginationChange.bind(this)
    }
    componentDidMount() {
        // console.log(1111111111111, this.props.location.state.parameter);
        // 调用发送方函数, 处理消息id详情数据
        let options = {
            name: 'minermessageinfo',
            address: this.props.location.state.parameter
        }
        this.props.handleMsgIdDetailData(options)
        setInterval(() => {
            this.props.handleMsgIdDetailData(options)
        }, 7800000)
    }
    handleGoPage (val, type) {
        if (val == 'N/A') return
        if (type == 'senderDetailPage') {
            this.props.history.push({ pathname: "/minerOverview/senderDetail", state: { parameter: val } })
        }
    }
    // 处理表格分页
    handlePaginationChange (page, pageSize) {
        console.log('page--------', page)
        return
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


    render() {
        const { msgIdDetailMsgData, msgIdDetailAccountData, msgIdDetailOthersData  } = this.props
        let columns = [
            { title: () => (<span className='text_title'>发送方</span>), dataIndex: 'FromAddress', key: 'FromAddress', align: 'center', ellipsis: true, render: (FromAddress) => (<span className="cursor_hover" onClick={ () => this.handleGoPage(FromAddress, 'senderDetailPage')}>{FromAddress}</span>) },
            { title: () => (<span className='text_title'>接收方</span>), dataIndex: 'ToAddress', key: 'ToAddress', align: 'center', ellipsis: true,  render: (ToAddress, record) => (<span>{ToAddress}{record.ToTags != null && record.ToTags.signed && (<span style={{padding: '5px', border: '1px solid #e2e8f0', borderRadius: '30px', marginLeft: '10px'}}><span>{record.ToTags.name}<span><img
                    src="https://filfox.info/dist/img/signed.16bca8b.svg" style={{width: '12px', marginLeft: '5px'}} /></span></span></span>)}</span>) },
            { title: () => (<span className='text_title'>金额</span>), dataIndex: 'Balance', key: 'Balance', align: 'center', ellipsis: true },
            { title: () => (<span className='text_title'>类型</span>), dataIndex: 'Types', key: 'Types', align: 'center', ellipsis: true }
        ]
        let dataSource = []
        if (msgIdDetailAccountData.toJS().length > 0) {
            dataSource = msgIdDetailAccountData.toJS()
        }
        if (msgIdDetailOthersData != '') {
            console.log('msgIdDetailOthersData=========', msgIdDetailOthersData);
        }



        let totalCount = 50
        return (
            <div className="News">
                <Layout>
                    <Breadcrumb style={{ margin: '16px 0', textAlign: 'left', fontSize: '16px', color: '#000000' }}>
                        <Breadcrumb.Item>消息详情</Breadcrumb.Item>
                    </Breadcrumb>
                    <div className="content">
                        <div className="message_overview_wrap">
                            <div>
                                <Breadcrumb style={{ margin: '16px 0', textAlign: 'left', fontSize: '16px', color: '#000000' }}>
                                    <Breadcrumb.Item>消息概览</Breadcrumb.Item>
                                </Breadcrumb>
                            </div>
                            {
                                msgIdDetailMsgData != '' && (
                                    <div className="messageDetail_content">
                                        <p><span>消息ID</span><span>{msgIdDetailMsgData.MessageId}</span></p>
                                        <p><span>高度</span><span>{msgIdDetailMsgData.Height}</span></p>
                                        <p><span>时间</span><span>{msgIdDetailMsgData.Times}</span></p>
                                        <p><span>所属区块</span><span style={{display: 'flex', flexDirection: 'column'}}>{msgIdDetailMsgData.Blocks.length > 0 && msgIdDetailMsgData.Blocks.map((item, index) => (<span>{item}</span>))}</span></p>
                                        <p><span>发送方</span><span>{msgIdDetailMsgData.FromAddress}</span></p>
                                        <p><span>接收方</span><span>{msgIdDetailMsgData.ToAddress}</span></p>
                                        <p><span>方法</span><span>{msgIdDetailMsgData.Method}</span></p>
                                        <p><span>金额</span><span>{msgIdDetailMsgData.Balance}</span></p>
                                        <p><span>状态</span><span>{msgIdDetailMsgData.Status}</span></p>
                                    </div>
                                )
                            }
                        </div>
                        <div className="account_msg_wrap">
                            <div>
                                <Breadcrumb style={{ margin: '16px 0', textAlign: 'left', fontSize: '16px', color: '#000000' }}>
                                    <Breadcrumb.Item>转账信息</Breadcrumb.Item>
                                </Breadcrumb>
                            </div>
                            <div>
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
                                        hideOnSinglePage: true,
                                        showQuickJumper: true,
                                        defaultCurrent: 1,
                                        total: 2,
                                        pageSize: 20,
                                        onChange: this.handlePaginationChange
                                    }}
                                />
                            </div>
                        </div>
                        <div className="other_msg_wrap message_overview_wrap">
                            <div>
                                <Breadcrumb style={{ margin: '16px 0', textAlign: 'left', fontSize: '16px', color: '#000000' }}>
                                    <Breadcrumb.Item>其它信息</Breadcrumb.Item>
                                </Breadcrumb>
                            </div>
                            {
                                msgIdDetailOthersData != '' && (
                                    <div className="messageDetail_content">
                                        <p><span>版本</span><span>{msgIdDetailOthersData.Version}</span></p>
                                        <p><span>Nonce</span><span>{msgIdDetailOthersData.Nonce}</span></p>
                                        <p><span>Gas Fee Cap</span><span>{msgIdDetailOthersData.GasFeeCap}</span></p>
                                        <p><span>Gas Premium</span><span>{msgIdDetailOthersData.GasPremium}</span></p>
                                        <p><span>Gas 限额</span><span>{msgIdDetailOthersData.GasLimit}</span></p>
                                        <p><span>Gas 使用量</span><span>{msgIdDetailOthersData.GasUsed}</span></p>
                                        <p><span>Base Fee</span><span>{msgIdDetailOthersData.BasFee}</span></p>
                                        <p><span>参数</span><span><pre style={{whiteSpace: 'pre-wrap'}}>{JSON.stringify(msgIdDetailOthersData.Params)}</pre></span></p>
                                        <p><span>返回值</span><span>{msgIdDetailOthersData.Return}</span></p>
                                    </div>
                                )
                            }
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
    msgIdDetailMsgData: state.get('minerOverview').get('msgIdDetailMsgData'),
    msgIdDetailAccountData: state.get('minerOverview').get('msgIdDetailAccountData'),
    msgIdDetailOthersData: state.get('minerOverview').get('msgIdDetailOthersData')
})


// 发送方
const mapDispatchToProps = (dispatch) => ({
    handleMsgIdDetailData: (options) => {
        dispatch(actionCreator.handleMsgIdDetailDataAction(options))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(MessageIdDetail)