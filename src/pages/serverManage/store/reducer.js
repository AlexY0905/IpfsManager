import * as types from './actionTypes.js';
import { fromJS } from 'immutable';


const defaultState = fromJS({
    isLoading: false,
    serverlist: [],
    name: '',
    username: '',
    host: '',
    port: '',
    password: ''
})

export default (state = defaultState, action) => {
    // 处理开始loading状态
    if (action.type == types.ISLOADING_START) {
        return state.merge({
            isLoading: true
        })
    }
    //处理展示服务器功能
    if (action.type == types.GET_SERVERLIST) {
        return state.merge({
            // action参数, 就是actionCreator.js中, 请求数据成功之后的.then函数中派发的action
            serverlist: fromJS(action.payload)// 将数据数组转换成immutable
        })
    }

    if (action.type == types.ADDSERVER_EDIT_DATA) { // 添加服务器页面 编辑服务器功能
        return state.merge({
            // action参数, 就是actionCreator.js中, 请求数据成功之后的.then函数中派发的action
            name: action.payload.name,
            username: action.payload.username,
            host: action.payload.host,
            port: action.payload.port,
            password: action.payload.password
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