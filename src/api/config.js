// 项目的端口号
export const SERVER = 'http://192.168.172.103:9000';


// 先配置后台返回回来的接口,
// 再去需要发请求的页面中引入 api文件夹下面的 index.js这个文件
// 在componentDidmount 生命周期中发请求
export const API_CONFIG = {
    // 注册页面接口
    register: [
        '/v1/register',
        'post'
    ],
    // 登录页面接口
    adminLogin: [
        '/v1/loginbypassword',
        'get'
    ],
    // 添加服务器页面, 获取所有服务器数据
    getAllServer: [
        '/v2/showallservers',
        'get'
    ],
    // 添加服务器页面, 添加服务器接口
    addServer: [
        '/v2/addserver',
        'get'
    ],
    // 添加服务器页面, 编辑服务器接口
    editServer: [
        '/v2/updateserver',
        'get'
    ],
    // 添加服务器页面, 获取服务器的数据回填接口
    getEditServerData: [
        '/v2/showserver',
        'get'
    ],
    // 添加服务器页面, 删除机器id接口
    delip: [
        '/v2/delserver',
        'get'
    ],
    // 批量命令, 展示服务器ip接口
    getIpSsh: [
        '/v3/multissh',
        'post'
    ],
    // 批量命令, 文件上传
    uploadfile: [
        '/v3/uploadfile',
        'post'
    ],
    // 批量命令, 文件下载
    downloadfile: [
        '/v3/downloadfile',
        'post'
    ],
    // lotus help页面 文件上传的回调接口
    getUpLoadCallBack: [
        '/v3/checkfile',
        'post'
    ],
    // 添加组页面, 添加组接口
    addGroupName: [
        '/v4/addgroup',
        'post'
    ],
    // 添加组页面, 获取组数据列表接口
    getGroupList: [
        '/v4/showgroup',
        'get'
    ],
    // 添加组页面, 分配组接口
    distributionGroup: [
        '/v4/addgroup',
        'post'
    ],
    // 添加组页面, 删除组数据接口
    delGroupData: [
        '/v4/delgroup',
        'post'
    ],
    // 添加组页面, 编辑组名接口
    editGroupName: [
        '/v4/updategroup',
        'get'
    ],
    // lotus命令页面, 命令按钮接口
    getLotusOrders: [
        '/v5/lotus',
        'get'
    ],
    // lotusMiner页面 按钮接口
    getLotusMiner: [
        '/v5/lotus',
        'get'
    ],
    // lotusMiner页面 搜索接口
    getSearchData: [
        '/v5/lotusinfo',
        'get'
    ],
    // lotusMiner页面 提币接口
    getTiBiData: [
        '/v5/lotusinfo',
        'get'
    ],
    // lotus命令页面, 折线图接口
    getMinerPower: [
        '/v6/minerpower',
        'get'
    ],
    // lotusMiner页面 获取minerInfo数据接口
    getMinerInfoData: [
        '/v6/minerinfo',
        'get'
    ],
    // lotus help页面 部署接口
    getDeploy: [
        '/v7/lotus',
        'post'
    ],
    // lotus help页面 查询操作结果接口
    getQueryRes: [
        '/v7/lotusresult',
        'post'
    ],
    // 矿工概览页面 数据接口
    getOverviewData: [
        '/v6/minersummary',
        'get'
    ]
}


