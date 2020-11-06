import * as types  from './actionTypes.js';
import { fromJS } from 'immutable';


const defaultState = fromJS({
   isLoading:false
})

export default (state=defaultState,action)=>{
    // 处理开始loading状态
    if(action.type == types.ISLOADING_START){
        return state.merge({
            isLoading:true
        })
    }
    // 处理结束loading状态
    if(action.type == types.ISLOADING_END){
        return state.merge({
            isLoading:false
        })
    }
    return state
}