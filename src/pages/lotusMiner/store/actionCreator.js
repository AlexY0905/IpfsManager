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
const handleLotusMinerData = (payload) => ({
    type: types.GET_LOTUSMINERLIST,
    payload: payload
})
export const handleLotusMinerAction = (options) => {
    return (dispatch, getState) => {
        dispatch(getIsLoadingStart())
        api.getLotusMiner(options)
            .then((result) => {
                // console.log("----------", result);
                if (result.code == 1) {
                    message.warning('暂无数据, 请稍后再试 !')
                    return false
                } else {
                    // 将后台请求过来的成功数据, 派发action, 到store
                    dispatch(handleLotusMinerData(result))
                }
            })
            .catch((err) => {
                message.error('获取数据失败,请稍后再试')
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
                // console.log('result---------', result)
                if (result.code == 1) {
                    message.warning('暂无数据, 请稍后再试 !')
                    let options = {
                        name: '',
                        msg: []
                    }
                    dispatch(handleLotusMinerData(options))
                    return false
                } else {
                    // 将后台请求过来的成功数据, 派发action, 到store
                    dispatch(handleLotusMinerData(result))
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
// 处理minerInfo数据
const handleMinerInfoData = (payload) => ({
    type: types.GET_LOTUSMINERINFO,
    payload: payload
})
export const handleMinerInfoAction = () => {
    return (dispatch, getState) => {
        dispatch(getIsLoadingStart())
        api.getMinerInfoData()
            .then((result) => {
                let data = []
                for (let key in result.msg) {
                    data.push({[key]: result.msg[key]})
                }
                dispatch(handleMinerInfoData(data))
            })
            .catch((err) => {
                message.error('获取数据失败, 请稍后再试 !')
            })
            .finally(() => {
                dispatch(getIsLoadingEnd())
            })
    }
}
// 处理提币
export const handleTiBiDataAction = (options) => {
    return (dispatch, getState) => {
        dispatch(getIsLoadingStart())
        api.getTiBiData(options)
            .then((result) => {
                console.log('result---------', result)
                if (result.msg && result.msg == 'balance invalid') {
                    message.error(result.msg)
                } else {
                    message.success(result.msg)
                }
            })
            .catch((err) => {
                message.error('网络错误, 请稍后再试 !')
            })
            .finally(() => {
                dispatch(getIsLoadingEnd())
            })
    }
}