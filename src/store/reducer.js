import { combineReducers } from 'redux-immutable'
import { reducer as registerReducer } from 'pages/register/store/index'
import { reducer as loginReducer } from 'pages/login/store/index'
import { reducer as homeReducer } from 'pages/home/store/index'
import { reducer as serverManageReducer } from 'pages/serverManage/store/index'
import { reducer as monitorReducer } from 'pages/monitor/store/index'
import { reducer as ipsshReducer } from 'pages/ipssh/store/index'
import { reducer as fileuploadReducer } from 'pages/fileupload/store/index'


// 顶层store    所以子页面的reducer的文件都需要引入到这个顶层的reducer中
export default combineReducers({
    // 更新后的状态返回的值
    register: registerReducer,
    login: loginReducer,
    home: homeReducer,
    serverManage: serverManageReducer,
    monitor: monitorReducer,
    ipssh: ipsshReducer,
    fileupload: fileuploadReducer
})