// lotus部署页面
import React, { Component } from 'react'
import { connect } from 'react-redux'
import Layout from 'common/layout/index.js'
import {Breadcrumb, Table, Divider, Tabs, Button, Modal, Spin, Upload, Icon, message, notification} from 'antd';
import "./index.css"
import { actionCreator } from './store'

const { TabPane } = Tabs;
const { confirm } = Modal

let timer = null
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
            tongBuQuKuaiBtn: true,
            chuShiHuaKuangGongBtn: true,
            qiDongKuangGongBtn: true,
            qiDongWorkerBtn: true,
            benchceshiBtn: true
        }
        this.handleDeployBtn = this.handleDeployBtn.bind(this)
        this.handleSeeServer = this.handleSeeServer.bind(this)
        this.handleSelectServerCancel = this.handleSelectServerCancel.bind(this)
        this.handleSelectServerOk = this.handleSelectServerOk.bind(this)
        this.handleDeployRes = this.handleDeployRes.bind(this)
    }
    componentDidMount() {
        // 调用发送方的数据 显示服务器列表

    }
    handleDeployBtn (type) {
        if (timer != null) {
            clearInterval(timer)
        }
        let options = {
            name: '',
            servers: this.state.selectedRows
        }
        if (type == '编译') {
            options.name = 'lotuscompile'
            this.setState({name: 'lotuscompile', bianYiBtn: true})
        } else if (type == '同步区块') {

        } else if (type == '初始化矿工') {

        } else if (type == '启动矿工') {

        } else if (type == '启动 worker') {

        } else if (type == 'bench 测试') {

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
        let options = {
            name: this.state.name,
            servers: this.state.selectedRows
        }
        // 调用发送方函数
        this.props.handleGetQueryRes(options)
    }


    render() {
        let columns = []
        let dataSource = []
        let { serverhostlist, deployMsg, name, timeOut, queryResCode } = this.props
        /*
        if (queryResCode != '' && queryResCode == 0) {
            if (name == 'lotuscompile') {
                clearInterval(timer)
                this.setState({bianYiBtn: true, chuShiHuaKuangGongBtn: false})
            }
            Modal.success({
                content: '执行成功'
            })
            clearInterval(timeOut)
            return false
        } else if (queryResCode != '' && queryResCode == 1) {
            Modal.error({
                content: '执行失败, 稍后再试 ... ',
            })
            clearInterval(timeOut)
            return false
        }
        if (timeOut != '') {
            console.log('timeOut------', timeOut)
            // 二十分钟定时循环查询操作的结果
            timer = setInterval(() => {
                let options = {
                    name: this.state.name,
                    servers: this.state.selectedRows
                }
                // 调用发送方函数
                this.props.handleGetQueryRes(options)
            }, timeOut)
        }
        */

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
            }
        };
        const upLoadProps = {
            directory: true,
            name: 'file',
            action: 'http://localhost:3003/v7/uploadshell',
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
                    } else if (info.file.response != "") {
                        message.error(`${info.file.response.name} 上传失败`);
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
                        <div style={{position: 'relative'}}>
                            <div className='spin_wrap'>
                                <Spin spinning={this.props.isLoading} tip='脚本执行中 ...' />
                            </div>
                        </div>
                        <Tabs defaultActiveKey="1" onChange={this.handleCallback}>
                            <TabPane tab="部署" key="1">
                                <Button type="primary" onClick={() => this.handleDeployBtn('编译')} disabled={this.state.bianYiBtn}>编译</Button>
                                <Divider type="horizontal" />
                                {
                                    /*
                                    <Button type="primary" onClick={() => this.handleDeployBtn('同步区块')} disabled={this.state.tongBuQuKuaiBtn}>同步区块</Button>
                                    <Divider type="horizontal" />
                                     */
                                }
                                <Button type="primary" onClick={() => this.handleDeployBtn('初始化矿工')} disabled={this.state.chuShiHuaKuangGongBtn}>初始化矿工</Button>
                                <Divider type="horizontal" />
                                <Button type="primary" onClick={() => this.handleDeployBtn('启动矿工')} disabled={this.state.qiDongKuangGongBtn}>启动矿工</Button>
                                <Divider type="horizontal" />
                                <Button type="primary" onClick={() => this.handleDeployBtn('启动 worker')} disabled={this.state.qiDongWorkerBtn}>启动 worker</Button>
                            </TabPane>

                            <TabPane tab="测试" key="2">
                                <Button type="primary" onClick={() => this.handleDeployBtn('bench 测试')} disabled={this.state.benchceshiBtn}>bench 测试</Button>
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
    name: state.get('lotusHelp').get('name'),
    lotusText: state.get('lotusHelp').get('lotusText'),
    timeOut: state.get('lotusHelp').get('timeOut'),
    queryResCode: state.get('lotusHelp').get('queryResCode')
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
    handleGetQueryRes: (options) => { // 定时查询操作的返回结果
        dispatch(actionCreator.handleGetQueryResAction(options))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(LotusHelp)
