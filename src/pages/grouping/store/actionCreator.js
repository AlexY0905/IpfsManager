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
// 处理分组批量命令页面 获取所有服务器数据列表
const handleGetServerHostData = (payload) => ({
    type: types.GET_SERVERHOSTLIST,
    payload: payload
})
// 处理分组批量命令页面 获取所有服务器数据列表
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

// 处理分组批量命令页面 批量命令服务器
const handleIpSshData = (payload) => ({
    type: types.GET_IPSSH,
    payload: payload
})
// 处理分组批量命令页面 批量命令服务器
export const handleIpSshAction = (options) => {
    return (dispatch, getState) => {
        dispatch(getIsLoadingStart())
        api.getIpSsh(options)
            .then(result => {
                // console.log(':::::::::::::::', result)
                let data = result.msg
                dispatch(handleIpSshData(data))
            })
            .catch(err => {
                message.error('操作失败, 请稍后再试 !')
            })
            .finally(() => {
                dispatch(getIsLoadingEnd())
            })
    }
}

// 处理分组批量命令页面 上传文件
export const handleUpLoadFileAction = (options) => {
    return (dispatch, getState) => {
        dispatch(getIsLoadingStart())
        api.uploadfile(options)
            .then(result => {
                console.log(':::::::::::::::', result)
                let data = result.msg
                dispatch(handleIpSshData(data))
            })
            .catch(err => {
                message.error('操作失败, 请稍后再试 !')
            })
            .finally(() => {
                dispatch(getIsLoadingEnd())
            })
    }
}

// 处理分组批量命令页面 下载文件
export const handleDownFileAction = (options) => {
    return (dispatch, getState) => {
        dispatch(getIsLoadingStart())
        api.downloadfile(options)
            .then(result => {
                // console.log(':::::::::::::::', result)
                if (result.msg == 'success') {
                    message.success('下载成功')
                } else {
                    message.success('下载失败, 请稍后再试 !')
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

// 处理添加组页面 获取所有组数据列表
const handleGetGroupListData = (payload) => ({
    type: types.GET_GROUPLIST,
    payload: payload
})
// 处理添加组页面 获取所有组数据列表
export const handleGetGroupListAction = () => {
    return (dispatch, getState) => {
        dispatch(getIsLoadingStart())
        api.getGroupList()
            .then(result => {
                console.log(':::::::::::::::', result)
                if (result.code == 0) {
                    let data = result.msg == null ? [] : result.msg
                    dispatch(handleGetGroupListData(data))
                } else {
                    message.error("获取数据失败, 请稍后再试 !")
                }
            })
            .catch(err => {
                message.error('获取数据失败, 请稍后再试 !')
            })
            .finally(() => {
                dispatch(getIsLoadingEnd())
            })
    }
}
// 处理部署页面 文件上传的回调
export const handleUpLoadCallBackAction = () => {
    return (dispatch, getState) => {
        dispatch(getIsLoadingStart())
        api.getUpLoadCallBack()
            .then(result => {
                console.log('result----------', result)
                if (result.code == 1) {
                    message.error(`${result.name} 文件重命名失败 !`)
                    return false
                }
                /*
                let options = {
                    result,
                    timeOut: ''
                }
                if (result.code == 2) { // 正在执行中
                    options.timeOut = 60000
                }
                dispatch(handleGetQueryResData(options))
                */
            })
            .catch(err => {
                message.error('操作失败, 请稍后再试 !')
            })
            .finally(() => {
                dispatch(getIsLoadingEnd())
            })
    }
}