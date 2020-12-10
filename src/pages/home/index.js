// lotus命令页面
import React, { Component } from 'react'
import { connect } from 'react-redux'
import Layout from 'common/layout/index.js'
import { Breadcrumb, Table, Divider, Button, Modal, Tabs, Spin } from 'antd';
import "./index.css"
import { actionCreator } from './store'

const { TabPane } = Tabs;

class Home extends Component {
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

    }

    // ------------------------------------
    handleServerBtn(type) { // 所有按钮的点击事件
        let options = {
            name: ''
        }
        switch (type) {
            case 'list':
                options.name = 'lotuswalletlist'
                break
            case 'query-ask':
                options.name = 'lotusclientquery-ask'
                break
            case 'list-deals':
                options.name = 'lotusclientlist-deals'
                break
            case 'pending':
                options.name = 'lotusmpoolpending'
                break
            case 'fird':
                options.name = 'lotusmpoolfird'
                break
            case 'config':
                options.name = 'lotusmpoolconfig'
                break
            case 'gas-perf':
                options.name = 'lotusmpoolgas-perf'
                break
            case 'power':
                options.name = 'lotusstatepower'
                break
            case 'active-sectors':
                options.name = 'lotusstateactive-sectors'
                break
            case 'list-actors':
                options.name = 'lotusstatelist-actors'
                break
            case 'list-miners':
                options.name = 'lotusstatelist-miners'
                break
            case 'get-actr':
                options.name = 'lotusstateget-actr'
                break
            case 'miner-info':
                options.name = 'lotusstateminer-info'
                break
            case 'sector':
                options.name = 'lotusstatesector'
                break
            case 'read-state':
                options.name = 'lotusstateread-state'
                break
            case 'getblock':
                options.name = 'lotuschaingetblock'
                break
            case 'getmessage':
                options.name = 'lotuschaingetmessage'
                break
            case 'gas-price':
                options.name = 'lotuschaingas-price'
                break
        }

        // 调用发送方函数, 处理lotus命令
        // this.props.handleLotusOrders(options)
        // setInterval(() => { // 十分钟刷新一次数据
        //     this.props.handleLotusOrders(options)
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
        let { name, lotusOrderList } = this.props
        let { modalType } = this.state
        if (lotusOrderList.toJS().length > 0) {
            if (name == 'lotuswalletlist') {
                columns = [
                    {title: 'Address',dataIndex: 'address',key: 'address'},
                    {title: 'Balance',dataIndex: 'balance',key: 'balance'},
                    {title: 'Nonce',dataIndex: 'nonce',key: 'nonce'}
                ]
                dataSource = lotusOrderList.toJS()
            } else if (name == 'lotusclientquery-ask') {
                columns = [
                    {title: 'Ask',dataIndex: 'ask',key: 'ask'},
                    {title: 'Price per',dataIndex: 'price',key: 'price'},
                    {title: 'Verified',dataIndex: 'verified_price',key: 'verified_price'},
                    {title: 'Max piece size',dataIndex: 'max',key: 'max'}
                ]
                dataSource = lotusOrderList.toJS()
            } else if (name == 'lotusmpoolconfig') {
                columns = [
                    {title: 'GasLimitOverestimation',dataIndex: 'gas_limit_overestimation',key: 'gas_limit_overestimation'},
                    {title: 'PriorityAddrs',dataIndex: 'priority_addrs',key: 'priority_addrs'},
                    {title: 'PruneCooldown',dataIndex: 'prune_cooldown',key: 'prune_cooldown'},
                    {title: 'ReplaceByFeeRatio',dataIndex: 'replace_by_fee_ratio',key: 'replace_by_fee_ratio'},
                    {title: 'SizeLimitHigh',dataIndex: 'size_limit_high',key: 'size_limit_high'},
                    {title: 'SizeLimitLow',dataIndex: 'size_limit_low',key: 'size_limit_low'}
                ]
                dataSource = lotusOrderList.toJS()
            } else if (name == 'lotusmpoolgas-perf') {
                columns = [
                    {title: 'Address',dataIndex: 'Address',key: 'Address'},
                    {title: 'Height',dataIndex: 'Height',key: 'Height'},
                    {title: 'orderNumber',dataIndex: 'orderNumber',key: 'orderNumber'},
                    {title: 'Number',dataIndex: 'Number',key: 'Number'}
                ]
                dataSource = lotusOrderList.toJS()
            } else if (name == 'lotusstatepower') {
                columns = [
                    {title: 'Power',dataIndex: 'Power',key: 'Power'}
                ]
                dataSource = lotusOrderList.toJS()
            } else if (name == 'lotusmpoolpending') {
                columns = [
                    {title: 'Message-Version',dataIndex: 'Message-Version',key: 'Message-Version'},
                    {title: 'Message-To',dataIndex: 'Message-To',key: 'Message-To'},
                    {title: 'Message-From',dataIndex: 'Message-From',key: 'Message-From'},
                    {title: 'Message-Nonce',dataIndex: 'Message-Nonce',key: 'Message-Nonce'},
                    {title: 'Message-Value',dataIndex: 'Message-Value',key: 'Message-Value'},
                    {title: 'Message-GasLimit',dataIndex: 'Message-GasLimit',key: 'Message-GasLimit'},
                    {title: 'Message-GasFeeCap',dataIndex: 'Message-GasFeeCap',key: 'Message-GasFeeCap'},
                    {title: 'Message-GasPremium',dataIndex: 'Message-GasPremium',key: 'Message-GasPremium'},
                    {title: 'Message-Method',dataIndex: 'Message-Method',key: 'Message-Method'},
                    {title: 'Message-Params',dataIndex: 'Message-Params',key: 'Message-Params'},
                    {title: 'Signature-Type',dataIndex: 'Signature-Type',key: 'Signature-Type'},
                    {title: 'Signature-Data',dataIndex: 'Signature-Data',key: 'Signature-Data'}
                ]
                dataSource = lotusOrderList.toJS()
            } else if (name == 'lotusclientlist-deals') {
                columns = [
                    {title: 'Created',dataIndex: 'Created',key: 'Created'},
                    {title: 'DealCid',dataIndex: 'DealCid',key: 'DealCid'},
                    {title: 'DealId',dataIndex: 'DealId',key: 'DealId'},
                    {title: 'Provider',dataIndex: 'Provider',key: 'Provider'},
                    {title: 'State',dataIndex: 'State',key: 'State'},
                    {title: 'OnChain',dataIndex: 'OnChain',key: 'OnChain'},
                    {title: 'Slashed',dataIndex: 'Slashed',key: 'Slashed'},
                    {title: 'PieceCID',dataIndex: 'PieceCID',key: 'PieceCID'},
                    {title: 'Size',dataIndex: 'Size',key: 'Size'},
                    {title: 'Price',dataIndex: 'Price',key: 'Price'},
                    {title: 'Duration',dataIndex: 'Duration',key: 'Duration'},
                    {title: 'Verified',dataIndex: 'Verified',key: 'Verified'},
                    {title: 'Message',dataIndex: 'Message',key: 'Message'}
                ]
                dataSource = lotusOrderList.toJS()
            } else if (name == 'lotusstatelist-actors') {
                columns = [
                    {title: 'Address',dataIndex: 'address',key: 'address'}
                ]
                dataSource = lotusOrderList.toJS()
            } else if (name == 'lotusstateactive-sectors') {
                columns = [
                    {title: 'OrderNumber',dataIndex: 'OrderNumber',key: 'OrderNumber'}
                ]
                dataSource = lotusOrderList.toJS()
                console.log('::::::::--------', lotusOrderList.toJS())
            }
        }
        if (lotusOrderList.toJS().length == 0 && modalType != '') {
            if (modalType == 'gas-perf') {
                columns = [
                    {title: 'Address',dataIndex: 'Address',key: 'Address'},
                    {title: 'Height',dataIndex: 'Height',key: 'Height'},
                    {title: 'orderNumber',dataIndex: 'orderNumber',key: 'orderNumber'},
                    {title: 'Number',dataIndex: 'Number',key: 'Number'}
                ]
                dataSource = [
                    {Address: 'asdafeadsfqwegdsfgsf',Height: '123134',orderNumber: '1342412',Number: 'sgsdffwee'},
                    {Address: 'asdafeadsfqwegdsfgsf',Height: '123134',orderNumber: '1342412',Number: 'sgsdffwee'},
                    {Address: 'asdafeadsfqwegdsfgsf',Height: '123134',orderNumber: '1342412',Number: 'sgsdffwee'}
                ]
            } else if (modalType == 'power') {
                columns = [
                    {title: 'Power',dataIndex: 'Power',key: 'Power'}
                ]
                dataSource = [
                    {Power: 'asdafeadsfqwegdsfgsf'}
                ]
            } else if (modalType == 'pending') {
                columns = [
                    {title: 'Message-Version',dataIndex: 'MessageVersion',key: 'MessageVersion'},
                    {title: 'Message-To',dataIndex: 'MessageTo',key: 'MessageTo'},
                    {title: 'Message-From',dataIndex: 'MessageFrom',key: 'MessageFrom'},
                    {title: 'Message-Nonce',dataIndex: 'MessageNonce',key: 'MessageNonce'},
                    {title: 'Message-Value',dataIndex: 'MessageValue',key: 'MessageValue'},
                    {title: 'Message-GasLimit',dataIndex: 'MessageGasLimit',key: 'MessageGasLimit'},
                    {title: 'Message-GasFeeCap',dataIndex: 'MessageGasFeeCap',key: 'MessageGasFeeCap'},
                    {title: 'Message-GasPremium',dataIndex: 'MessageGasPremium',key: 'MessageGasPremium'},
                    {title: 'Message-Method',dataIndex: 'MessageMethod',key: 'MessageMethod'},
                    {title: 'Message-Params',dataIndex: 'MessageParams',key: 'MessageParams'},
                    {title: 'Signature-Type',dataIndex: 'SignatureType',key: 'SignatureType'},
                    {title: 'Signature-Data',dataIndex: 'SignatureData',key: 'SignatureData'}
                ]
                dataSource = [
                    {MessageVersion: 'asdafeadsfqwegdsfgsf',MessageTo: '123134',MessageFrom: '1342412',MessageNonce: 'sgsdffwee',MessageValue: 'qareaf',MessageGasLimit: 'afdsfsdgfds',MessageGasFeeCap: 'aSgdhgthr',MessageGasPremium: 'agdehtrfh',MessageMethod: 'dhrshszh',MessageParams: 'azdfergtrhyt',SignatureType: 'zadgfewsgreh',SignatureData: 'afrgterhsdfw'},
                    {MessageVersion: 'asdafeadsfqwegdsfgsf',MessageTo: '123134',MessageFrom: '1342412',MessageNonce: 'sgsdffwee',MessageValue: 'qareaf',MessageGasLimit: 'afdsfsdgfds',MessageGasFeeCap: 'aSgdhgthr',MessageGasPremium: 'agdehtrfh',MessageMethod: 'dhrshszh',MessageParams: 'azdfergtrhyt',SignatureType: 'zadgfewsgreh',SignatureData: 'afrgterhsdfw'},
                    {MessageVersion: 'asdafeadsfqwegdsfgsf',MessageTo: '123134',MessageFrom: '1342412',MessageNonce: 'sgsdffwee',MessageValue: 'qareaf',MessageGasLimit: 'afdsfsdgfds',MessageGasFeeCap: 'aSgdhgthr',MessageGasPremium: 'agdehtrfh',MessageMethod: 'dhrshszh',MessageParams: 'azdfergtrhyt',SignatureType: 'zadgfewsgreh',SignatureData: 'afrgterhsdfw'}
                ]
            } else if (modalType == 'list-deals') {
                columns = [
                    {title: 'Created',dataIndex: 'Created',key: 'Created'},
                    {title: 'DealCid',dataIndex: 'DealCid',key: 'DealCid'},
                    {title: 'DealId',dataIndex: 'DealId',key: 'DealId'},
                    {title: 'Provider',dataIndex: 'Provider',key: 'Provider'},
                    {title: 'State',dataIndex: 'State',key: 'State'},
                    {title: 'OnChain',dataIndex: 'OnChain',key: 'OnChain'},
                    {title: 'Slashed',dataIndex: 'Slashed',key: 'Slashed'},
                    {title: 'PieceCID',dataIndex: 'PieceCID',key: 'PieceCID'},
                    {title: 'Size',dataIndex: 'Size',key: 'Size'},
                    {title: 'Price',dataIndex: 'Price',key: 'Price'},
                    {title: 'Duration',dataIndex: 'Duration',key: 'Duration'},
                    {title: 'Verified',dataIndex: 'Verified',key: 'Verified'},
                    {title: 'Message',dataIndex: 'Message',key: 'Message'}
                ]
                dataSource = [
                    {Created: 'asdafeadsfqwegdsfgsf',DealCid: '123134',DealId: '1342412',Provider: 'sgsdffwee',State: 'qareaf',OnChain: 'afdsfsdgfds',Slashed: 'aSgdhgthr',PieceCID: 'agdehtrfh',Size: 'dhrshszh',Price: 'azdfergtrhyt',Duration: 'zadgfewsgreh',Verified: 'afrgterhsdfw',Message: 'afrewgrht'},
                    {Created: 'asdafeadsfqwegdsfgsf',DealCid: '123134',DealId: '1342412',Provider: 'sgsdffwee',State: 'qareaf',OnChain: 'afdsfsdgfds',Slashed: 'aSgdhgthr',PieceCID: 'agdehtrfh',Size: 'dhrshszh',Price: 'azdfergtrhyt',Duration: 'zadgfewsgreh',Verified: 'afrgterhsdfw',Message: 'afrewgrht'},
                    {Created: 'asdafeadsfqwegdsfgsf',DealCid: '123134',DealId: '1342412',Provider: 'sgsdffwee',State: 'qareaf',OnChain: 'afdsfsdgfds',Slashed: 'aSgdhgthr',PieceCID: 'agdehtrfh',Size: 'dhrshszh',Price: 'azdfergtrhyt',Duration: 'zadgfewsgreh',Verified: 'afrgterhsdfw',Message: 'afrewgrht'}
                ]
            } else if (modalType == 'list-actors') {
                columns = [
                    {title: 'Address',dataIndex: 'address',key: 'address'}
                ]
                dataSource = [
                    {address: 'asdafeadsfqwegdsfgsf'}
                ]
            } else if (modalType == 'active-sectors') {
                columns = [
                    {title: 'OrderNumber',dataIndex: 'OrderNumber',key: 'OrderNumber'}
                ]
                dataSource = [
                    {OrderNumber: 'hyfrdzhteshftrhyhtrj'}
                ]
            }
        }

        return (
            <div>
                <Layout>
                    <Breadcrumb style={{ margin: '16px 0', textAlign: 'left', fontSize: '20px' }}>
                        <Breadcrumb.Item>lotus命令</Breadcrumb.Item>
                    </Breadcrumb>
                    <div>
                        <Tabs defaultActiveKey="1" onChange={this.handleCallback}>
                            <TabPane tab="lotus wallet" key="1">
                                <Button type="primary" onClick={() => this.handleServerBtn("list")}>list</Button>
                            </TabPane>

                            <TabPane tab="lotus client" key="2">
                                {/*<Button type="primary" onClick={() => this.handleServerBtn("query-ask")}>query-ask</Button>*/}
                                {/*<Divider type="vertical" />*/}
                                <Button type="primary" onClick={() => this.handleServerBtn("list-deals")}>list-deals</Button>
                            </TabPane>

                            <TabPane tab="lotus mpool" key="3">
                                <Button type="primary" onClick={() => this.handleServerBtn("pending")}>pending</Button>
                                <Divider type="vertical" />
                                <Button type="primary" onClick={() => this.handleServerBtn("fird")}>fird</Button>
                                <Divider type="vertical" />
                                <Button type="primary" onClick={() => this.handleServerBtn("config")}>config</Button>
                                <Divider type="vertical" />
                                <Button type="primary" onClick={() => this.handleServerBtn("gas-perf")}>gas-perf</Button>
                            </TabPane>

                            <TabPane tab="lotus state" key="4">
                                <Button type="primary" onClick={() => this.handleServerBtn("power")}>power</Button>
                                <Divider type="vertical" />
                                <Button type="primary" onClick={() => this.handleServerBtn("active-sectors")}>active-sectors</Button>
                                <Divider type="vertical" />
                                <Button type="primary" onClick={() => this.handleServerBtn("list-actors")}>list-actors</Button>
                                <Divider type="vertical" />
                                <Button type="primary" onClick={() => this.handleServerBtn("list-miners")}>list-miners</Button>
                                <Divider type="vertical" />
                                <Button type="primary" onClick={() => this.handleServerBtn("get-actr")}>get-actr</Button>
                                <Divider type="vertical" />
                                <Button type="primary" onClick={() => this.handleServerBtn("miner-info")}>miner-info</Button>
                                <Divider type="vertical" />
                                <Button type="primary" onClick={() => this.handleServerBtn("sector")}>sector</Button>
                                <Divider type="vertical" />
                                <Button type="primary" onClick={() => this.handleServerBtn("read-state")}>read-state</Button>
                            </TabPane>

                            <TabPane tab="lotus chain" key="5">
                                <Button type="primary" onClick={() => this.handleServerBtn("getblock")}>getblock</Button>
                                <Divider type="vertical" />
                                <Button type="primary" onClick={() => this.handleServerBtn("getmessage")}>getmessage</Button>
                                <Divider type="vertical" />
                                <Button type="primary" onClick={() => this.handleServerBtn("gas-price")}>gas-price</Button>
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
                        style={{marginTop: '30px'}}
                    />
                </Layout>
            </div>
        )
    }
}
// 接收方
const mapStateToProps = (state) => ({
    // 获取属于home页面 store中的所有数据
    isLoading: state.get('home').get('isLoading'),
    name: state.get('home').get('name'),
    lotusOrderList: state.get('home').get('lotusOrderList')
})
// 发送方
const mapDispatchToProps = (dispatch) => ({
    handleLotusOrders: (options) => {
        dispatch(actionCreator.handleLotusOrdersAction(options))
    }

})

export default connect(mapStateToProps, mapDispatchToProps)(Home)
