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
//处理消息页面  消息数据展示功能
const hendleNewsListData = (payload) => ({
    type: types.GET_NEWSLIST,
    payload: payload
});
//处理消息页面  消息数据展示功能
export const hendleNewsListAction = () => {
    return (dispatch, getState) => {
        dispatch(getIsLoadingStart())
        api.newslist()
            .then(result => {
                if (result.code == 0) {
                    let data = result.data
                    dispatch(hendleNewsListData(data))
                } else {
                    message.error(result.msg)
                }
            })
            .catch(err => {
                message.error('网络错误, 请稍后再试 !')
            })
            .finally(() => {
                dispatch(getIsLoadingEnd())
            })
    }
}
