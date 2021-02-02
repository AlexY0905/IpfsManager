import * as types from './actionTypes.js'
import api from 'api/index'
import { message, Modal, notification } from 'antd'

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
                if (result.code == 0) {
                    /*
                    let timeOut = 1200000
                    dispatch(handleDeploy(timeOut))
                     */
                    result.msg.forEach((item, index) => {
                        if (item.Result) {
                            notification['success']({
                                message: `${item.Host} 执行成功`
                            })
                        } else {
                            notification['error']({
                                message: `${item.Host} 执行失败, 稍后再试`,
                                duration: null
                            })
                        }
                    })
                }

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
// 处理部署页面 查询操作的返回结果
export const handleGetQueryResAction = (options) => {
    return (dispatch, getState) => {
        dispatch(getIsLoadingStart())
        api.getQueryRes(options)
            .then(result => {
                console.log('result----------', result)
                if (result.code == 0) { // 全部执行完毕, 并且成功
                    result.msg.forEach((item, index) => {
                        Modal.success({
                            content: item.Host + '执行完毕'
                        })
                    })
                    return
                    dispatch(handleGetQueryResData(result))
                } else if (result.code == 1) { // 正在执行中
                    result.msg.forEach((item, index) => {
                        if (item.Code == 0) { // 执行完毕
                            Modal.success({
                                content: item.Host + ' 执行完毕'
                            })
                        } else if (item.Code == 1) { // 执行失败
                            Modal.error({
                                content: item.Host + ' 执行失败'
                            })
                        } else if (item.Code == 2) { // 正在执行中
                            Modal.warning({
                                content: item.Host + ' 正在执行中, 稍后再看 ... '
                            })
                        } else if (item.Code == 3) { // 暂无执行
                            Modal.warning({
                                content: item.Host + ' 暂无执行'
                            })
                        }
                    })
                } else if (result.code == 4) {
                    message.error(result.msg)
                    return false
                } else { // 执行失败
                    Modal.error({
                        content: '网络错误, 稍后再试 ... '
                    })
                    return
                    dispatch(handleGetQueryResData(result))
                }

                /*
                if (result.code == 0) { // 执行成功
                    Modal.success({
                        content: '执行成功'
                    })
                    return false
                } else if (result.code == 1) { // 执行失败
                    Modal.error({
                        content: '执行失败, 稍后再试 ... '
                    })
                    dispatch(handleGetQueryResData(result))
                    return false
                } else if (result.code == 2) { // 正在执行中
                    Modal.warning({
                        content: '正在执行中, 稍后再看 ... '
                    })
                    return false
                } else if (result.code == 3) { // 暂无执行的脚本
                    Modal.warning({
                        content: '暂无执行的脚本 ... '
                    })
                    return false
                }
                */

            })
            .catch(err => {
                message.error('查询结果失败, 请稍后再试 !')
            })
            .finally(() => {
                dispatch(getIsLoadingEnd())
            })
    }
}
