// lotus命令页面
import React, { Component } from 'react'
import { connect } from 'react-redux'
import Layout from 'common/layout/index.js'
import { Breadcrumb, Table, Divider, Button, Modal, Tabs, Input, notification, message } from 'antd';
import "./index.css"
import { actionCreator } from './store'
import { Chart, Geom, Axis, Tooltip, Legend } from "bizcharts";

const { TabPane } = Tabs;
const { Search } = Input;


let timer = null
class HomeList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: '',
            visible: false,
            modalType: '',
            modalOrder: '',
            isShowSearch: false,
            isSearchShow: false,
            isShowSectorBtn: false,
            sectorAddress: '',
            sectorNumber: '',
            searchVal: '',
            isShowFindBtn: false
        }

        this.handleServerBtn = this.handleServerBtn.bind(this)
        this.handleCancel = this.handleCancel.bind(this)
        this.handleCallback = this.handleCallback.bind(this)
        this.handleSearchBtn = this.handleSearchBtn.bind(this)
        this.handleSubmitSearch = this.handleSubmitSearch.bind(this)
        this.addressChange = this.addressChange.bind(this)
        this.numberChange = this.numberChange.bind(this)
        this.handleSearchFindBtn = this.handleSearchFindBtn.bind(this)
        this.handleFindBtnChange = this.handleFindBtnChange.bind(this)
    }
    componentDidMount () {
        // 调用发送方函数, 处理折线图数据
        this.props.handleEchartsData()
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
                options.name = 'lotuswalletlist'
                this.setState({isShowSearch: false, isShowSectorBtn: false, isShowFindBtn: false})
                break
            /*
            case 'query-ask':
                options.name = 'lotusclientqueryask'
                this.setState({isShowSearch: false, isShowSectorBtn: false, isShowFindBtn: false})
                break
            */
            case 'list-deals':
                options.name = 'lotusclientlistdeals'
                this.setState({isShowSearch: false, isShowSectorBtn: false, isShowFindBtn: false})
                break
            case 'pending':
                options.name = 'lotusmpoolpending'
                this.setState({isShowSearch: false, isShowSectorBtn: false, isShowFindBtn: false})
                break
            case 'find':
                options.name = 'lotusmpoolfind'
                this.setState({modalOrder: 'lotusmpoolfind', isShowSearch: true, isShowSectorBtn: false, isShowFindBtn: true})
                break
            case 'config':
                options.name = 'lotusmpoolconfig'
                this.setState({isShowSearch: false, isShowSectorBtn: false, isShowFindBtn: false})
                break
            case 'gas-perf':
                options.name = 'lotusmpoolgasperf'
                this.setState({isShowSearch: false, isShowSectorBtn: false, isShowFindBtn: false})
                break
            case 'power':
                options.name = 'lotusstatepower'
                this.setState({isShowSearch: false, isShowSectorBtn: false, isShowFindBtn: false})
                break
            case 'active-sectors':
                options.name = 'lotusstateactivesectors'
                this.setState({modalOrder: 'lotusstateactivesectors', isShowSearch: true, isShowSectorBtn: false, isShowFindBtn: false})
                break
            case 'list-actors':
                options.name = 'lotusstatelistactors'
                this.setState({modalOrder: 'lotusstatelistactors', isShowSearch: true, isShowSectorBtn: false, isShowFindBtn: false})
                break
            case 'list-miners':
                options.name = 'lotusstatelistminers'
                this.setState({modalOrder: 'lotusstatelistminers', isShowSearch: true, isShowSectorBtn: true, isShowFindBtn: false})
                break
            case 'get-actor':
                options.name = 'lotusstategetactor'
                this.setState({isShowSearch: false, isShowSectorBtn: false, isShowFindBtn: false})
                break
            case 'miner-info':
                options.name = 'lotusstateminerinfo'
                this.setState({isShowSearch: false, isShowSectorBtn: false, isShowFindBtn: false})
                break
            case 'sector':
                options.name = 'lotusstatesector'
                this.setState({modalOrder: 'lotusstatesector', visible: true, isShowFindBtn: false})
                return false
            case 'read-state':
                options.name = 'lotusstatereadstate'
                this.setState({modalOrder: 'lotusstatereadstate', isShowSearch: true, isShowSectorBtn: false, isShowFindBtn: false})
                break
            case 'getblock':
                options.name = 'lotuschaingetblock'
                this.setState({modalOrder: 'lotuschaingetblock', isShowSearch: true, isShowSectorBtn: false, isShowFindBtn: false})
                break
            case 'getmessage':
                options.name = 'lotuschaingetmessage'
                this.setState({modalOrder: 'lotuschaingetmessage', isShowSearch: true, isShowSectorBtn: false, isShowFindBtn: false})
                break
            case 'gas-price':
                options.name = 'lotuschaingasprice'
                this.setState({modalOrder: 'lotuschaingasprice', isShowSearch: true, isShowSectorBtn: false, isShowFindBtn: false})
                break
        }

        // 调用发送方函数, 处理lotus命令
        this.props.handleLotusOrders(options)
        timer = setInterval(() => { // 十一分钟刷新一次数据
            this.props.handleLotusOrders(options)
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
        // this.setState({isShowSearch: false, isShowSectorBtn: false})
    }
    handleSearchBtn(val) { // 处理搜索
        const { modalOrder } = this.state
        if (modalOrder == 'lotusmpoolfind') {
            notification['warning']({
                message: '请点击搜索框旁的搜索按钮进行搜索'
            })
            return false
        }
        this.setState({searchVal: val})
        let options = {
            name: modalOrder,
            info: val,
            num: '',
            type: ''
        }
        if (val == '') {
            notification['warning']({
                message: '搜索框不能为空 !'
            })
            return false
        } else if (modalOrder == 'lotuschaingetblock') {
            this.props.history.push({ pathname: "/home/homeSearch", state: { info: val, name: modalOrder } });
        } else {
            console.log('options---------', options)
            // 调用发送方函数, 处理搜索
            this.props.handleSearch(options)
        }
    }
    handleSearchFindBtn (type) {
        const { searchVal, modalOrder } = this.state
        if (searchVal == '') {
            notification['warning']({
                message: '搜索框不能为空 !'
            })
            return false
        }
        let options = {
            name: modalOrder,
            info: searchVal,
            num: '',
            type: type
        }
        // 调用发送方函数, 处理搜索find按钮
        this.props.handleSearch(options)
    }
    handleFindBtnChange (e) {
        this.setState({searchVal: e.target.value})
    }
    addressChange (val) {
        this.setState({
            sectorAddress: val.target.value
        })
    }
    numberChange (val) {
        this.setState({
            sectorNumber: val.target.value
        })
    }
    handleSubmitSearch () {
        const { sectorAddress, sectorNumber, modalOrder } = this.state
        if (sectorAddress == '') {
            notification['warning']({
                message: 'miner address 不能为空 !'
            })
            return false
        } else if (sectorNumber == '') {
            notification['warning']({
                message: 'sector number 不能为空 !'
            })
            return false
        } else {
            // 调用发送方函数, 处理搜索sector
            let options = {
                name: modalOrder,
                info: sectorAddress,
                num: sectorNumber,
                type: ''
            }
            this.props.handleSearch(options)
        }
        this.setState({
            visible: false
        })
    }
    // -----------------------------------


    render() {
        let dataSource = [];
        let columns = [];
        let echartsData = []
        let { name, type, findType, lotusOrderList, echartsDataList } = this.props
        let { modalType } = this.state
        if (lotusOrderList.toJS().length > 0) {
            if (name == 'lotuswalletlist') {
                columns = [
                    {title: 'Address',dataIndex: 'address',key: 'address'},
                    {title: 'Balance',dataIndex: 'balance',key: 'balance'},
                    {title: 'Nonce',dataIndex: 'nonce',key: 'nonce'}
                ]
                dataSource = lotusOrderList.toJS()
            } else if (name == 'lotusclientlistdeals') {
                columns = [
                    {title: 'DealId',dataIndex: 'deal_id',key: 'deal_id', width: '100px'},
                    {title: 'Duration',dataIndex: 'duration',key: 'duration', width: '100px'},
                    {title: 'OnChain',dataIndex: 'on_chain',key: 'on_chain', width: '100px'},
                    {title: 'PieceCid',dataIndex: 'piece_cid',key: 'piece_cid', width: '100px'},
                    {title: 'Price',dataIndex: 'price',key: 'price', width: '100px'},
                    {title: 'ProposalCid',dataIndex: 'proposal_cid',key: 'proposal_cid', width: '100px'},
                    {title: 'Provider',dataIndex: 'provider',key: 'provider', width: '100px'},
                    {title: 'Size',dataIndex: 'size',key: 'size', width: '100px'},
                    {title: 'Slashed',dataIndex: 'slashed',key: 'slashed', width: '100px'},
                    {title: 'State',dataIndex: 'state',key: 'state', width: '100px'},
                    {title: 'Verified',dataIndex: 'verified',key: 'verified', width: '100px'}
                ]
                dataSource = lotusOrderList.toJS()
            } else if (name == 'lotusmpoolpending') {
                columns = [
                    {title: 'Id',dataIndex: 'id',key: 'id',width: '100px'},
                    {title: 'CId',dataIndex: 'Cid',key: 'Cid',width: '100px'},
                    {title: 'Version',dataIndex: 'version',key: 'version',width: '100px'},
                    {title: 'ToAddress',dataIndex: 'to_address',key: 'to_address',width: '100px'},
                    {title: 'FromAddress',dataIndex: 'from_address',key: 'from_address',width: '100px'},
                    {title: 'Nonce',dataIndex: 'nonce',key: 'nonce',width: '100px'},
                    {title: 'Value',dataIndex: 'value',key: 'value',width: '100px'},
                    {title: 'GasLimit',dataIndex: 'gas_limit',key: 'gas_limit',width: '100px'},
                    {title: 'GasFeeCap',dataIndex: 'gas_fee_cap',key: 'gas_fee_cap',width: '100px'},
                    {title: 'GasPremium',dataIndex: 'gas_premium',key: 'gas_premium',width: '100px'},
                    {title: 'Method',dataIndex: 'method',key: 'method',width: '100px'},
                    {title: 'Params',dataIndex: 'params',key: 'params',width: '100px'},
                    {title: 'Type',dataIndex: 'type',key: 'type',width: '100px'},
                    {title: 'Data',dataIndex: 'data',key: 'data',width: '100px'}
                ]
                dataSource = lotusOrderList.toJS()
            } else if (name == 'lotusmpoolfind' && !type) {
                columns = [
                    {title: 'From',dataIndex: 'From',key: 'From'},
                    {title: 'Method',dataIndex: 'Method',key: 'Method'},
                    {title: 'To',dataIndex: 'To',key: 'To'}
                ]
                dataSource = lotusOrderList.toJS()
            } else if (name == 'lotusmpoolfind' && type) {
                columns = [
                    {title: 'Id',dataIndex: 'id',key: 'id',width: '100px'},
                    {title: 'CId',dataIndex: 'Cid',key: 'Cid',width: '100px'},
                    {title: 'Version',dataIndex: 'version',key: 'version',width: '100px'},
                    {title: 'ToAddress',dataIndex: 'to_address',key: 'to_address',width: '100px'},
                    {title: 'FromAddress',dataIndex: 'from_address',key: 'from_address',width: '100px'},
                    {title: 'Nonce',dataIndex: 'nonce',key: 'nonce',width: '100px'},
                    {title: 'Value',dataIndex: 'value',key: 'value',width: '100px'},
                    {title: 'GasLimit',dataIndex: 'gas_limit',key: 'gas_limit',width: '100px'},
                    {title: 'GasFeeCap',dataIndex: 'gas_fee_cap',key: 'gas_fee_cap',width: '100px'},
                    {title: 'GasPremium',dataIndex: 'gas_premium',key: 'gas_premium',width: '100px'},
                    {title: 'Method',dataIndex: 'method',key: 'method',width: '100px'},
                    {title: 'Params',dataIndex: 'params',key: 'params',width: '100px'},
                    {title: 'Type',dataIndex: 'type',key: 'type',width: '100px'},
                    {title: 'Data',dataIndex: 'data',key: 'data',width: '100px'}
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
            } else if (name == 'lotusmpoolgasperf') {
                columns = [
                    {title: 'MessageFrom',dataIndex: 'MessageFrom',key: 'MessageFrom'},
                    {title: 'MessageNonce',dataIndex: 'MessageNonce',key: 'MessageNonce'},
                    {title: 'GasReward',dataIndex: 'GasReward',key: 'GasReward'},
                    {title: 'GasPerf',dataIndex: 'GasPerf',key: 'GasPerf'}
                ]
                dataSource = lotusOrderList.toJS()
            } else if (name == 'lotusstatepower') {
                columns = [
                    {title: 'totalPowerQuality', dataIndex: 'total_power_quality', key: 'total_power_quality'}
                ]
                dataSource = lotusOrderList.toJS()
            } else if (name == 'lotusstateactivesectors' && !type) {
                columns = [
                    { title: 'Address', dataIndex: 'address', key: 'address' }
                ]
                dataSource = lotusOrderList.toJS()
            } else if (name == 'lotusstateactivesectors' && type) {
                columns = [
                    { title: 'SealedCid', dataIndex: 'sealed_cid', key: 'sealed_cid' },
                    { title: 'SectorNumber', dataIndex: 'sector_number', key: 'sector_number' }
                ]
                dataSource = lotusOrderList.toJS()
            } else if (name == 'lotusstatelistactors' && !type) {
                columns = [
                    {title: 'Address',dataIndex: 'address',key: 'address'}
                ]
                dataSource = lotusOrderList.toJS()
            } else if (name == 'lotusstatelistactors' && type) {
                columns = [
                    {title: 'Address',dataIndex: 'Address',key: 'Address'},
                    {title: 'Balance',dataIndex: 'Balance',key: 'Balance'},
                    {title: 'Nonce',dataIndex: 'Nonce',key: 'Nonce'},
                    {title: 'Code',dataIndex: 'Code',key: 'Code'},
                    {title: 'Head',dataIndex: 'Head',key: 'Head'}
                ]
                dataSource = lotusOrderList.toJS()
            } else if (name == 'lotusstatereadstate' && !type) {
                columns = [
                    {title: 'Address',dataIndex: 'address',key: 'address'}
                ]
                dataSource = lotusOrderList.toJS()
            } else if (name == 'lotusstatereadstate' && type) {
                columns = [
                    {title: 'AllocatedSectors', dataIndex: 'AllocatedSectors', key: 'AllocatedSectors', width: '100px'},
                    {title: 'CurrentDeadline', dataIndex: 'CurrentDeadline', key: 'CurrentDeadline', width: '100px'},
                    {title: 'Deadlines', dataIndex: 'Deadlines', key: 'Deadlines', width: '100px'},
                    {title: 'EarlyTerminations', dataIndex: 'EarlyTerminations', key: 'EarlyTerminations', width: '100px'},
                    {title: 'FeeDebt', dataIndex: 'FeeDebt', key: 'FeeDebt', width: '100px'},
                    {title: 'Info', dataIndex: 'Info', key: 'Info', width: '100px'},
                    {title: 'InitialPledge', dataIndex: 'InitialPledge', key: 'InitialPledge', width: '100px'},
                    {title: 'LockedFunds', dataIndex: 'LockedFunds', key: 'LockedFunds', width: '100px'},
                    {title: 'PreCommitDeposits', dataIndex: 'PreCommitDeposits', key: 'PreCommitDeposits', width: '100px'},
                    {title: 'PreCommittedSectors', dataIndex: 'PreCommittedSectors', key: 'PreCommittedSectors', width: '100px'},
                    {title: 'PreCommittedSectorExpiry', dataIndex: 'PreCommittedSectorExpiry', key: 'PreCommittedSectorExpiry', width: '100px'},
                    {title: 'ProvingPeriodStart', dataIndex: 'ProvingPeriodStart', key: 'ProvingPeriodStart', width: '100px'},
                    {title: 'Sectors', dataIndex: 'Sectors', key: 'Sectors', width: '100px'},
                    {title: 'VestingFunds', dataIndex: 'VestingFunds', key: 'VestingFunds', width: '100px'}
                ]
                dataSource = lotusOrderList.toJS()
            } else if (name == 'lotusstatelistminers' && !type) {
                columns = [
                    {title: 'Address', dataIndex: 'address', key: 'address'}
                ]
                dataSource = lotusOrderList.toJS()
            } else if (name == 'lotusstatelistminers' && type) {
                columns = [
                    {title: 'ActualPower', dataIndex: 'ActualPower', key: 'ActualPower'},
                    {title: 'AvailableBalance', dataIndex: 'AvailableBalance', key: 'AvailableBalance'},
                    {title: 'BytePower', dataIndex: 'BytePower', key: 'BytePower'},
                    {title: 'ConsensusFaultEnd', dataIndex: 'ConsensusFaultEnd', key: 'ConsensusFaultEnd'},
                    {title: 'Control', dataIndex: 'Control', key: 'Control'},
                    {title: 'Multiaddrs', dataIndex: 'Multiaddrs', key: 'Multiaddrs'},
                    {title: 'Owner', dataIndex: 'Owner', key: 'Owner'},
                    {title: 'PeerId', dataIndex: 'PeerId', key: 'PeerId'},
                    {title: 'SectorSize', dataIndex: 'SectorSize', key: 'SectorSize'},
                    {title: 'Worker', dataIndex: 'Worker', key: 'Worker'}
                ]
                dataSource = lotusOrderList.toJS()
            } else if (name == 'lotusstatesector') {
                columns = [
                    {title: 'SectorNumber',dataIndex: 'SectorNumber',key: 'SectorNumber',width: '100px'},
                    {title: 'SealProof',dataIndex: 'SealProof',key: 'SealProof',width: '100px'},
                    {title: 'SealedCID',dataIndex: 'SealedCID',key: 'SealedCID',width: '100px'},
                    {title: 'DealIDs',dataIndex: 'DealIDs',key: 'DealIDs',width: '100px'},
                    {title: 'Activation',dataIndex: 'Activation',key: 'Activation',width: '100px'},
                    {title: 'Expiration',dataIndex: 'Expiration',key: 'Expiration',width: '100px'},
                    {title: 'DealWeight',dataIndex: 'DealWeight',key: 'DealWeight',width: '100px'},
                    {title: 'VerifiedDealWeight',dataIndex: 'VerifiedDealWeight',key: 'VerifiedDealWeight',width: '100px'},
                    {title: 'InitialPledge',dataIndex: 'InitialPledge',key: 'InitialPledge',width: '100px'},
                    {title: 'ExpectedDayReward',dataIndex: 'ExpectedDayReward',key: 'ExpectedDayReward',width: '100px'},
                    {title: 'ExpectedStoragePledge',dataIndex: 'ExpectedStoragePledge',key: 'ExpectedStoragePledge',width: '100px'},
                    {title: 'Deadline',dataIndex: 'Deadline',key: 'Deadline',width: '100px'},
                    {title: 'Partition',dataIndex: 'Partition',key: 'Partition',width: '100px'}
                ]
                dataSource = lotusOrderList.toJS()
            } else if (name == 'lotuschaingetblock') {
                columns = [
                    {title: 'BlockCid',dataIndex: 'block_cid',key: 'block_cid'}
                ]
                dataSource = lotusOrderList.toJS()
            } else if (name == 'lotuschaingetmessage' && !type) {
                columns = [
                    {title: 'MessageCid',dataIndex: 'MessageCid',key: 'MessageCid'}
                ]
                dataSource = lotusOrderList.toJS()
            } else if (name == 'lotuschaingetmessage' && type) {
                columns = [
                    {title: 'Cid',dataIndex: 'cid',key: 'cid',width: '100px'},
                    {title: 'FromAddress',dataIndex: 'from_address',key: 'from_address',width: '100px'},
                    {title: 'GasFeeCap',dataIndex: 'gas_fee_cap',key: 'gas_fee_cap',width: '100px'},
                    {title: 'GasLimit',dataIndex: 'gas_limit',key: 'gas_limit',width: '100px'},
                    {title: 'GasPremium',dataIndex: 'gas_premium',key: 'gas_premium',width: '100px'},
                    {title: 'Id',dataIndex: 'id',key: 'id',width: '100px'},
                    {title: 'Method',dataIndex: 'method',key: 'method',width: '100px'},
                    {title: 'Nonce',dataIndex: 'nonce',key: 'nonce',width: '100px'},
                    {title: 'Params',dataIndex: 'params',key: 'params',width: '300px'}, // ellipsis: true
                    {title: 'ToAddress',dataIndex: 'to_address',key: 'to_address',width: '100px'},
                    {title: 'Value',dataIndex: 'value',key: 'value',width: '100px'},
                    {title: 'Version',dataIndex: 'version',key: 'version',width: '100px'}
                ]
                dataSource = lotusOrderList.toJS()
            } else if (name == 'lotuschaingasprice' && !type) {
                columns = [
                    {title: 'Address',dataIndex: 'address',key: 'address'}
                ]
                dataSource = lotusOrderList.toJS()
            } else if (name == 'lotuschaingasprice' && type) {
                columns = [
                    {title: 'BlockName',dataIndex: 'BlockName',key: 'BlockName'},
                    {title: 'ChainGasPrice',dataIndex: 'ChainGasPrice',key: 'ChainGasPrice'}
                ]
                dataSource = lotusOrderList.toJS()
            }
        } else {
            columns = []
            dataSource = []
        }
        if (echartsDataList.toJS().length > 0) {
            echartsData = echartsDataList.toJS();
            console.log('echartsDataList------------', echartsDataList.toJS());
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
        };

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
                                <Button type="primary" onClick={() => this.handleServerBtn("find")}>find</Button>
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
                                <Button type="primary" onClick={() => this.handleServerBtn("read-state")}>read-state</Button>
                                <Divider type="vertical" />
                                <Button type="primary" onClick={() => this.handleServerBtn("list-miners")}>list-miners</Button>
                                {
                                    /*
                                    <Button type="primary" onClick={() => this.handleServerBtn("get-actor")}>get-actor</Button>
                                    <Divider type="vertical" />
                                    <Button type="primary" onClick={() => this.handleServerBtn("miner-info")}>miner-info</Button>
                                    <Divider type="vertical" />
                                    */
                                }
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
                                    {
                                        this.state.isShowFindBtn && (
                                            <div>
                                                <Button type="primary" onClick={() => this.handleSearchFindBtn("From")}>搜索 From</Button>
                                                <Divider type="vertical" />
                                                <Button type="primary" onClick={() => this.handleSearchFindBtn("Method")}>搜索 Method</Button>
                                                <Divider type="vertical" />
                                                <Button type="primary" onClick={() => this.handleSearchFindBtn("To")}>搜索 To</Button>
                                            </div>
                                        )
                                    }
                                </div>
                                {
                                    this.state.isShowSectorBtn && (
                                        <div>
                                            <Button type="primary" onClick={() => this.handleServerBtn("sector")}>搜索 sector</Button>
                                        </div>
                                    )
                                }
                            </div>
                        )
                    }
                    <div className="content" style={{marginBottom: '30px', width: '100%'}}>
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
                            style={{marginTop: '15px'}}
                        />
                    </div>
                    {
                        <div style={{width: '100%'}}>
                            <Chart height={400} data={echartsData} scale={cols} forceFit padding={[ 20, 100, 20, 100 ]}>
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
                    }
                    <Modal
                        title="搜索 sector"
                        visible={this.state.visible}
                        onOk={this.handleSubmitSearch}
                        onCancel={this.handleCancel}
                    >
                        <Input style={{marginBottom: '15px'}} placeholder="miner address" onChange={this.addressChange} />
                        <Input placeholder="sector number" onChange={this.numberChange} />
                    </Modal>
                </Layout>
            </div>
        )
    }
}
// 接收方
const mapStateToProps = (state) => ({
    // 获取属于home页面 store中的所有数据
    isLoading: state.get('home').get('isLoading'),
    echartsDataList: state.get('home').get('echartsDataList'),
    name: state.get('home').get('name'),
    type: state.get('home').get('type'),
    findType: state.get('home').get('findType'),
    lotusOrderList: state.get('home').get('lotusOrderList')
})
// 发送方
const mapDispatchToProps = (dispatch) => ({
    handleLotusOrders: (options) => {
        dispatch(actionCreator.handleLotusOrdersAction(options))
    },
    handleSearch: (options) => {
        dispatch(actionCreator.handleSearchAction(options))
    },
    handleEchartsData: () => {
        dispatch(actionCreator.handleEchartsDataAction())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(HomeList)
