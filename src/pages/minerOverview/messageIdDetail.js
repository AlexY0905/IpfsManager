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
        // 调用发送方函数, 处理矿工概览饼形图数据
        // this.props.handleOverviewEchartsData()
        console.log(1111111111111, this.props);
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
        let columns = [
            { title: () => (<span className='text_title'>发送方</span>), className: 'txt_bolder', dataIndex: 'From', key: 'From', align: 'center', ellipsis: true, render: (From) => (<span className="cursor_hover" onClick={ () => this.handleGoPage(From, 'senderDetailPage')}>{From}</span>) },
            { title: () => (<span className='text_title'>接收方</span>), className: 'txt_bolder', dataIndex: 'To', key: 'To', align: 'center', ellipsis: true },
            { title: () => (<span className='text_title'>金额</span>), className: 'txt_bolder', dataIndex: 'Balance', key: 'Balance', align: 'center', ellipsis: true },
            { title: () => (<span className='text_title'>类型</span>), className: 'txt_bolder', dataIndex: 'TransferType', key: 'TransferType', align: 'center', ellipsis: true }
        ]
        let dataSource = [
            {key: '1', From: 'bafy2bzacebhljgx7vgsbsruqvvl6w7epdmiem3uhlbst5oekmay44c7dyx32w', To: 'f02626', Balance: '0.000023807248904805 FIL', TransferType: '矿工手续费'},
            {key: '2', From: 'bafy2bzacebhljgx7vgsbsruqvvl6w7epdmiem3uhlbst5oekmay44c7dyx32w', To: 'f02626', Balance: '0.000023807248904805 FIL', TransferType: '矿工手续费'}
        ]
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
                            <div className="messageDetail_content">
                                <p><span>消息ID</span><span>bafy2bzacedxasgoviq7dpdn2uuct3kdedehwnws4dfeiu7q7xnk4kw74ugojw</span></p>
                                <p><span>高度</span><span>412109</span></p>
                                <p><span>时间</span><span>2021-01-15 08:14:30</span></p>
                                <p><span>所属区块</span><span>bafy2bzacebhljgx7vgsbsruqvvl6w7epdmiem3uhlbst5oekmay44c7dyx32w</span></p>
                                <p><span>发送方</span><span>f3wu4i2wt3gbiun7iymuyn2xd2txw7gcgw5ikyjkvavyl5gle2xmi3bksqtqhxclxftlhm2k73bkkprepg6j5qlxftlhm2k73bkkprepg6j5q</span></p>
                                <p><span>接收方</span><span>f015734</span></p>
                                <p><span>方法</span><span>SubmitWindowedPoSt</span></p>
                                <p><span>金额</span><span>0 FIL</span></p>
                                <p><span>状态</span><span>OK</span></p>
                            </div>
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
                            <div className="messageDetail_content">
                                <p><span>版本</span><span>0</span></p>
                                <p><span>Nonce</span><span>34820</span></p>
                                <p><span>Gas Fee Cap</span><span>30.905082856 nanoFIL</span></p>
                                <p><span>Gas Premium</span><span>147,153 attoFIL</span></p>
                                <p><span>发送方</span><span>f3wu4i2wt3gbiun7iymuyn2xd2txw7gcgw5ikyjkvavyl5gle2xmi3bksqtqhxclxftlhm2k73bkkprepg6j5qlxftlhm2k73bkkprepg6j5q</span></p>
                                <p><span>接收方</span><span>f015734</span></p>
                                <p><span>方法</span><span>SubmitWindowedPoSt</span></p>
                                <p><span>金额</span><span>0 FIL</span></p>
                                <p><span>状态</span><span>OK</span></p>
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
    isLoading: state.get('minerOverview').get('isLoading')
})


// 发送方
const mapDispatchToProps = (dispatch) => ({
    // handleOverviewEchartsData: (options) => {
    //     dispatch(actionCreator.handleOverviewEchartsDataAction(options))
    // }
})

export default connect(mapStateToProps, mapDispatchToProps)(MessageIdDetail)