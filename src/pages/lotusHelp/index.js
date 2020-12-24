// lotus部署页面
import React, { Component } from 'react'
import { connect } from 'react-redux'
import Layout from 'common/layout/index.js'
import {Breadcrumb, Table, Divider, Tabs, Button, Modal} from 'antd';
import "./index.css"
import { actionCreator } from './store'

const { TabPane } = Tabs;

class LotusHelp extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: '',
            visible: false,
            modalType: '',
            isShowServerModal: false,
            selectedRows: []
        }
        this.handleCompileBtn = this.handleCompileBtn.bind(this)
        this.handleModalBtn = this.handleModalBtn.bind(this)
        this.handleCancel = this.handleCancel.bind(this)
        this.handleSeeServer = this.handleSeeServer.bind(this)
        this.handleSelectServerCancel = this.handleSelectServerCancel.bind(this)
        this.handleSelectServerOk = this.handleSelectServerOk.bind(this)
    }
    componentDidMount() {
        // 调用发送方的数据 显示服务器列表

    }
    handleCompileBtn () {
        console.log('编译按钮---------')
    }
    handleModalBtn (type) {
        this.setState({
            modalType: type,
            visible: true
        })
    }
    handleCancel () {
        this.setState({visible: false})
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
        console.log(':::::_-----------', this.state.selectedRows);
        this.setState({isShowServerModal: false})
    }


    render() {
        let columns = []
        let dataSource = []
        let { serverhostlist } = this.props
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

        return (
            <div>
                <Layout>
                    <Breadcrumb style={{ margin: '16px 0', textAlign: 'left' }}>
                        <Breadcrumb.Item>lotus部署</Breadcrumb.Item>
                    </Breadcrumb>
                    <div style={{textAlign: 'right'}}>
                        <Button type="primary" onClick={() => this.handleSeeServer()}>查看机器信息</Button>
                    </div>
                    <div>
                        <Tabs defaultActiveKey="1" onChange={this.handleCallback}>
                            <TabPane tab="部署" key="1">
                                <Button type="primary" onClick={() => this.handleModalBtn('编译')}>编译</Button>
                                <Divider type="horizontal" />
                                <Button type="primary" onClick={() => this.handleModalBtn('同步区块')}>同步区块</Button>
                                <Divider type="horizontal" />
                                <Button type="primary" onClick={() => this.handleModalBtn('初始化矿工')}>初始化矿工</Button>
                                <Divider type="horizontal" />
                                <Button type="primary" onClick={() => this.handleModalBtn('启动矿工')}>启动矿工</Button>
                                <Divider type="horizontal" />
                                <Button type="primary" onClick={() => this.handleModalBtn('启动 worker')}>启动 worker</Button>
                            </TabPane>

                            <TabPane tab="测试" key="2">
                                <Button type="primary" onClick={() => this.handleModalBtn('bench 测试')}>bench 测试</Button>
                            </TabPane>
                        </Tabs>
                    </div>
                    <Modal
                        title={this.state.modalType}
                        visible={this.state.visible}
                        onCancel={this.handleCancel}
                        footer={null}
                    >
                        <p>lotus</p>
                    </Modal>
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
                                style={{marginTop: '15px'}}
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
    serverhostlist: state.get('lotusHelp').get('serverhostlist')
})
// 发送方
const mapDispatchToProps = (dispatch) => ({
    // （handleGetMinerList）自定义这个函数名 用这个函数名派发action
    handleGetServerHostData: () => { // 处理获取服务器数据列表
        dispatch(actionCreator.handleGetServerHostDataAction())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(LotusHelp)
