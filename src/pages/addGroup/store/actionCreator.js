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
// 处理添加组页面 获取所有服务器数据列表
const handleGetServerHostData = (payload) => ({
    type: types.GET_SERVERHOSTLIST,
    payload: payload
})
// 处理添加组页面 获取所有服务器数据列表
export const handleGetServerHostDataAction = () => {
    return (dispatch, getState) => {
        dispatch(getIsLoadingStart())
        api.getAllServer()
            .then(result => {
                console.log(':::::::::::::::', result)
                dispatch(handleGetServerHostData(result))
            })
            .catch(err => {
                message.error('获取数据失败, 请稍后再试 !')
            })
            .finally(() => {
                dispatch(getIsLoadingEnd())
            })
    }
}

// 处理添加组页面 获取所有服务器数据列表
const handleGetGroupListData = (payload) => ({
    type: types.GET_GROUPLIST,
    payload: payload
})
// 处理添加组页面 获取所有服务器数据列表
export const handleGetGroupListAction = () => {
    return (dispatch, getState) => {
        dispatch(getIsLoadingStart())
        api.getAllServer()
            .then(result => {
                console.log(':::::::::::::::', result)
                return
                dispatch(handleGetGroupListData(result))
            })
            .catch(err => {
                message.error('获取数据失败, 请稍后再试 !')
            })
            .finally(() => {
                dispatch(getIsLoadingEnd())
            })
    }
}
// 处理添加组页面 添加组名
export const handleAddGroupNameAction = (options) => {
    return (dispatch, getState) => {
        dispatch(getIsLoadingStart())
        api.addGroupName(options)
            .then(result => {
                console.log(':::::::::::::::', result)

            })
            .catch(err => {
                message.error('获取数据失败, 请稍后再试 !')
            })
            .finally(() => {
                dispatch(getIsLoadingEnd())
            })
    }
}