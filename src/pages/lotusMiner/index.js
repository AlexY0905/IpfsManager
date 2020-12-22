// LotusMiner页面
import React, { Component } from 'react'
import { connect } from 'react-redux'
import Layout from 'common/layout/index.js'
import {Breadcrumb, Table, Divider, Button, Modal, Tabs, Input, notification} from 'antd';
import "./index.css"
import { actionCreator } from './store'

const { TabPane } = Tabs;
const { Search } = Input;


class LotusMiner extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: '',
            visible: false,
            modalType: '',
            isShowSearch: '',
            modalOrder: ''
        }
        this.handleServerBtn = this.handleServerBtn.bind(this)
        this.handleCancel = this.handleCancel.bind(this)
        this.handleCallback = this.handleCallback.bind(this)
        this.handleSearchBtn = this.handleSearchBtn.bind(this)
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
                this.setState({isShowSearch: false})
                break
            case 'get-ask':
                options.name = 'lotusminerstoragedealsgetask'//改成后台给的name
                this.setState({isShowSearch: false})
                break
            /*
            case 'list-cids':
                options.name = 'pieceslistcids'
                break
             */
            case 'cid-info':
                options.name = 'lotusminerpiecescidinfo'
                this.setState({modalOrder: 'lotusminerpiecescidinfo', isShowSearch: true})
                break
            case 'sectorslist':
                options.name = 'sectorslist'
                this.setState({isShowSearch: false})
                break
            case 'status':
                options.name = 'lotusminersectorsstatus'
                this.setState({modalOrder: 'lotusminersectorsstatus', isShowSearch: true})
                break
        }

        // 调用发送方函数, 处理lotus命令
        this.props.handleLotusMiner(options)
        setInterval(() => { // 十一分钟刷新一次数据
            this.props.handleLotusMiner(options)
        }, 660000)
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
        // console.log(e);
    }
    handleSearchBtn (val) { // 处理搜索
        if (val == '') {
            notification['warning']({
                message: '搜索框不能为空 !'
            })
            return false
        }
        const { modalOrder } = this.state
        let options = {
            name: modalOrder,
            info: val,
            num: '',
            type: ''
        }
        // 调用发送方函数, 处理搜索
        this.props.handleSearch(options)
    }
    // -----------------------------------


    render() {
        let dataSource = [];
        let columns = [];
        let { lotusminerlist, name, type  } = this.props
        let { modalType } = this.state//从state中取出
        if (lotusminerlist.toJS().length > 0) {
            if (name == 'storagedealslist') {
                columns = [
                    { title: 'ProposalCid', dataIndex: 'proposalCid', key: 'proposalCid' },
                    { title: 'DealId', dataIndex: 'dealId', key: 'dealId' },
                    { title: 'State', dataIndex: 'state', key: 'state' },
                    { title: 'Client', dataIndex: 'client', key: 'client' },
                    { title: 'Size', dataIndex: 'size', key: 'size' },
                    { title: 'Price', dataIndex: 'price', key: 'price' },
                    { title: 'Duration', dataIndex: 'duration', key: 'duration' }
                ]
                dataSource = lotusminerlist.toJS()
            } else if (name == 'lotusminerstoragedealsgetask') {
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
            } else if (name == 'lotusminerpiecescidinfo' && !type) {
                columns = [
                    { title: 'piecesCid', dataIndex: 'Cid', key: 'Cid'}
                ]
                dataSource = lotusminerlist.toJS()
            } else if (name == 'lotusminerpiecescidinfo' && type) {
                columns = [
                    { title: 'Cid', dataIndex: 'cid', key: 'cid'},
                    { title: 'PieceCid', dataIndex: 'pieces_cid', key: 'pieces_cid' },
                    { title: 'RelOffset', dataIndex: 'rel_offset', key: 'rel_offset' },
                    { title: 'BlockSize', dataIndex: 'block_size', key: 'block_size' }
                ]
                dataSource = lotusminerlist.toJS()
            } else if (name == 'lotusminersectorsstatus' && !type) {
                columns = [
                    { title: '', dataIndex: '', key: '' }
                ]  
                dataSource = lotusminerlist.toJS()
            } else if (name == 'lotusminersectorsstatus' && type) {
                columns = [
                    { title: 'SectorID', dataIndex: 'SectorID', key: 'SectorID', width: '100px' },
                    { title: 'IsGarbageSector', dataIndex: 'IsGarbageSector', key: 'IsGarbageSector', width: '100px' },
                    { title: 'Status', dataIndex: 'Status', key: 'Status', width: '100px' },
                    { title: 'CIDcommD', dataIndex: 'CIDcommD', key: 'CIDcommD', width: '100px' },
                    { title: 'CIDcommR', dataIndex: 'CIDcommR', key: 'CIDcommR', width: '100px' },
                    { title: 'Ticket', dataIndex: 'Ticket', key: 'Ticket', width: '100px' },
                    { title: 'TicketH', dataIndex: 'TicketH', key: 'TicketH', width: '100px' },
                    { title: 'Seed', dataIndex: 'Seed', key: 'Seed', width: '100px' },
                    { title: 'SeedH', dataIndex: 'SeedH', key: 'SeedH', width: '100px' },
                    { title: 'Precommit', dataIndex: 'Precommit', key: 'Precommit', width: '100px' },
                    { title: 'Commit', dataIndex: 'Commit', key: 'Commit', width: '100px' },
                    { title: 'Proof', dataIndex: 'Proof', key: 'Proof', width: '200px' },
                    { title: 'Deals', dataIndex: 'Deals', key: 'Deals', width: '50px' },
                    { title: 'Retries', dataIndex: 'Retries', key: 'Retries', width: '50px' }
                ]
                dataSource = lotusminerlist.toJS()
            }
        } else {
            columns = []
            dataSource = []
        }

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
                                {
                                    /*
                                        <Button type="primary" onClick={() => this.handleServerBtn("list-cids")}>list-cids</Button>
                                        <Divider type="vertical" />
                                    */
                                }
                                <Button type="primary" onClick={() => this.handleServerBtn("cid-info")}>cid-info</Button>
                            </TabPane>

                            <TabPane tab="sectors" key="3">
                                <Button type="primary" onClick={() => this.handleServerBtn("sectorslist")}>sectorslist</Button>
                                <Divider type="vertical" />
                                <Button type="primary" onClick={() => this.handleServerBtn("status")}>status</Button>
                            </TabPane>
                        </Tabs>
                    </div>
                    {
                        this.state.isShowSearch && (
                            <div className="search_wrap">
                                <div style={{display: 'flex'}}>
                                    <div style={{marginRight: '20px'}}>
                                        <Search
                                            style={{ width: 200 }}
                                            placeholder="input search text"
                                            onChange={this.handleFindBtnChange}
                                            onSearch={this.handleSearchBtn}
                                        />
                                    </div>
                                </div>
                            </div>
                        )
                    }
                    <div style={{marginBottom: '30px', width: '100%'}}>
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
                    </div>
                </Layout>
            </div>
        )
    }
}
// 接收方
const mapStateToProps = (state) => ({
    // 获取属于lotusMiner页面 store中的所有数据
    isLoading: state.get('lotusMiner').get('isLoading'),
    lotusminerlist: state.get('lotusMiner').get('lotusminerlist'),
    name: state.get('lotusMiner').get('name'),
    type: state.get('lotusMiner').get('type')
})
// 发送方
const mapDispatchToProps = (dispatch) => ({
    handleLotusMiner: (options) => {
        dispatch(actionCreator.handleLotusMinerAction(options))
    },
    handleSearch: (options) => {
        dispatch(actionCreator.handleSearchAction(options))
    }

})

export default connect(mapStateToProps, mapDispatchToProps)(LotusMiner)
