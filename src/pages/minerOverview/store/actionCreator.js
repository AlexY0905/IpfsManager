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
// 处理批量命令页面 获取所有服务器数据列表
const handleOverviewEchartsData = (payload) => ({
    type: types.GET_OVERVIEWCHARTSDATA,
    payload: payload
})
// 处理矿工概览饼形图数据
export const handleOverviewEchartsDataAction = () => {
    return (dispatch, getState) => {
        dispatch(getIsLoadingStart())
        api.getOverviewData()
            .then(result => {
                console.log(':::::::::::::::', result.msg)
                let overviewEchartsData = []
                result.msg.MinerSummaryInfos.forEach((item, index) => {
                    overviewEchartsData.push({
                        type: Object.keys(item)[0] == 'AvailableBalance' && '可用余额' || Object.keys(item)[0] == 'StoragePledge' && '扇区抵押' || Object.keys(item)[0] == 'Staking' && '挖矿锁仓',
                        value: Number(Object.values(item)[0].split(' ')[0])
                    })
                })
                let options = {
                    accountBalance: result.msg.MinerBalance,
                    overviewEchartsData
                }
                console.log('options-------', options)
                dispatch(handleOverviewEchartsData(options))
            })
            .catch(err => {
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
export const handleEchartsDataAction = () => {
    return (dispatch, getState) => {
        dispatch(getIsLoadingStart())
        api.getMinerPower()
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