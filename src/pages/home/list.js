// lotus命令页面
import React, { Component } from 'react'
import { connect } from 'react-redux'
import Layout from 'common/layout/index.js'
import { Breadcrumb, Table, Divider, Button, Modal, Tabs, Input, notification } from 'antd';
import "./index.css"
import { actionCreator } from './store'
import { Chart, Geom, Axis, Tooltip, Legend } from "bizcharts";

const { TabPane } = Tabs;
const { Search } = Input;



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
            sectorNumber: ''
        }

        this.handleServerBtn = this.handleServerBtn.bind(this)
        this.handleCancel = this.handleCancel.bind(this)
        this.handleCallback = this.handleCallback.bind(this)
        this.handleSearchBtn = this.handleSearchBtn.bind(this)
        this.handleSubmitSearch = this.handleSubmitSearch.bind(this)
        this.addressChange = this.addressChange.bind(this)
        this.numberChange = this.numberChange.bind(this)
    }
    componentDidMount () {

    }



    // ------------------------------------
    handleServerBtn(type) { // 所有按钮的点击事件
        let options = {
            name: ''
        }

        switch (type) {
            case 'list':
                options.name = 'lotuswalletlist'
                this.setState({isShowSearch: false, isShowSectorBtn: false})
                break
            case 'query-ask':
                options.name = 'lotusclientqueryask'
                this.setState({isShowSearch: false, isShowSectorBtn: false})
                break
            case 'list-deals':
                options.name = 'lotusclientlistdeals'
                this.setState({isShowSearch: false, isShowSectorBtn: false})
                break
            case 'pending':
                options.name = 'lotusmpoolpending'
                this.setState({isShowSearch: false, isShowSectorBtn: false})
                break
            case 'find':
                options.name = 'lotusmpoolfind'
                this.setState({isShowSearch: false, isShowSectorBtn: false})
                break
            case 'config':
                options.name = 'lotusmpoolconfig'
                this.setState({isShowSearch: false, isShowSectorBtn: false})
                break
            case 'gas-perf':
                options.name = 'lotusmpoolgasperf'
                this.setState({isShowSearch: false, isShowSectorBtn: false})
                break
            case 'power':
                options.name = 'lotusstatepower'
                this.setState({isShowSearch: false, isShowSectorBtn: false})
                break
            case 'active-sectors':
                options.name = 'lotusstateactivesectors'
                this.setState({isShowSearch: false, isShowSectorBtn: false})
                break
            case 'list-actors':
                options.name = 'lotusstatelistactors'
                this.setState({modalOrder: 'lotusstatelistactors', isShowSearch: true, isShowSectorBtn: false})
                break
            case 'list-miners':
                options.name = 'lotusstatelistminers'
                this.setState({modalOrder: 'lotusstatelistminers', isShowSearch: true, isShowSectorBtn: true})
                break
            case 'get-actor':
                options.name = 'lotusstategetactor'
                this.setState({isShowSearch: false, isShowSectorBtn: false})
                break
            case 'miner-info':
                options.name = 'lotusstateminerinfo'
                this.setState({isShowSearch: false, isShowSectorBtn: false})
                break
            case 'sector':
                options.name = 'lotusstatesector'
                this.setState({modalOrder: 'lotusstatesector', visible: true})
                return false
            case 'read-state':
                options.name = 'lotusstatereadstate'
                this.setState({modalOrder: 'lotusstatereadstate', isShowSearch: true, isShowSectorBtn: false})
                break
            case 'getblock':
                console.log('12312------')
                options.name = 'lotuschaingetblock'
                this.setState({modalOrder: 'lotuschaingetblock', isShowSearch: true, isShowSectorBtn: false})
                break
            case 'getmessage':
                options.name = 'lotuschaingetmessage'
                this.setState({isShowSearch: false, isShowSectorBtn: false})
                break
            case 'gas-price':
                options.name = 'lotuschaingasprice'
                this.setState({isShowSearch: false, isShowSectorBtn: false})
                break
        }

        // 调用发送方函数, 处理lotus命令
        this.props.handleLotusOrders(options)
        setInterval(() => { // 十分钟刷新一次数据
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
        this.setState({isShowSearch: false, isShowSectorBtn: false})
    }
    handleSearchBtn(val) { // 处理搜索
        const { modalOrder } = this.state
        if (val == '') {
            notification['warning']({
                message: '搜索框不能为空 !'
            })
            return false
        }
        let options = {
            name: modalOrder,
            info: val,
            num: ''
        }

        if (modalOrder == 'lotuschaingetblock') {
            this.props.history.push({ pathname: "/home/homeSearch", state: { cid: val } });
        } else {
            console.log('options---------', options)
            // 调用发送方函数, 处理搜索
            this.props.handleSearch(options)
        }

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
            console.log('sectorAddress----------', sectorAddress)
            console.log('sectorNumber----------', sectorNumber)
            console.log('modalOrder----------', modalOrder)
            let options = {
                name: modalOrder,
                info: sectorAddress,
                num: sectorNumber
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
        let { name, type, lotusOrderList } = this.props
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
                    {title: 'Address',dataIndex: 'Address',key: 'Address'},
                    {title: 'Height',dataIndex: 'Height',key: 'Height'},
                    {title: 'orderNumber',dataIndex: 'orderNumber',key: 'orderNumber'},
                    {title: 'Number',dataIndex: 'Number',key: 'Number'}
                ]
                dataSource = lotusOrderList.toJS()
            } else if (name == 'lotusstatepower') {
                columns = [
                    {title: 'totalPowerQuality', dataIndex: 'total_power_quality', key: 'total_power_quality'}
                ]
                dataSource = lotusOrderList.toJS()
            } else if (name == 'lotusstateactivesectors') {
                columns = [
                    { title: 'SectorNumber', dataIndex: 'sector_number', key: 'sectornumber' },
                    { title: 'SealedCID', dataIndex: 'sealed_cid', key: 'sealedcid' }
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
                    {title: 'Address', dataIndex: 'address', key: 'address'},
                    {title: 'LockedFunds', dataIndex: 'LockedFunds', key: 'LockedFunds', width: '100px'}
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
                    {title: 'SectorNumber',dataIndex: 'SectorNumber',key: 'SectorNumber'},
                    {title: 'SealProof',dataIndex: 'SealProof',key: 'SealProof'},
                    {title: 'SealedCID',dataIndex: 'SealedCID',key: 'SealedCID',width: '200px'},
                    {title: 'DealIDs',dataIndex: 'DealIDs',key: 'DealIDs'},
                    {title: 'Activation',dataIndex: 'Activation',key: 'Activation'},
                    {title: 'Expiration',dataIndex: 'Expiration',key: 'Expiration'},
                    {title: 'DealWeight',dataIndex: 'DealWeight',key: 'DealWeight'},
                    {title: 'VerifiedDealWeight',dataIndex: 'VerifiedDealWeight',key: 'VerifiedDealWeight'},
                    {title: 'InitialPledge',dataIndex: 'InitialPledge',key: 'InitialPledge'},
                    {title: 'ExpectedDayReward',dataIndex: 'ExpectedDayReward',key: 'ExpectedDayReward'},
                    {title: 'ExpectedStoragePledge',dataIndex: 'ExpectedStoragePledge',key: 'ExpectedStoragePledge'},
                    {title: 'Deadline',dataIndex: 'Deadline',key: 'Deadline'},
                    {title: 'Partition',dataIndex: 'Partition',key: 'Partition'}
                ]
                dataSource = lotusOrderList.toJS()
            } else if (name == 'lotuschaingetblock') {
                columns = [
                    {title: 'BlockCid',dataIndex: 'block_cid',key: 'block_cid'}
                ]
                dataSource = lotusOrderList.toJS()
            }
        } else {
            columns = []
            dataSource = []
        }
        /*
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
        */

        const data = [
            {
                month: "2015-01-01",
                acc: 84.0,
                type: '有效算力'
            },
            {
                month: "2015-02-01",
                acc: 14.9,
                type: '有效算力'
            },
            {
                month: "2015-03-01",
                acc: 17.0,
                type: '有效算力'
            },
            {
                month: "2015-04-01",
                acc: 20.2,
                type: '有效算力'
            },
            {
                month: "2015-05-01",
                acc: 55.6,
                type: '有效算力'
            },
            {
                month: "2015-06-01",
                acc: 56.7,
                type: '有效算力'
            },
            {
                month: "2015-07-01",
                acc: 30.6,
                type: '有效算力'
            },
            {
                month: "2015-08-01",
                acc: 63.2,
                type: '有效算力'
            },
            {
                month: "2015-09-01",
                acc: -24.6,
                type: '有效算力'
            },
            {
                month: "2015-10-01",
                acc: 14.0,
                type: '有效算力'
            },
            {
                month: "2015-11-01",
                acc: 9.4,
                type: '有效算力'
            },
            {
                month: "2015-12-01",
                acc: 6.3,
                type: '有效算力'
            }
        ];
        const cols = {
            month: {
                nice: true,
                alias: "月份"
            },
            acc: {
                nice: true,
                alias: "积累量"
            }
        };
        const colors = ["#6394f9", "#62daaa"];

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
                                <div>
                                    <Search
                                        style={{ width: 200 }}
                                        placeholder="input search text"
                                        onSearch={this.handleSearchBtn}
                                    />
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

                    <div style={{marginBottom: '30px'}}>
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
                            <Chart height={400} data={data} scale={cols} forceFit padding={[ 20, 100, 20, 30]}>
                                <Axis
                                    name="month"
                                    title={null}
                                    tickLine={null}
                                    line={{
                                        stroke: "#E6E6E6"
                                    }}
                                />
                                <Axis
                                    name="acc"
                                    line={false}
                                    tickLine={null}
                                    grid={null}
                                    title={null}
                                />
                                <Tooltip />
                                <Legend name="type" />
                                <Geom
                                    type="line"
                                    position="month*acc"
                                    size={1}
                                    color="l (270) 0:rgba(255, 146, 255, 1) .5:rgba(100, 268, 255, 1) 1:rgba(215, 0, 255, 1)"
                                    shape="smooth"
                                    style={{
                                        shadowColor: "l (270) 0:rgba(21, 146, 255, 0)",
                                        shadowBlur: 60,
                                        shadowOffsetY: 6
                                    }}
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
    name: state.get('home').get('name'),
    type: state.get('home').get('type'),
    lotusOrderList: state.get('home').get('lotusOrderList')
})
// 发送方
const mapDispatchToProps = (dispatch) => ({
    handleLotusOrders: (options) => {
        dispatch(actionCreator.handleLotusOrdersAction(options))
    },
    handleSearch: (options) => {
        dispatch(actionCreator.handleSearchAction(options))
    }

})

export default connect(mapStateToProps, mapDispatchToProps)(HomeList)