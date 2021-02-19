// LotusMiner页面
import React, { Component } from 'react'
import { connect } from 'react-redux'
import Layout from 'common/layout/index.js'
import {Breadcrumb, Table, Divider, Button, Modal, Tabs, Input, notification, List, Typography} from 'antd';
import "./index.css"
import { actionCreator } from './store'

const { TabPane } = Tabs;
const { Search } = Input;
const { confirm } = Modal

let timer = null
class LotusMiner extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: '',
            visible: false,
            modalType: '',
            isShowSearch: '',
            modalOrder: '',
            tiBiVisible: false,
            tiBiNumber: ''
        }
        this.handleServerBtn = this.handleServerBtn.bind(this)
        this.handleCancel = this.handleCancel.bind(this)
        this.handleCallback = this.handleCallback.bind(this)
        this.handleSearchBtn = this.handleSearchBtn.bind(this)
        this.handleTiBi = this.handleTiBi.bind(this)
        this.handleTiBiOk = this.handleTiBiOk.bind(this)
        this.handleTiBiCancel = this.handleTiBiCancel.bind(this)
        this.handleTiBiNumber = this.handleTiBiNumber.bind(this)
    }
    componentDidMount() {
        // 在生命周期调用发送方的数据, 处理minerInfo数据
        this.props.handleMinerInfo()
        setInterval(() => { // 半小时更新一次数据
            this.props.handleMinerInfo()
        }, 1800000)
    }

    // ------------------------------------
    handleServerBtn(type) { // 所有按钮的点击事件
        if (timer != null) {
            clearInterval(timer)
        }
        let options = {
            name: ''
        }
        switch (type) {
            case 'list':
                options.name = 'lotusminerstoragedealslist'
                this.setState({isShowSearch: false})
                return false
            case 'get-ask':
                options.name = 'lotusminerstoragedealsgetask'//改成后台给的name
                this.setState({modalOrder: 'lotusminerstoragedealsgetask', isShowSearch: true})
                break
            case 'cid-info':
                options.name = 'lotusminerpiecescidinfo'
                this.setState({modalOrder: 'lotusminerpiecescidinfo', isShowSearch: true})
                break
            case 'status':
                options.name = 'lotusminersectorsstatus'
                this.setState({modalOrder: 'lotusminersectorsstatus', isShowSearch: true})
                break
        }

        // 调用发送方函数, 处理lotus命令
        this.props.handleLotusMiner(options)
        timer = setInterval(() => { // 十一分钟刷新一次数据
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
        const { modalOrder } = this.state
        if (val == '' && modalOrder != 'lotusminerstoragedealsgetask') {
            notification['warning']({
                message: '搜索框不能为空 !'
            })
            return false
        }

        let options = {
            name: modalOrder,
            info: val,
            num: '',
            type: ''
        }
        // 调用发送方函数, 处理搜索
        this.props.handleSearch(options)
    }
    // ----------------------------------- 处理提币按钮
    handleTiBi () {
        this.setState({tiBiVisible: true})
    }
    handleTiBiOk () {
        let _this = this
        if (this.state.tiBiNumber == '') {
            notification['warning']({
                message: '输入框不能为空 !'
            })
            return false
        }
        confirm({
            title: '确定要进行提币吗 ?',
            content: '',
            onOk() {
                // 调用发送方函数, 处理提币
                let options = {
                    name: 'withdrawbalance',
                    num: _this.state.tiBiNumber
                }
                _this.props.handleTiBiData(options)
                _this.setState({tiBiVisible: false})
            },
            onCancel() {
                console.log('Cancel');
            }
        })
    }
    handleTiBiCancel () {
        this.setState({tiBiVisible: false})
    }
    handleTiBiNumber (e) {
        // console.log(e.target.value)
        this.setState({tiBiNumber: e.target.value})
    }
    // ----------------------------------- 处理提币按钮


    render() {
        let dataSource = [];
        let columns = [];
        let minerInfoList = []
        let { lotusminerlist, name, type, lotusMinerInfo } = this.props
        if (lotusminerlist.toJS().length > 0) {
            if (name == 'lotusminerstoragedealslist') {
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
            } else if (name == 'lotusminerstoragedealsgetask' && !type) {
                columns = [
                    { title: 'Address', dataIndex: 'address', key: 'address'}
                ]
                dataSource = lotusminerlist.toJS()
            } else if (name == 'lotusminerstoragedealsgetask' && type) {
                columns = [
                    { title: 'Ask', dataIndex: 'ask', key: 'ask' },
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
                    { title: 'Cid', dataIndex: 'cid', key: 'cid' },
                    { title: 'PieceCid', dataIndex: 'pieces_cid', key: 'pieces_cid' },
                    { title: 'RelOffset', dataIndex: 'rel_offset', key: 'rel_offset' },
                    { title: 'BlockSize', dataIndex: 'block_size', key: 'block_size' }
                ]
                dataSource = lotusminerlist.toJS()
            }
            /*
            else if (name == 'lotusminersectorslist') {
                columns = [
                    { title: 'Id', dataIndex: 'id', key: 'id' },
                    { title: 'Active', dataIndex: 'active', key: 'active' },
                    { title: 'Deals', dataIndex: 'deals', key: 'deals' },
                    { title: 'Expiration', dataIndex: 'expiration', key: 'expiration' },
                    { title: 'OnChain', dataIndex: 'on_chain', key: 'on_chain' },
                    { title: 'SectorId', dataIndex: 'sector_id', key: 'sector_id' },
                    { title: 'State', dataIndex: 'state', key: 'state' }
                ]
                dataSource = lotusminerlist.toJS()
            }
            */
            else if (name == 'lotusminersectorsstatus' && !type) {
                columns = [
                    { title: 'Id', dataIndex: 'id', key: 'id' },
                    { title: 'Active', dataIndex: 'active', key: 'active' },
                    { title: 'Deals', dataIndex: 'deals', key: 'deals' },
                    { title: 'Expiration', dataIndex: 'expiration', key: 'expiration' },
                    { title: 'OnChain', dataIndex: 'on_chain', key: 'on_chain' },
                    { title: 'SectorId', dataIndex: 'sector_id', key: 'sector_id' },
                    { title: 'State', dataIndex: 'state', key: 'state' }
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
        if (lotusMinerInfo.toJS().length > 0) {
            minerInfoList = lotusMinerInfo.toJS()
        }

        return (
            <div>
                <Layout>
                    <Breadcrumb style={{ margin: '16px 0', textAlign: 'left', fontSize: '20px' }}>
                        <Breadcrumb.Item>LotusMiner</Breadcrumb.Item>
                    </Breadcrumb>
                    <div>
                        <Button type="primary" onClick={() => this.handleTiBi()}>提币</Button>
                    </div>
                    <div>
                        <Tabs defaultActiveKey="1" onChange={this.handleCallback}>
                            <TabPane tab="存储交易" key="1">
                                {/*<Button type="primary" onClick={() => this.handleServerBtn("list")}>list</Button>*/}
                                {/*<Divider type="vertical" />*/}
                                <Button type="primary" onClick={() => this.handleServerBtn("get-ask")}>get-ask</Button>
                            </TabPane>

                            <TabPane tab="片信息" key="2">
                                {
                                    /*
                                        <Button type="primary" onClick={() => this.handleServerBtn("list-cids")}>list-cids</Button>
                                        <Divider type="vertical" />
                                    */
                                }
                                <Button type="primary" onClick={() => this.handleServerBtn("cid-info")}>cid-info</Button>
                            </TabPane>

                            <TabPane tab="区块信息" key="3">
                                {
                                    /*
                                    <Button type="primary" onClick={() => this.handleServerBtn("sectorslist")}>sectorslist</Button>
                                    <Divider type="vertical" />
                                     */
                                }
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
                    <div className="minerInfo_wrap">
                        <List
                            header={<div>MinerInfo</div>}
                            bordered
                            dataSource={minerInfoList}
                            loading={{spinning: this.props.isLoading, tip: '加载中 ...'}}
                            renderItem={item => (
                                <List.Item>
                                    <span><Typography.Text mark>{Object.keys(item)}</Typography.Text> : {Object.values(item)}</span>
                                </List.Item>
                            )}
                        />
                    </div>
                    <div>
                        <Modal
                            title="提币"
                            cancelText='取消'
                            okText='确认'
                            visible={this.state.tiBiVisible}
                            onOk={this.handleTiBiOk}
                            onCancel={this.handleTiBiCancel}
                        >
                            <Input placeholder="输入提币的数量" onChange={this.handleTiBiNumber} />
                        </Modal>
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
    type: state.get('lotusMiner').get('type'),
    lotusMinerInfo: state.get('lotusMiner').get('lotusMinerInfo')
})
// 发送方
const mapDispatchToProps = (dispatch) => ({
    handleLotusMiner: (options) => {
        dispatch(actionCreator.handleLotusMinerAction(options))
    },
    handleSearch: (options) => {
        dispatch(actionCreator.handleSearchAction(options))
    },
    handleMinerInfo: () => {
        dispatch(actionCreator.handleMinerInfoAction())
    },
    handleTiBiData: (options) => {
        dispatch(actionCreator.handleTiBiDataAction(options))
    }

})

export default connect(mapStateToProps, mapDispatchToProps)(LotusMiner)
