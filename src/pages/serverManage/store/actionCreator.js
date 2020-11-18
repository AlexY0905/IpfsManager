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
// 处理添加服务器页面 获取所有服务器数据列表
const handleGetServerData = (payload) => ({
    type: types.GET_SERVERLIST,
    payload: payload
})
// 处理添加服务器页面 获取所有服务器数据列表
export const handleGetServerDataAction = () => {
    return (dispatch, getState) => {
        dispatch(getIsLoadingStart())
        api.getAllServer()
            .then(result => {
                // console.log(':::::::::::::::', result)
                dispatch(handleGetServerData(result))
            })
            .catch(err => {
                message.error('获取数据失败, 请稍后再试 !')
            })
            .finally(() => {
                dispatch(getIsLoadingEnd())
            })
    }
}

// 处理添加服务器页面 添加服务器功能
export const handleAddServerAction = (options) => {
    return (dispatch, getState) => {
        api.addServer(options)
            .then(result => {
                // console.log(':::::::::::::::', result)
                if (result.code == 0) {
                    message.success('添加成功')
                    setTimeout(() => {
                        window.location.href = '/serverManage'
                    }, 1000)
                } else {
                    message.error('添加失败, 请稍后再试 !')
                }
            })
            .catch(err => {
                message.error('网络错误, 请稍后再试 !')
            })
    }
}

// 处理添加服务器页面 编辑的数据回填
const handleGetServerEdit = (payload) => ({
    type: types.ADDSERVER_EDIT_DATA,
    payload: payload
});
export const handleGetEditDataAction = (id) => {
    return (dispatch, getState) => {
        api.getEditServerData({id})
            .then(result => {
                // console.log(':::::::::::::::', result)
                dispatch(handleGetServerEdit(result))
            })
            .catch(err => {
                message.error('网络错误, 请稍后再试 !')
            })
    }
}


// 处理添加服务器页面 编辑服务器功能
export const handleServerEditAction = (options) => {
    return (dispatch, getState) => {
        api.editServer(options)
            .then(result => {
                // console.log(':::::::::::::::', result)
                if (result.code == 0) {
                    message.success('编辑成功')
                    setTimeout(() => {
                        location.reload()
                    }, 1000)
                } else {
                    message.error('编辑失败, 请稍后再试 !')
                }
            })
            .catch(err => {
                message.error('网络错误, 请稍后再试 !')
            })
    }
}


//处理删除机器功能
export const handleDelIpAction = (id) => {
    return (dispatch, getState) => {
        api.delip({ id })
            .then(result => {
                console.log('::::::::::::', result)
                if (result.code == 0) {
                    message.success(result.msg)
                    setTimeout(() => {
                        location.reload()
                    }, 1000)
                } else {
                    message.error(result.msg)
                }
            })
            .catch(err => {
                message.error('删除失败')
            })
    }
}
