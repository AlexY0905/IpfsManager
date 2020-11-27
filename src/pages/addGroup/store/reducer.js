import * as types from './actionTypes.js';
import { fromJS } from 'immutable';


const defaultState = fromJS({
    isLoading: false,
    serverhostlist: [],
    ipsshtxt: [],
    groupList: []
})

export default (state = defaultState, action) => {
    // 处理开始loading状态
    if (action.type == types.ISLOADING_START) {
        return state.merge({
            isLoading: true
        })
    }
    // 处理结束loading状态
    if (action.type == types.ISLOADING_END) {
        return state.merge({
            isLoading: false
        })
    }

    // 处理展示服务器功能
    if (action.type == types.GET_SERVERHOSTLIST) {
        return state.merge({
            // action参数, 就是actionCreator.js中, 请求数据成功之后的.then函数中派发的action
            serverhostlist: fromJS(action.payload)// 将数据数组转换成immutable
        })
    }
    // 处理展示组数据列表
    if (action.type == types.GET_GROUPLIST) {
        return state.merge({
            // action参数, 就是actionCreator.js中, 请求数据成功之后的.then函数中派发的action
            groupList: fromJS(action.payload)// 将数据数组转换成immutable
        })
    }
    return state
}