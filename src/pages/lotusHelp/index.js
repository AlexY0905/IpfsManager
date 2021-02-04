// lotus部署页面
import React, { Component } from 'react'
import { connect } from 'react-redux'
import Layout from 'common/layout/index.js'
import {Breadcrumb, Table, Divider, Tabs, Button, Modal, Spin, Upload, Icon, message, notification, Input} from 'antd';
import "./index.css"
import { actionCreator } from './store'

const { TabPane } = Tabs;
const { confirm } = Modal

let timer = null
let isOneRender = true
class LotusHelp extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            data: '',
            modalType: '',
            isShowServerModal: false,
            selectedRows: [],
            bianYiBtn: true,
            shouHuBtn: true,
            tongBuQuKuaiBtn: true,
            chuShiHuaKuangGongBtn: true,
            qiDongKuangGongBtn: true,
            qiDongWorkerBtn: true,
            benchCompile: true,
            benchceshiBtn: true,
            workRunModal: false,
            process: '',
            benchCeShiBtnModal: false,
            benchCeShiIptVal: '',
            benchBianYiBtnModal: false,
            benchBianYiIptVal: ''
        }
        this.handleDeployBtn = this.handleDeployBtn.bind(this)
        this.handleSeeServer = this.handleSeeServer.bind(this)
        this.handleSelectServerCancel = this.handleSelectServerCancel.bind(this)
        this.handleSelectServerOk = this.handleSelectServerOk.bind(this)
        this.handleDeployRes = this.handleDeployRes.bind(this)
        this.handleWorkRunModalCancel = this.handleWorkRunModalCancel.bind(this)
        this.handleWorkRunModalOk = this.handleWorkRunModalOk.bind(this)
        this.handleWorkRunIpt = this.handleWorkRunIpt.bind(this)
        this.handleBenchCeShiModalCancel = this.handleBenchCeShiModalCancel.bind(this)
        this.handleBenchCeShiModalOk = this.handleBenchCeShiModalOk.bind(this)
        this.handleBenchCeShiIpt = this.handleBenchCeShiIpt.bind(this)
        this.handleBenchBianYiModalCancel = this.handleBenchBianYiModalCancel.bind(this)
        this.handleBenchBianYiModalOk = this.handleBenchBianYiModalOk.bind(this)
        this.handleBenchBianYiIpt = this.handleBenchBianYiIpt.bind(this)
    }
    componentDidMount() {
        // 调用发送方的数据 显示服务器列表

    }
    handleDeployBtn (type) {
        if (timer != null) {
            clearInterval(timer)
        }
        isOneRender = true
        let options = {
            name: '',
            servers: this.state.selectedRows
        }
        if (type == '编译') {
            options.name = 'lotuscompile'
            this.setState({name: 'lotuscompile', bianYiBtn: true})
            window.localStorage.setItem("commandName", 'lotuscompile')
        } else if (type == '进程守护') {
            options.name = 'lotusdaemon'
            this.setState({name: 'lotusdaemon', shouHuBtn: true})
            window.localStorage.setItem("commandName", 'lotusdaemon')
        } else if (type == '初始化矿工') {
            options.name = 'minerinit'
            this.setState({name: 'minerinit', chuShiHuaKuangGongBtn: true})
            window.localStorage.setItem("commandName", 'minerinit')
        } else if (type == '启动矿工') {
            options.name = 'minerrun'
            this.setState({name: 'minerrun', qiDongKuangGongBtn: true})
            window.localStorage.setItem("commandName", 'minerrun')
        } else if (type == '启动 worker') {
            options.name = 'workerrun'
            this.setState({name: 'workerrun', qiDongWorkerBtn: true, workRunModal: true})
            window.localStorage.setItem("commandName", 'workerrun')
            return false
        } else if (type == 'bench 编译') {
            options.name = 'benchcompile'
            this.setState({name: 'benchcompile', benchCompile: true, benchBianYiBtnModal: true})
            window.localStorage.setItem("commandName", 'benchcompile')
            return false
        } else if (type == 'bench 测试') {
            options.name = 'benchrun'
            this.setState({name: 'benchrun', benchceshiBtn: true, benchCeShiBtnModal: true})
            window.localStorage.setItem("commandName", 'benchrun')
            return false
        }
        console.log('options-----------', options)
        // 调用发送方函数, 处理部署
        this.props.handleDeploy(options)
    }

    handleSeeServer () {
        // 调用发送方的数据 显示服务器列表
        this.props.handleGetServerHostData()
        this.setState({isShowServerModal: true})
    }
    handleSelectServerCancel () {
        this.setState({isShowServerModal: false})
    }
    handleSelectServerOk () {
        console.log(':::::------------', this.state.selectedRows);
        if (this.state.selectedRows.length > 0) {
            this.setState({bianYiBtn: false, benchceshiBtn: false})
        }
        this.setState({isShowServerModal: false})
    }
    handleDeployRes () {
        // console.log('::::::::::-------++++++', JSON.parse(window.localStorage.getItem("commandHostList")));
        if (!window.localStorage.getItem("commandName")) {
            notification['warning']({
                message: '当前没有执行的机器'
            })
            return false
        }
        let options = {
            name: window.localStorage.getItem("commandName"),
            servers: JSON.parse(window.localStorage.getItem("commandHostList"))
        }
        // 调用发送方函数
        this.props.handleGetQueryRes(options)
    }
    handleWorkRunModalCancel () {
        this.setState({workRunModal: false})
    }
    handleWorkRunModalOk () {
        /*
        if (this.state.process == '') {
            notification['warning']({
                message: '输入框不能为空 !'
            })
            return false
        }
        */
        let options = {
            name: 'workerrun',
            process: this.state.process
        }
        // 调用发送方函数, 处理部署
        this.props.handleDeploy(options)
        this.setState({workRunModal: false})
    }
    handleWorkRunIpt (e) {
        // console.log(22222222222, e.target.value)
        this.setState({process: e.target.value})
    }

    handleBenchCeShiModalCancel () {
        this.setState({benchCeShiBtnModal: false})
    }
    handleBenchCeShiModalOk () {
        /*
        if (this.state.benchCeShiIptVal == '') {
            notification['warning']({
                message: '输入框不能为空 !'
            })
            return false
        }
        */

        let options = {
            name: 'benchrun',
            process: this.state.benchCeShiIptVal
        }
        // 调用发送方函数, 处理部署
        this.props.handleDeploy(options)
        this.setState({benchCeShiBtnModal: false})
    }
    handleBenchCeShiIpt (e) {
        this.setState({benchCeShiIptVal: e.target.value})
    }

    handleBenchBianYiModalCancel () {
        this.setState({benchBianYiBtnModal: false})
    }
    handleBenchBianYiModalOk () {
        /*
        if (this.state.benchBianYiIptVal == '') {
            notification['warning']({
                message: '输入框不能为空 !'
            })
            return false
        }
        */

        let options = {
            name: 'benchcompile',
            process: this.state.benchBianYiIptVal
        }
        // 调用发送方函数, 处理部署
        this.props.handleDeploy(options)
        this.setState({benchBianYiBtnModal: false})
    }
    handleBenchBianYiIpt (e) {
        this.setState({benchBianYiIptVal: e.target.value})
    }


    render() {
        let columns = []
        let dataSource = []
        let { serverhostlist, queryResCode, queryResName } = this.props

        if (isOneRender && queryResCode == 0 && queryResName != '') { // 执行成功 改变按钮状态
            if (queryResName == 'lotuscompile') {
                this.setState({shouHuBtn: false})
            } else if (queryResName == 'lotusdaemon') {
                this.setState({qiDongKuangGongBtn: false})
            } else if (queryResName == 'minerrun') {
                this.setState({qiDongWorkerBtn: false})
            } else if (queryResName == 'workerrun') {
                this.setState({bianYiBtn: false})
            } else if (queryResName == 'benchrun') {
                this.setState({benchCompile: false})
            } else if (queryResName == 'benchcompile') {
                this.setState({benchceshiBtn: false})
            }
            isOneRender = false
        } else if (isOneRender && queryResCode != 0 && queryResName != '') { // 执行失败 改变按钮状态
            if (queryResName == 'lotuscompile') {
                this.setState({bianYiBtn: false})
            } else if (queryResName == 'lotusdaemon') {
                this.setState({shouHuBtn: false})
            } else if (queryResName == 'minerinit') {
                this.setState({chuShiHuaKuangGongBtn: false})
            } else if (queryResName == 'minerrun') {
                this.setState({qiDongKuangGongBtn: false})
            } else if (queryResName == 'workerrun') {
                this.setState({qiDongWorkerBtn: false})
            } else if (queryResName == 'benchcompile') {
                this.setState({benchCompile: false})
            } else if (queryResName == 'benchrun') {
                this.setState({benchceshiBtn: false})
            }
            isOneRender = false
        }




        if (serverhostlist.toJS().length > 0) {
            columns = [
                {
                    title: '服务器IP地址',
                    dataIndex: 'host',
                    align: 'center',
                    key: 'host',
                    id: 'id'
                }
            ];
            dataSource = serverhostlist.toJS()
        }
        const rowSelection = { // 单选, 全选
            onChange: (selectedRowKeys, selectedRows) => {
                console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
                // 利用setState方法的回调函数, 可以实时的拿到最新的state中的值, 以用来最新的判断
                this.setState({selectedRows})
                window.localStorage.setItem("commandHostList", JSON.stringify(selectedRows))
            }
        };
        const upLoadProps = {
            directory: true,
            name: 'file',
            action: '/v7/uploadshell',
            headers: {
                authorization: 'authorization-text'
            },
            data: {},
            onChange(info) {
                if (info.file.status !== 'uploading') {
                    console.log('info.file-------', info.file);
                    console.log('info.fileList----------', info.fileList);
                    if (info.file.response != "" && info.file.response.code == 0) {
                        message.success(`${info.file.response.name} 上传成功`);
                    } else if (info.file.response != "" && info.file.response.code == 1) {
                        message.error(`${info.file.response.name} 上传失败`);
                    } else if (info.file.response != "" && info.file.response.code == 2) {
                        message.error(`配置文件不存在`);
                    } else if (info.file.response != "" && info.file.response.code == 3) {
                        message.error(`配置文件不正确`);
                    }
                }
            }
        };
        return (
            <div>
                <Layout>
                    <Breadcrumb style={{ margin: '16px 0', textAlign: 'left' }}>
                        <Breadcrumb.Item>lotus部署</Breadcrumb.Item>
                    </Breadcrumb>
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <div>
                            <Upload {...upLoadProps}>
                                <Button>
                                    <Icon type="upload" /> 脚本上传
                                </Button>
                            </Upload>
                        </div>
                        <div>
                            <Button type="primary" onClick={() => this.handleSeeServer()}>选择机器</Button>
                            <Divider type="vertical" />
                            <Button onClick={() => this.handleDeployRes()}>查看执行结果</Button>
                        </div>
                    </div>
                    <div style={{width: '100%'}}>
                        {
                            this.props.isLoading && (
                                <div style={{position: 'relative'}}>
                                    <div className='spin_wrap'>
                                        <Spin spinning={this.props.isLoading} tip='脚本执行中 ...' />
                                    </div>
                                </div>
                            )
                        }
                        <Tabs defaultActiveKey="1" onChange={this.handleCallback}>
                            <TabPane tab="部署" key="1">
                                <Button type="primary" onClick={() => this.handleDeployBtn('编译')} disabled={this.state.bianYiBtn}>编译</Button>
                                <Divider type="horizontal" />
                                <Button type="primary" onClick={() => this.handleDeployBtn('进程守护')} disabled={this.state.shouHuBtn}>进程守护</Button>
                                <Divider type="horizontal" />
                                {
                                    /*
                                    <Button type="primary" onClick={() => this.handleDeployBtn('初始化矿工')} disabled={this.state.chuShiHuaKuangGongBtn}>初始化矿工</Button>
                                    <Divider type="horizontal" />
                                     */
                                }
                                <Button type="primary" onClick={() => this.handleDeployBtn('启动矿工')} disabled={this.state.qiDongKuangGongBtn}>启动矿工</Button>
                                <Divider type="horizontal" />
                                <Button type="primary" onClick={() => this.handleDeployBtn('启动 worker')} disabled={this.state.qiDongWorkerBtn}>启动 worker</Button>
                                {/*<Button type="primary" onClick={() => this.handleDeployBtn('启动 worker')}>启动 worker</Button>*/}
                            </TabPane>

                            <TabPane tab="测试" key="2">
                                <Button type="primary" onClick={() => this.handleDeployBtn('bench 测试')} disabled={this.state.benchceshiBtn}>bench 测试</Button>
                                <Divider type="horizontal" />
                                <Button type="primary" onClick={() => this.handleDeployBtn('bench 编译')} disabled={this.state.benchCompile}>bench 编译</Button>
                            </TabPane>
                        </Tabs>
                    </div>
                    <Modal
                        title='机器信息'
                        okText='确定'
                        cancelText='取消'
                        destroyOnClose={true}
                        visible={this.state.isShowServerModal}
                        onCancel={this.handleSelectServerCancel}
                        onOk={this.handleSelectServerOk}
                    >
                        <div>
                            <Table
                                columns={columns}
                                dataSource={dataSource}
                                rowSelection={rowSelection}
                                bordered={true}
                                rowKey='id'
                                loading={
                                    {
                                        spinning: this.props.isLoading,
                                        tip: "加载中..."
                                    }
                                }
                            />
                        </div>
                    </Modal>
                    <Modal
                        okText='执行'
                        cancelText='取消'
                        destroyOnClose={true}
                        visible={this.state.workRunModal}
                        onCancel={this.handleWorkRunModalCancel}
                        onOk={this.handleWorkRunModalOk}
                    >
                        <div style={{marginTop: '20px'}}>
                            <Input placeholder="输入节点" onChange={this.handleWorkRunIpt} />
                        </div>
                    </Modal>
                    <Modal
                        okText='执行'
                        cancelText='取消'
                        destroyOnClose={true}
                        visible={this.state.benchCeShiBtnModal}
                        onCancel={this.handleBenchCeShiModalCancel}
                        onOk={this.handleBenchCeShiModalOk}
                    >
                        <div style={{marginTop: '20px'}}>
                            <Input placeholder="输入节点" onChange={this.handleBenchCeShiIpt} />
                        </div>
                    </Modal>
                    <Modal
                        okText='执行'
                        cancelText='取消'
                        destroyOnClose={true}
                        visible={this.state.benchBianYiBtnModal}
                        onCancel={this.handleBenchBianYiModalCancel}
                        onOk={this.handleBenchBianYiModalOk}
                    >
                        <div style={{marginTop: '20px'}}>
                            <Input placeholder="输入节点" onChange={this.handleBenchBianYiIpt} />
                        </div>
                    </Modal>
                </Layout>
            </div>
        )
    }
}
// 接收方
const mapStateToProps = (state) => ({
    // 获取属于home页面 store中的所有数据
    isLoading: state.get('lotusHelp').get('isLoading'),
    serverhostlist: state.get('lotusHelp').get('serverhostlist'),
    deployMsg: state.get('lotusHelp').get('deployMsg'),
    queryResName: state.get('lotusHelp').get('queryResName'),
    queryResCode: state.get('lotusHelp').get('queryResCode'),
    lotusText: state.get('lotusHelp').get('lotusText')
})
// 发送方
const mapDispatchToProps = (dispatch) => ({
    // （handleDeploy）自定义这个函数名 用这个函数名派发action
    handleGetServerHostData: () => { // 处理获取机器信息数据
        dispatch(actionCreator.handleGetServerHostDataAction())
    },
    handleDeploy: (options) => { // 处理部署操作
        dispatch(actionCreator.handleDeployAction(options))
    },
    handleGetQueryRes: (options) => { // 查询操作的返回结果
        dispatch(actionCreator.handleGetQueryResAction(options))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(LotusHelp)
