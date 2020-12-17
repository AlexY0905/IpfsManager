import * as types from './actionTypes.js';
import { fromJS } from 'immutable';

const defaultState = fromJS({
    // 默认值里定义的属性名就是请求后台返回过来的数据里面的属性名
    name: '',
    type: false,
    findType: '',
    lotusOrderList: [],
    isLoading: false,
    lotusBlockSearchData: ''
})
// 以下action是从actionCreator.js里面来到  payload参数想当于result
// 默认导出一个箭头函数
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
    if (action.type == types.GET_LOTUSORDERLIST) {
        return state.merge({
            // action参数, 就是actionCreator.js中, 请求数据成功之后的.then函数中派发的action
            lotusOrderList: fromJS(action.payload.msg), // 将数据数组转换成immutable
            name: action.payload.name,
            type: action.payload.type,
            findType: action.payload.findtype
        })
    }
    if (action.type == types.GET_LOTUSBLOCKSEARCH) {
        return state.merge({
            // action参数, 就是actionCreator.js中, 请求数据成功之后的.then函数中派发的action
            lotusBlockSearchData: action.payload
        })
    }

    return state
}