// LotusMiner页面
import React, { Component } from 'react'
import { connect } from 'react-redux'
import Layout from 'common/layout/index.js'
import { Breadcrumb, Table, Divider, Button, Modal, Tabs } from 'antd';
import "./index.css"
import { actionCreator } from './store'

const { TabPane } = Tabs;


class LotusMiner extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: '',
            visible: false,
            modalType: ''
        }
        this.handleServerBtn = this.handleServerBtn.bind(this)
        this.handleCancel = this.handleCancel.bind(this)
        this.handleCallback = this.handleCallback.bind(this)
    }
    componentDidMount() {
        // 在生命周期调用发送方的数据

    }

    // ------------------------------------
    handleServerBtn(type) { // 所有按钮的点击事件
        let options = {
            name: ''
        }
        switch (type) {
            case 'list':
                options.name = 'storage-dealslist'
                break
            case 'get-ask':
                options.name = 'lotusminerstoragedealsgetask'//改成后台给的name 
                break
            case 'list-cids':
                options.name = 'pieceslist-cids'
                break
            case 'cid-info':
                options.name = 'piecescid-info'
                break
            case 'sectorslist':
                options.name = 'sectorslist'
                break
            case 'status':
                options.name = 'sectorsstatus'
                break
        }

        // 调用发送方函数, 处理lotus命令   //测试真实数据的时候打开
        // this.props.handleLotusMiner(options)
        // setInterval(() => {//十一分钟刷新一次数据 
        //     this.props.handleLotusMiner(options)
        // }, 660000)
        this.setState({
            modalType: type
        })
    }
    handleCancel() { // 关闭对话框函数
        this.setState({
            visible: false
        })
    }
    handleCallback(e) { // 切换tab函数
        console.log(e);
    }
    // -----------------------------------


    render() {
        let dataSource = [];
        let columns = [];
        let { name, lotusminerlist } = this.props
        let { modalType } = this.state//从state中取出
        if (lotusminerlist.toJS().length > 0) {
            if (name == 'storage-dealslist') {
                columns = [
                    { title: 'ProposalCid', dataIndex: 'proposalCid', key: 'proposalCid' },
                    { title: 'DealId', dataIndex: 'dealId', key: 'dealId' },
                    { title: 'State', dataIndex: 'state', key: 'state' },
                    { title: 'Client', dataIndex: 'client', key: 'client' },
                    { title: 'Size', dataIndex: 'size', key: 'size' },
                    { title: 'Price', dataIndex: 'price', key: 'price' },
                    { title: 'Duration', dataIndex: 'duration', key: 'duration' }
                ]
                // dataSource = lotusminerlist.toJS()
            } else if (name == 'lotusminerstoragedealsgetask') {
                // console.log('hhhhhhh', name);
                columns = [
                    { title: 'Expiry', dataIndex: 'expiry', key: 'expiry' },
                    { title: 'MaxpieceSize', dataIndex: 'max_piece_size', key: 'max_piece_size' },
                    { title: 'MinpieceSize', dataIndex: 'min_piece_size', key: 'min_piece_size' },
                    { title: 'Miner', dataIndex: 'miner', key: 'miner' },
                    { title: 'Price', dataIndex: 'price', key: 'price' },
                    { title: 'Seq_No', dataIndex: 'seq_no', key: 'seq_no' },
                    { title: 'Timestamp', dataIndex: 'timestamp', key: 'timestamp' },
                    { title: 'Verified', dataIndex: 'verified_price', key: 'verified_price' }
                ]
                dataSource = lotusminerlist.toJS()
            }


            console.log(':::::::::--------', lotusminerlist.toJS())
        }
        // ---------------------------------------------------------------------------------------------
        if (lotusminerlist.toJS().length == 0 && modalType != '') {//有真数据的话 要删除
            if (modalType == 'list') {
                columns = [
                    { title: 'ProposalCid', dataIndex: 'proposalCid', key: 'proposalCid' },
                    { title: 'DealId', dataIndex: 'dealId', key: 'dealId' },
                    { title: 'State', dataIndex: 'state', key: 'state' },
                    { title: 'Client', dataIndex: 'client', key: 'client' },
                    { title: 'Size', dataIndex: 'size', key: 'size' },
                    { title: 'Price', dataIndex: 'price', key: 'price' },
                    { title: 'Duration', dataIndex: 'duration', key: 'duration' }
                ]
                dataSource = [//假数据
                    { proposalCid: 'sfa', dealId: '001', state: 'adf', client: 'adf', size: '228', price: '666', duration: 'adf' }
                ]
            } else if (modalType == 'list-cids') {
                columns = [
                    { title: 'Cid', dataIndex: 'cid', key: 'cid' }
                ]
                dataSource = [//假数据
                    { cid: 'dfsdfsfsdf' }
                ]
            } else if (modalType == 'cid-info') {
                columns = [
                    { title: 'PieceCid', dataIndex: 'pieceCid', key: 'pieceCid' },
                    { title: 'offset', dataIndex: 'offset', key: 'offset' },
                    { title: 'Size', dataIndex: 'size', key: 'size' }
                ]
                dataSource = [//假数据
                    { pieceCid: '0001', offset: 'right', size: '512' },
                    { pieceCid: '0002', offset: 'right', size: '365' },
                    { pieceCid: '0003', offset: 'left', size: '543' },
                    { pieceCid: '0004', offset: 'left', size: '789' },
                    { pieceCid: '0005', offset: 'left', size: '654' },
                    { pieceCid: '0006', offset: 'left', size: '765' },
                    { pieceCid: '0007', offset: 'left', size: '998' },
                    { pieceCid: '0008', offset: 'right', size: '456' }
                ]
            } else if (modalType == 'status') {
                columns = [
                    { title: 'ISGarbageSector', dataIndex: 'isgarbagesector', key: 'isgarbagesector' },
                    { title: 'Status', dataIndex: 'status', key: 'status' },
                    { title: 'CIDcommD', dataIndex: 'cidcommd', key: 'cidcommd' },
                    { title: 'CIDcommR', dataIndex: 'cidcommr', key: 'cidcommr' },
                    { title: 'Ticket', dataIndex: 'ticket', key: 'ticket' },
                    { title: 'TicketH', dataIndex: 'ticketh', key: 'ticketh' },
                    { title: 'Seed', dataIndex: 'seed', key: 'seed' },
                    { title: 'SeedH', dataIndex: 'seedh', key: 'seedh' },
                    { title: 'Precommit', dataIndex: 'precommit', key: 'precommit' },
                    { title: 'Commit', dataIndex: 'commit', key: 'commit' },
                    { title: 'Proof', dataIndex: 'proof', key: 'proof' },
                    { title: 'Deals', dataIndex: 'deals', key: 'deals' },
                    { title: 'Retries', dataIndex: 'retries', key: 'retries' }
                ]
                dataSource = [//假数据
                    { isgarbagesector: 'adad', status: 'adfd', cidcommd: 'adff', cidcommr: 'agg', ticket: 'adfd', ticketh: 'gdsd', seed: 'adfd', seedh: 'fgfdg', precommit: 'fdgfd', commit: 'dgfs', proof: 'hfgfg', deals: 'gfd', retries: 'gfdsf' },
                    { isgarbagesector: 'adad', status: 'adfd', cidcommd: 'adff', cidcommr: 'agg', ticket: 'adfd', ticketh: 'gdsd', seed: 'adfd', seedh: 'fgfdg', precommit: 'fdgfd', commit: 'dgfs', proof: 'hfgfg', deals: 'gfd', retries: 'gfdsf' },
                    { isgarbagesector: 'adad', status: 'adfd', cidcommd: 'adff', cidcommr: 'agg', ticket: 'adfd', ticketh: 'gdsd', seed: 'adfd', seedh: 'fgfdg', precommit: 'fdgfd', commit: 'dgfs', proof: 'hfgfg', deals: 'gfd', retries: 'gfdsf' },
                    { isgarbagesector: 'adad', status: 'adfd', cidcommd: 'adff', cidcommr: 'agg', ticket: 'adfd', ticketh: 'gdsd', seed: 'adfd', seedh: 'fgfdg', precommit: 'fdgfd', commit: 'dgfs', proof: 'hfgfg', deals: 'gfd', retries: 'gfdsf' },
                    { isgarbagesector: 'adad', status: 'adfd', cidcommd: 'adff', cidcommr: 'agg', ticket: 'adfd', ticketh: 'gdsd', seed: 'adfd', seedh: 'fgfdg', precommit: 'fdgfd', commit: 'dgfs', proof: 'hfgfg', deals: 'gfd', retries: 'gfdsf' }
                ]
            }

        }
        // --------------------------------------------------------------------------------------------


        return (
            <div>
                <Layout>
                    <Breadcrumb style={{ margin: '16px 0', textAlign: 'left', fontSize: '20px' }}>
                        <Breadcrumb.Item>LotusMiner</Breadcrumb.Item>
                    </Breadcrumb>
                    <div>
                        <Tabs defaultActiveKey="1" onChange={this.handleCallback}>
                            <TabPane tab="storage-deals" key="1">
                                <Button type="primary" onClick={() => this.handleServerBtn("list")}>list</Button>
                                <Divider type="vertical" />
                                <Button type="primary" onClick={() => this.handleServerBtn("get-ask")}>get-ask</Button>
                            </TabPane>

                            <TabPane tab="pieces" key="2">
                                <Button type="primary" onClick={() => this.handleServerBtn("list-cids")}>list-cids</Button>
                                <Divider type="vertical" />
                                <Button type="primary" onClick={() => this.handleServerBtn("cid-info")}>cid-info</Button>
                            </TabPane>

                            <TabPane tab="sectors" key="3">
                                <Button type="primary" onClick={() => this.handleServerBtn("sectorslist")}>sectorslist</Button>
                                <Divider type="vertical" />
                                <Button type="primary" onClick={() => this.handleServerBtn("status")}>status</Button>
                            </TabPane>
                        </Tabs>
                    </div>
                    <Table
                        columns={columns}
                        dataSource={dataSource}
                        bordered={true}
                        rowKey='id'
                        loading={
                            {
                                spinning: this.props.isLoading,
                                tip: "加载中..."
                            }
                        }
                        style={{ marginTop: '30px' }}
                    />
                </Layout>
            </div>
        )
    }
}
// 接收方
const mapStateToProps = (state) => ({
    // 获取属于lotusMiner页面 store中的所有数据
    isLoading: state.get('lotusMiner').get('isLoading'),
    name: state.get('lotusMiner').get('name'),
    lotusminerlist: state.get('lotusMiner').get('lotusminerlist')
})
// 发送方
const mapDispatchToProps = (dispatch) => ({
    handleLotusMiner: (options) => {
        dispatch(actionCreator.handleLotusMinerAction(options))
    }

})

export default connect(mapStateToProps, mapDispatchToProps)(LotusMiner)
