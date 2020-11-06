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
    ]
}


