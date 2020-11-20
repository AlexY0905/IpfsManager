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
    // 批量部署页面, 批量部署接口
    getIpSsh: [
        '/v3/multissh',
        'post'
    ]
}


