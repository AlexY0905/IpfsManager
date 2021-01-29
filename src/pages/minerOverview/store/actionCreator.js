import * as types from './actionTypes.js'
import api from 'api'
import { message } from 'antd'


// 处理loading状态开始
const getIsLoadingStart = () => ({
    type: types.ISLOADING_START
})
// 处理loading状态结束
const getIsLoadingEnd = () => ({
    type: types.ISLOADING_END
})
// 矿工概览页面 获取矿工概览图表数据
const handleOverviewEchartsData = (payload) => ({
    type: types.GET_OVERVIEWCHARTSDATA,
    payload: payload
})
// 矿工概览页面 获取矿工概览有效算力数据
const handleOverviewPowerData = (payload) => ({
    type: types.GET_OVERVIEWPOWERDATA,
    payload: payload
})
// 处理矿工概览页数据
export const handleOverviewEchartsDataAction = (options) => {
    return (dispatch, getState) => {
        dispatch(getIsLoadingStart(options))
        api.getOverviewData(options)
            .then(result => {
                // console.log(':::::::::::::::', result.msg)
                /**
                 * 矿工概览数据
                 * */
                /* 概览图表数据 */
                let overviewEchartsData = []
                result.msg.MinerAccounts.MinerAccountDetail.forEach((item, index) => {
                    overviewEchartsData.push({
                        type: Object.keys(item)[0] == 'AvailableBalance' && '可用余额' || Object.keys(item)[0] == 'StoragePledge' && '扇区抵押' || Object.keys(item)[0] == 'Staking' && '挖矿锁仓',
                        value: Number(Object.values(item)[0].split(' ')[0])
                    })
                })
                let options = {
                    accountBalance: result.msg.MinerAccounts.MinerBalance,
                    overviewEchartsData
                }
                dispatch(handleOverviewEchartsData(options))
                /* 概览图表数据 */
                /* 有效算力数据 */
                let minerPowersData = result.msg.MinerPowers
                dispatch(handleOverviewPowerData(minerPowersData))
                /* 有效算力数据 */


                /**
                 * 矿工概览数据
                 * */

            })
            .catch(err => {
                message.error('获取数据失败, 请稍后再试 !')
            })
            .finally(() => {
                dispatch(getIsLoadingEnd())
            })
    }
}
// 处理挖矿统计数据
const handleMiningCountsData = (payload) => ({
    type: types.GET_MININGCOUNTS,
    payload: payload
})
export const handleMiningCountsAction = (options) => {
    return (dispatch, getState) => {
        dispatch(getIsLoadingStart())
        api.getOverviewData(options)
            .then((result) => {
                // console.log('::::::::-------', result.msg)
                // 将后台请求过来的成功数据, 派发action, 到store
                dispatch(handleMiningCountsData(result.msg))
            })
            .catch((err) => {
                message.error('获取数据失败, 请稍后再试 !')
            })
            .finally(() => {
                dispatch(getIsLoadingEnd())
            })
    }
}
// 处理账户折线图数据
const handleAccountLineData = (payload) => ({
    type: types.GET_ACCOUNTLINEDATA,
    payload: payload
})
export const handleAccountLineAction = (options) => {
    return (dispatch, getState) => {
        dispatch(getIsLoadingStart())
        api.getOverviewData(options)
            .then((result) => {
                // console.log('::::::::-------', result)
                if (result.code == 1) {
                    message.error('暂无数据, 请稍后再试 !')
                } else {
                    // 将后台请求过来的成功数据, 派发action, 到store
                    dispatch(handleAccountLineData(result))
                }
            })
            .catch((err) => {
                message.error('获取数据失败, 请稍后再试 !')
            })
            .finally(() => {
                dispatch(getIsLoadingEnd())
            })
    }
}
// 处理算力折线图数据
const handleEchartsData = (payload) => ({
    type: types.GET_POWERECHARTSDATA,
    payload: payload
})
export const handleEchartsDataAction = (options) => {
    return (dispatch, getState) => {
        dispatch(getIsLoadingStart())
        api.getOverviewData(options)
            .then((result) => {
                // console.log('::::::::-------', result)
                if (result.code == 1) {
                    message.error('暂无数据, 请稍后再试 !')
                } else {
                    // 将后台请求过来的成功数据, 派发action, 到store
                    dispatch(handleEchartsData(result))
                }
            })
            .catch((err) => {
                message.error('获取数据失败, 请稍后再试 !')
            })
            .finally(() => {
                dispatch(getIsLoadingEnd())
            })
    }
}
// 处理算力折线图数据
const handlePowerEchartsData = (payload) => ({
    type: types.GET_POWERECHARTSONEDATA,
    payload: payload
})
export const handlePowerEchartsDataAction = (options) => {
    return (dispatch, getState) => {
        dispatch(getIsLoadingStart())
        api.getOverviewData(options)
            .then((result) => {
                // console.log('::::::::-------', result)
                if (result.code == 1) {
                    message.error('暂无数据, 请稍后再试 !')
                } else {
                    // 将后台请求过来的成功数据, 派发action, 到store
                    dispatch(handlePowerEchartsData(result))
                }
            })
            .catch((err) => {
                message.error('获取数据失败, 请稍后再试 !')
            })
            .finally(() => {
                dispatch(getIsLoadingEnd())
            })
    }
}

// 处理账户概览数据
const handleAccountData = (payload) => ({
    type: types.GET_ACCOUNTDATA,
    payload: payload
})
export const handleAccountDataAction = (options) => {
    return (dispatch, getState) => {
        dispatch(getIsLoadingStart())
        api.getOverviewData(options)
            .then((result) => {
                // console.log('::::::::-------', result)
                // 将后台请求过来的成功数据, 派发action, 到store
                dispatch(handleAccountData(result.msg))
            })
            .catch((err) => {
                message.error('获取数据失败, 请稍后再试 !')
            })
            .finally(() => {
                dispatch(getIsLoadingEnd())
            })
    }
}
// 处理消息列表数据
const handleNewListData = (payload) => ({
    type: types.GET_NEWLISTDATA,
    payload: payload
})
export const handleNewListAction = (options) => {
    return (dispatch, getState) => {
        dispatch(getIsLoadingStart())
        api.getOverviewData(options)
            .then((result) => {
                // console.log('::::::::-------', result)
                // 将后台请求过来的成功数据, 派发action, 到store
                dispatch(handleNewListData(result.msg))
            })
            .catch((err) => {
                message.error('获取数据失败, 请稍后再试 !')
            })
            .finally(() => {
                dispatch(getIsLoadingEnd())
            })
    }
}
// 处理获取节点id详情
const handleGetNodeDetailData = (payload) => ({
    type: types.GET_NODEDETAILDATA,
    payload: payload
})
export const handleGetNodeDetailAction = (options) => {
    return (dispatch, getState) => {
        dispatch(getIsLoadingStart())
        api.getOverviewData(options)
            .then((result) => {
                // console.log('::::::::-------', result)
                // 将后台请求过来的成功数据, 派发action, 到store
                dispatch(handleGetNodeDetailData(result.msg))
            })
            .catch((err) => {
                message.error('获取数据失败, 请稍后再试 !')
            })
            .finally(() => {
                dispatch(getIsLoadingEnd())
            })
    }
}
// 处理获取账户详情数据
const handleAccountDetailData = (payload) => ({
    type: types.GET_ACCOUNTDETAILDATA,
    payload: payload
})
export const handleAccountDetailDataAction = (options) => {
    return (dispatch, getState) => {
        dispatch(getIsLoadingStart())
        api.getOverviewData(options)
            .then((result) => {
                // console.log('::::::::-------', result)
                // 将后台请求过来的成功数据, 派发action, 到store
                dispatch(handleAccountDetailData(result.msg))
            })
            .catch((err) => {
                message.error('获取数据失败, 请稍后再试 !')
            })
            .finally(() => {
                dispatch(getIsLoadingEnd())
            })
    }
}
// 处理获取账户详情数据
const handleBlockHeightData = (payload) => ({
    type: types.GET_BLOCKHEIGHTDATA,
    payload: payload
})
export const handleBlockHeightDataAction = (options) => {
    return (dispatch, getState) => {
        dispatch(getIsLoadingStart())
        api.getOverviewData(options)
            .then((result) => {
                // console.log('::::::::-------', result)
                // 将后台请求过来的成功数据, 派发action, 到store
                dispatch(handleBlockHeightData(result.msg))
            })
            .catch((err) => {
                message.error('获取数据失败, 请稍后再试 !')
            })
            .finally(() => {
                dispatch(getIsLoadingEnd())
            })
    }
}
// 处理消息Id详情数据
const handleMsgIdDetailData = (payload) => ({
    type: types.GET_MSGDETAILDATA,
    payload: payload
})
export const handleMsgIdDetailDataAction = (options) => {
    return (dispatch, getState) => {
        dispatch(getIsLoadingStart())
        api.getOverviewData(options)
            .then((result) => {
                // console.log('::::::::-------', result)
                // 将后台请求过来的成功数据, 派发action, 到store
                dispatch(handleMsgIdDetailData(result.msg))
            })
            .catch((err) => {
                message.error('获取数据失败, 请稍后再试 !')
            })
            .finally(() => {
                dispatch(getIsLoadingEnd())
            })
    }
}
// 处理区块Id详情数据
const handleBlockDetailData = (payload) => ({
    type: types.GET_BLOCKDETAILDATA,
    payload: payload
})
export const handleBlockDetailAction = (options) => {
    return (dispatch, getState) => {
        dispatch(getIsLoadingStart())
        api.getOverviewData(options)
            .then((result) => {
                // console.log('::::::::-------', result)
                // 将后台请求过来的成功数据, 派发action, 到store
                dispatch(handleBlockDetailData(result.msg))
            })
            .catch((err) => {
                message.error('获取数据失败, 请稍后再试 !')
            })
            .finally(() => {
                dispatch(getIsLoadingEnd())
            })
    }
}
// 处理区块Id详情页表格数据
const handleBlockNewListData = (payload) => ({
    type: types.GET_BLOCKNEWLISTDATA,
    payload: payload
})
export const handleBlockNewListAction = (options) => {
    return (dispatch, getState) => {
        dispatch(getIsLoadingStart())
        api.getOverviewData(options)
            .then((result) => {
                // console.log('::::::::-------', result)
                // 将后台请求过来的成功数据, 派发action, 到store
                dispatch(handleBlockNewListData(result.msg))
            })
            .catch((err) => {
                message.error('获取数据失败, 请稍后再试 !')
            })
            .finally(() => {
                dispatch(getIsLoadingEnd())
            })
    }
}



