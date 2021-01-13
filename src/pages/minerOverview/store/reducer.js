import * as types from './actionTypes.js';
import { fromJS } from 'immutable';


const defaultState = fromJS({
    isLoading: false,
    overviewEchartsDataList: [],
    accountBalance: '',
    powerEchartsDataList: [],
    overviewPowerData: '',
    miningCountsData: ''
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

    // 处理有效算力折线图
    if (action.type == types.GET_POWERECHARTSDATA) {
        return state.merge({
            powerEchartsDataList: fromJS(action.payload.msg), // 将数据数组转换成immutable
        })
    }
    return state
}