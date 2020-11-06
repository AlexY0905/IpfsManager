// 项目的端口号
export const SERVER = 'http://61.147.123.84:10080';


// 先配置后台返回回来的接口,
// 再去需要发请求的页面中引入 api文件夹下面的 index.js这个文件
// 在componentDidmount 生命周期中发请求
export const API_CONFIG = {
    monitorList: [//本地机器监控页面  展示数据接口
        '/purchase/get_machine_data',
        'get'
    ]
}


