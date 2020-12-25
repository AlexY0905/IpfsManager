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
// 处理部署页面 获取所有服务器数据列表
const handleGetServerHostData = (payload) => ({
    type: types.GET_SERVERHOSTLIST,
    payload: payload
})
// 处理部署页面 获取所有服务器数据列表
export const handleGetServerHostDataAction = () => {
    return (dispatch, getState) => {
        dispatch(getIsLoadingStart())
        api.getAllServer()
            .then(result => {
                // console.log(':::::::::::::::', result)
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
// 处理部署页面 部署操作
const handleDeploy = (payload) => ({
    type: types.GET_DEPLOY,
    payload: payload
})
// 处理部署页面 部署操作
export const handleDeployAction = (options) => {
    return (dispatch, getState) => {
        dispatch(getIsLoadingStart())
        api.getDeploy(options)
            .then(result => {
                console.log(':::::::::::::::', result)
                return false
                dispatch(handleDeploy(result))
            })
            .catch(err => {
                message.error('操作失败, 请稍后再试 !')
            })
            .finally(() => {
                dispatch(getIsLoadingEnd())
            })
    }
}
// 处理部署页面 定时查询操作的返回结果
const handleGetQueryResData = (payload) => ({
    type: types.GET_QUERYRES,
    payload
})
// 处理部署页面 定时查询操作的返回结果
export const handleGetQueryResAction = (options) => {
    return (dispatch, getState) => {
        dispatch(getIsLoadingStart())
        api.getQueryRes(options)
            .then(result => {
                console.log('result----------', result)
                return false
                dispatch(handleGetQueryResData(result))
            })
            .catch(err => {
                message.error('查询结果失败, 请稍后再试 !')
            })
            .finally(() => {
                dispatch(getIsLoadingEnd())
            })
    }
}
