// lotus命令页面
import React, { Component } from 'react'
import { connect } from 'react-redux'
import Layout from 'common/layout/index.js'
import { Breadcrumb, Table, Divider, Tag, Button, Modal, Tabs } from 'antd';
import "./index.css"
import { actionCreator } from './store'

const { TabPane } = Tabs;


class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: '',
            visible: false,
            modalType: ''
        }

        this.handleServerBtn = this.handleServerBtn.bind(this)
        this.handleCancel = this.handleCancel.bind(this)
        this.handleCallback = this.handleCallback.bind(this)
    }
    componentDidMount() {
        // 在生命周期调用发送方的数据
        // this.props.handleGetMinerList()
    }

    // ------------------------------------
    handleServerBtn(type) { // 所有按钮的点击事件
        this.setState({
            visible: true,
            modalType: type
        })
    }
    handleCancel() { // 关闭对话框函数
        this.setState({
            visible: false
        })
    }
    handleCallback(e) { // 切换tab函数
        console.log(e);
    }
    // -----------------------------------





    render() {
        return (
            <div>
                <Layout>
                    <Breadcrumb style={{ margin: '16px 0', textAlign: 'left', fontSize: '20px' }}>
                        <Breadcrumb.Item>lotus命令</Breadcrumb.Item>
                    </Breadcrumb>
                    <div>
                        <Tabs defaultActiveKey="1" onChange={this.handleCallback}>
                            <TabPane tab="lotus wallet" key="1">
                                <Button type="primary" onClick={() => this.handleServerBtn("list")}>list</Button>
                            </TabPane>

                            <TabPane tab="lotus client" key="2">
                                <Button type="primary" onClick={() => this.handleServerBtn("query-ask")}>query-ask</Button>
                                <Divider type="vertical" />
                                <Button type="primary" onClick={() => this.handleServerBtn("list-deals")}>list-deals</Button>
                            </TabPane>

                            <TabPane tab="lotus mpool" key="3">
                                <Button type="primary" onClick={() => this.handleServerBtn("pending")}>pending</Button>
                                <Divider type="vertical" />
                                <Button type="primary" onClick={() => this.handleServerBtn("fird")}>fird</Button>
                                <Divider type="vertical" />
                                <Button type="primary" onClick={() => this.handleServerBtn("confis")}>confis</Button>
                                <Divider type="vertical" />
                                <Button type="primary" onClick={() => this.handleServerBtn("gas-perf")}>gas-perf</Button>
                            </TabPane>

                            <TabPane tab="lotus state" key="4">
                                <Button type="primary" onClick={() => this.handleServerBtn("prower")}>prower</Button>
                                <Divider type="vertical" />
                                <Button type="primary" onClick={() => this.handleServerBtn("active-sectors")}>active-sectors</Button>
                                <Divider type="vertical" />
                                <Button type="primary" onClick={() => this.handleServerBtn("list-actrs")}>list-actrs</Button>
                                <Divider type="vertical" />
                                <Button type="primary" onClick={() => this.handleServerBtn("list-miners")}>list-miners</Button>
                                <Divider type="vertical" />
                                <Button type="primary" onClick={() => this.handleServerBtn("get-actr")}>get-actr</Button>
                                <Divider type="vertical" />
                                <Button type="primary" onClick={() => this.handleServerBtn("miner-info")}>miner-info</Button>
                                <Divider type="vertical" />
                                <Button type="primary" onClick={() => this.handleServerBtn("sector")}>sector</Button>
                                <Divider type="vertical" />
                                <Button type="primary" onClick={() => this.handleServerBtn("read-state")}>read-state</Button>
                            </TabPane>

                            <TabPane tab="lotus chain" key="5">
                                <Button type="primary" onClick={() => this.handleServerBtn("getblock")}>getblock</Button>
                                <Divider type="vertical" />
                                <Button type="primary" onClick={() => this.handleServerBtn("getmessage")}>getmessage</Button>
                                <Divider type="vertical" />
                                <Button type="primary" onClick={() => this.handleServerBtn("gas-price")}>gas-price</Button>
                            </TabPane>
                        </Tabs>
                    </div>

                    <Modal
                        title={this.state.modalType}
                        visible={this.state.visible}
                        onCancel={this.handleCancel}
                        footer={null}
                    >
                        <p>随便写点什么...</p>
                        <p>Some contents...</p>
                        <p>Some contents...</p>
                    </Modal>
                </Layout>
            </div>
        )
    }
}
// 接收方
const mapStateToProps = (state) => ({
    // 获取属于home页面 store中的所有数据
    // minerList: state.get('home').get('minerList')
})
// 发送方
const mapDispatchToProps = (dispatch) => ({
    // （handleGetMinerList）自定义这个函数名 用这个函数名派发action
    /*
    handleGetMinerList: () => {
        dispatch(actionCreator.handleMinerlistAction())
    }
     */
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)
