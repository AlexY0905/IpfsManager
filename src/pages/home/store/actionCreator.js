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
                // 将后台请求过来的成功数据, 派发action, 到store
                dispatch(handleLotusOrdersData(result))
            })
            .catch((err) => {
                message.error('获取数据失败,请稍后再试')
            })
            .finally(() => {
                dispatch(getIsLoadingEnd())
            })
    }
}
