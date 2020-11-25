import * as types from './actionTypes.js';
import { fromJS } from 'immutable';


const defaultState = fromJS({
    isLoading: false,
    serverhostlist: [],
    ipsshtxt: []
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
    // 处理批量命令返回的成功或失败的信息
    if (action.type == types.GET_IPSSH) {
        return state.merge({
            ipsshtxt: fromJS(action.payload)// 将数据数组转换成immutable
        })
    }
    return state
}