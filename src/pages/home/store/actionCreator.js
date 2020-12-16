import * as types from './actionTypes.js'
import api from 'api/index'
import { message } from 'antd'

// 处理loading状态开始
const getIsLoadingStart = () => ({
    type: types.ISLOADING_START
})
// 处理loading状态结束
const getIsLoadingEnd = () => ({
    type: types.ISLOADING_END
})
const handleLotusOrdersData = (payload) => ({
    type: types.GET_LOTUSORDERLIST,
    payload: payload
})
export const handleLotusOrdersAction = (options) => {
    return (dispatch, getState) => {
        dispatch(getIsLoadingStart())
        api.getLotusOrders(options)
            .then((result) => {
                console.log('::::::::-------', result)
                if (result.code == 1) {
                    message.error('没有数据, 请稍后再试 !')
                    return false
                } else {
                    // 将后台请求过来的成功数据, 派发action, 到store
                    dispatch(handleLotusOrdersData(result))
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
// 处理搜索
export const handleSearchAction = (options) => {
    return (dispatch, getState) => {
        dispatch(getIsLoadingStart())
        api.getSearchData(options)
            .then((result) => {
                console.log('result---------', result)
                if (result.code == 1) {
                    message.error('暂无数据, 请稍后再试 !')
                    let options = {
                        name: '',
                        msg: []
                    }
                    dispatch(handleLotusOrdersData(options))
                    return false
                } else {
                    // 将后台请求过来的成功数据, 派发action, 到store
                    dispatch(handleLotusOrdersData(result))
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

// 处理搜索 block
const handleSearchTextData = (payload) => ({
    type: types.GET_LOTUSBLOCKSEARCH,
    payload: payload
})
export const handleSearchTextAction = (options) => {
    return (dispatch, getState) => {
        dispatch(getIsLoadingStart())
        api.getSearchData(options)
            .then((result) => {
                console.log('result---------', result)
                let data = result.msg
                // 将后台请求过来的成功数据, 派发action, 到store
                dispatch(handleSearchTextData(data))
            })
            .catch((err) => {
                message.error('获取数据失败, 请稍后再试 !')
            })
            .finally(() => {
                dispatch(getIsLoadingEnd())
            })
    }
}
