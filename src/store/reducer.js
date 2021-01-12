import { combineReducers } from 'redux-immutable'
import { reducer as registerReducer } from 'pages/register/store/index'
import { reducer as loginReducer } from 'pages/login/store/index'
import { reducer as homeReducer } from 'pages/home/store/index'
import { reducer as lotusHelpReducer } from 'pages/lotusHelp/store/index'
import { reducer as serverManageReducer } from 'pages/serverManage/store/index'
import { reducer as monitorReducer } from 'pages/monitor/store/index'
import { reducer as ipsshReducer } from 'pages/ipssh/store/index'
import { reducer as addGroupReducer } from 'pages/addGroup/store/index'
import { reducer as groupingReducer } from 'pages/grouping/store/index'
import { reducer as lotusMinerReducer } from 'pages/lotusMiner/store/index'
import { reducer as minerOverviewReducer } from 'pages/minerOverview/store/index'

// 顶层store    所以子页面的reducer的文件都需要引入到这个顶层的reducer中
export default combineReducers({
    // 更新后的状态返回的值
    register: registerReducer,
    login: loginReducer,
    home: homeReducer,
    serverManage: serverManageReducer,
    monitor: monitorReducer,
    ipssh: ipsshReducer,
    addGroup: addGroupReducer,
    grouping: groupingReducer,
    lotusHelp: lotusHelpReducer,
    lotusMiner: lotusMinerReducer,
    minerOverview: minerOverviewReducer
})