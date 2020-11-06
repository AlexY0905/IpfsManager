import * as types from './actionTypes.js'
import api from 'api/index'
import { message } from 'antd'


//处理开始loading状态
const getIsLoadingStart = () => ({
    type: types.ISLOADING_START
})
//处理结束loading状态
const getIsLoadingEnd = () => ({
    type: types.ISLOADING_END
})

// 处理用户注册
export const handleRegisterAction = (values) => {
    return (dispatch, getState) => {
        //发送注册请求之前,派发action 开始loading状态
        dispatch(getIsLoadingStart())
        // 向后台携带参数传值
        api.register(values)
            .then((result) => {
                if (result.code == 0) { // 注册成功
                    // 用户注册成功跳转到登录页面
                    message.success('注册成功')
                    window.location.href = '/login'
                }
            })
            .catch((err) => {
                message.error('请稍后再试')
            })
            .finally(() => {
                // 注册请求结束, 无论成功还是失败, 派发action, 结束loading状态
                dispatch(getIsLoadingEnd())
            })
    }
}
