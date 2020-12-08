// lotus命令页面
import React, { Component } from 'react'
import { connect } from 'react-redux'
import Layout from 'common/layout/index.js'
import { Breadcrumb, Table, Divider, Button, Modal, Tabs, Spin } from 'antd';
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
        let options = {
            name: ''
        }
        switch (type) {
            case 'list':
                options.name = 'lotuswalletlist'
                break
            case 'query-ask':
                options.name = 'lotusclientquery-ask'
                break
            case 'list-deals':
                options.name = 'lotusclientlist-deals'
                break
            case 'pending':
                options.name = 'lotusmpoolpending'
                break
            case 'fird':
                options.name = 'lotusmpoolfird'
                break
            case 'confis':
                options.name = 'lotusmpoolconfis'
                break
            case 'gas-perf':
                options.name = 'lotusmpoolgas-perf'
                break
            case 'prower':
                options.name = 'lotusstateprower'
                break
            case 'active-sectors':
                options.name = 'lotusstateactive-sectors'
                break
            case 'list-actrs':
                options.name = 'lotusstatelist-actrs'
                break
            case 'list-miners':
                options.name = 'lotusstatelist-miners'
                break
            case 'get-actr':
                options.name = 'lotusstateget-actr'
                break
            case 'miner-info':
                options.name = 'lotusstateminer-info'
                break
            case 'sector':
                options.name = 'lotusstatesector'
                break
            case 'read-state':
                options.name = 'lotusstateread-state'
                break
            case 'getblock':
                options.name = 'lotuschaingetblock'
                break
            case 'getmessage':
                options.name = 'lotuschaingetmessage'
                break
            case 'gas-price':
                options.name = 'lotuschaingas-price'
                break
        }

        // 调用发送方函数, 处理lotus命令
        this.props.handleLotusOrders(options)
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
        let dataSource = [];
        let columns = [];
        let { name, lotusOrderList } = this.props
        if (lotusOrderList.toJS().length > 0) {
            if (name == 'lotuswalletlist') {
                columns = [
                    {title: 'Address',dataIndex: 'address',key: 'address'},
                    {title: 'Balance',dataIndex: 'balance',key: 'balance'},
                    {title: 'Nonce',dataIndex: 'nonce',key: 'nonce'}
                ]
                dataSource = lotusOrderList.toJS()
                console.log(':::::::::--------', lotusOrderList.toJS())
            }

        }

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
                    <Table
                        columns={columns}
                        dataSource={dataSource}
                        bordered={true}
                        rowKey='id'
                        loading={
                            {
                                spinning: this.props.isLoading,
                                tip: "加载中..."
                            }
                        }
                        style={{marginTop: '30px'}}
                    />
                </Layout>
            </div>
        )
    }
}
// 接收方
const mapStateToProps = (state) => ({
    // 获取属于home页面 store中的所有数据
    isLoading: state.get('home').get('isLoading'),
    name: state.get('home').get('name'),
    lotusOrderList: state.get('home').get('lotusOrderList')
})
// 发送方
const mapDispatchToProps = (dispatch) => ({
    handleLotusOrders: (options) => {
        dispatch(actionCreator.handleLotusOrdersAction(options))
    }

})

export default connect(mapStateToProps, mapDispatchToProps)(Home)
