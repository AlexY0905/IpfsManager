import * as types from './actionTypes.js'
import api from 'api/index'
import { message } from 'antd'
import { setUsername } from 'util/index'

// 处理loading状态开始
const getIsLoadingStart = () => ({
    type: types.ISLOADING_START
})
// 处理loading状态结束
const getIsLoadingEnd = () => ({
    type: types.ISLOADING_END
})

// 处理用户登录
export const handleLoginAction = (values) => {
    return (dispatch, getState) => {
        // 发送请求之前, 派发action, 开始loading状态
        dispatch(getIsLoadingStart())
        // 向后台携带参数传值
        api.adminLogin(values)
            .then((result) => {
                if (result.code == 0) {
                    //将用户信息存到浏览器中
                    setUsername(result.name);
                    message.success("登录成功");
                    // 用户登录成功跳转到后台首页
                    window.location.href = '/'
                } else {
                    message.error('获取首页数据失败,请稍后再试')
                }
            })
            .catch((err) => {
                message.error('请稍后再试')
            })
            .finally(() => {
                // 请求结束, 无论成功还是失败, 派发action, 结束loading状态
                dispatch(getIsLoadingEnd())
            })
    }
}
