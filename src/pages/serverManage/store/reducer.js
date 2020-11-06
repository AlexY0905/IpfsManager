import * as types from './actionTypes.js';
import { fromJS } from 'immutable';


const defaultState = fromJS({
    newslist: []
})

export default (state = defaultState, action) => {
    // 处理开始loading状态
    if (action.type == types.ISLOADING_START) {
        return state.merge({
            isLoading: true
        })
    }
    if (action.type == types.GET_NEWSLIST) {//消息管理页面  展示消息action
        return state.merge({
            // action参数, 就是actionCreator.js中, 请求数据成功之后的.then函数中派发的action
            newslist: fromJS(action.payload) // 将数据数组转换成immutable
        })
    }
    // 处理结束loading状态
    if (action.type == types.ISLOADING_END) {
        return state.merge({
            isLoading: false
        })
    }
    return state
}