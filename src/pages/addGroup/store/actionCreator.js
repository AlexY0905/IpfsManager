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
// 处理添加组页面 创建组
export const handleAddGroupNameAction = (options) => {
    return (dispatch, getState) => {
        dispatch(getIsLoadingStart())
        api.addGroupName(options)
            .then(result => {
                console.log(':::::::::::::::', result)
                if (result.code == 0) {
                    message.success("创建成功")
                    setTimeout(() => {
                        location.reload()
                    })
                }
            })
            .catch(err => {
                message.error('创建失败, 请稍后再试 !')
            })
            .finally(() => {
                dispatch(getIsLoadingEnd())
            })
    }
}
// 处理添加组页面 分配组
export const handleDistributionGroupListAction = (options) => {
    return (dispatch, getState) => {
        dispatch(getIsLoadingStart())
        api.distributionGroup(options)
            .then(result => {
                console.log(':::::::::::::::', result)
                if (result.code == 0) {
                    message.success("分配成功")
                    setTimeout(() => {
                        location.reload()
                    })
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
// 处理添加组页面 删除组数据
export const handleDelSelectedAction = (options) => {
    return (dispatch, getState) => {
        dispatch(getIsLoadingStart())
        api.delGroupData(options)
            .then(result => {
                console.log(':::::::::::::::', result)
                if (result.code == 0) {
                    message.success('删除成功')
                    setTimeout(() => {
                        location.reload()
                    })
                }
            })
            .catch(err => {
                message.error('删除失败, 请稍后再试 !')
            })
            .finally(() => {
                dispatch(getIsLoadingEnd())
            })
    }
}
// 处理添加组页面 编辑组名
export const handleEditGroupAction = (options) => {
    return (dispatch, getState) => {
        dispatch(getIsLoadingStart())
        api.editGroupName(options)
            .then(result => {
                console.log(':::::::::::::::', result)
                if (result.code == 0) {
                    message.success('编辑成功')
                    setTimeout(() => {
                        location.reload()
                    })
                }
            })
            .catch(err => {
                message.error('编辑失败, 请稍后再试 !')
            })
            .finally(() => {
                dispatch(getIsLoadingEnd())
            })
    }
}