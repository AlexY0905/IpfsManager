import * as types from './actionTypes.js';
import { fromJS } from 'immutable';


const defaultState = fromJS({
    isLoading: false,
    overviewEchartsDataList: [],
    accountBalance: '',
    accountLineData: [],
    accountLineCompany: '',
    powerEchartsOneData: [],
    powerEchartsDataList: [],
    powerLineCompany: '',
    powerEchartsCompany: '',
    overviewPowerData: '',
    miningCountsData: '',
    newListData: [],
    newListSelectData: [],
    totalCount: '',
    accountOverviewData: '',
    nodeDetailMsgData: '',
    accountDetailData: '',
    blockHeightDataList: '',
    msgIdDetailMsgData: '',
    msgIdDetailAccountData: [],
    msgIdDetailOthersData: '',
    blockIdDetailData: ''
})

export default (state = defaultState, action) => {
    // 处理开始loading状态
    if (action.type == types.ISLOADING_START) {
        return state.merge({
            isLoading: true
        })
    }
    // 处理结束loading状态
    if (action.type == types.ISLOADING_END) {
        return state.merge({
            isLoading: false
        })
    }
    // 处理矿工概览饼形图数据
    if (action.type == types.GET_OVERVIEWCHARTSDATA) {
        return state.merge({
            accountBalance: action.payload.accountBalance,
            overviewEchartsDataList: fromJS(action.payload.overviewEchartsData), // 将数据数组转换成immutable
        })
    }
    // 处理矿工概览有效算力数据
    if (action.type == types.GET_OVERVIEWPOWERDATA) {
        return state.merge({
            overviewPowerData: action.payload
        })
    }
    // 处理挖矿统计数据
    if (action.type == types.GET_MININGCOUNTS) {
        return state.merge({
            miningCountsData: action.payload
        })
    }
    // 处理账户折线图
    if (action.type == types.GET_ACCOUNTLINEDATA) {
        return state.merge({
            accountLineData: fromJS(action.payload.msg), // 将数据数组转换成immutable
            accountLineCompany: action.payload.unit
        })
    }
    // 处理有效算力折线图
    if (action.type == types.GET_POWERECHARTSDATA) {
        return state.merge({
            powerEchartsDataList: fromJS(action.payload.msg), // 将数据数组转换成immutable
            powerLineCompany: action.payload.unit
        })
    }
    // 处理有效算力折线图
    if (action.type == types.GET_POWERECHARTSONEDATA) {
        return state.merge({
            powerEchartsOneData: fromJS(action.payload.msg), // 将数据数组转换成immutable
            powerEchartsCompany: action.payload.unit
        })
    }
    // 处理账户概览数据
    if (action.type == types.GET_ACCOUNTDATA) {
        return state.merge({
            accountOverviewData: action.payload
        })
    }
    // 处理消息列表数据
    if (action.type == types.GET_NEWLISTDATA) {
        return state.merge({
            newListData: action.payload.MinerMessages && fromJS(action.payload.MinerMessages) || action.payload.MinerBlocks && fromJS(action.payload.MinerBlocks) || action.payload.AccountTransfers && fromJS(action.payload.AccountTransfers), // 将数据数组转换成immutable
            newListSelectData: action.payload.Methods ? fromJS(action.payload.Methods) : fromJS([]), // 将数据数组转换成immutable
            totalCount: action.payload.TotalCount
        })
    }
    // 处理节点id详情
    if (action.type == types.GET_NODEDETAILDATA) {
        return state.merge({
            nodeDetailMsgData: action.payload
        })
    }
    // 处理获取账户详情数据
    if (action.type == types.GET_ACCOUNTDETAILDATA) {
        return state.merge({
            accountDetailData: action.payload
        })
    }
    // 处理获取区块高度数据列表
    if (action.type == types.GET_BLOCKHEIGHTDATA) {
        return state.merge({
            blockHeightDataList: action.payload
        })
    }
    // 处理获取消息id详情数据
    if (action.type == types.GET_MSGDETAILDATA) {
        return state.merge({
            msgIdDetailMsgData: action.payload.MessageSummarys,
            msgIdDetailAccountData: action.payload.TransferInfos != null ? fromJS(action.payload.TransferInfos) : fromJS([]),
            msgIdDetailOthersData: action.payload.OtherInfos
        })
    }
    // 处理获取区块id详情数据
    if (action.type == types.GET_BLOCKDETAILDATA) {
        return state.merge({
            blockIdDetailData: action.payload
        })
    }
    // 处理获取区块id详情表格数据
    if (action.type == types.GET_BLOCKNEWLISTDATA) {
        return state.merge({
            newListData: action.payload.BlockMessageDetails && fromJS(action.payload.BlockMessageDetails), // 将数据数组转换成immutable
            newListSelectData: action.payload.Methods ? fromJS(action.payload.Methods) : fromJS([]), // 将数据数组转换成immutable
            totalCount: action.payload.TotalCount
        })
    }

    return state
}