// LotusMiner页面
import React, { Component } from 'react'
import { connect } from 'react-redux'
import Layout from 'common/layout/index.js'
import { Breadcrumb, Table, Divider, Button, Modal, Tabs } from 'antd';
import "./index.css"
import { actionCreator } from './store'

const { TabPane } = Tabs;


class LotusMiner extends Component {
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
                options.name = 'storage-dealslist'
                break
            case 'get-ask':
                options.name = 'storage-dealsget-ask'
                break
            case 'list-cids':
                options.name = 'pieceslist-cids'
                break
            case 'cid-info':
                options.name = 'piecescid-info'
                break
            case 'list':
                options.name = 'sectorslist'
                break
            case 'status':
                options.name = 'sectorsstatus'
                break
        }

        // 调用发送方函数, 处理lotus命令
        // this.props.handleLotusOrders(options)
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
        let columns = []
        let dataSource = []
        let { lotusOrderList } = this.props
        if (lotusOrderList.toJS().length > 0) {
            console.log(':::::::::--------', lotusOrderList.toJS())
        }


        return (
            <div>
                <Layout>
                    <Breadcrumb style={{ margin: '16px 0', textAlign: 'left', fontSize: '20px' }}>
                        <Breadcrumb.Item>LotusMiner</Breadcrumb.Item>
                    </Breadcrumb>
                    <div>
                        <Tabs defaultActiveKey="1" onChange={this.handleCallback}>
                            <TabPane tab="storage-deals" key="1">
                                <Button type="primary" onClick={() => this.handleServerBtn("list")}>list</Button>
                                <Divider type="vertical" />
                                <Button type="primary" onClick={() => this.handleServerBtn("get-ask")}>get-ask</Button>
                            </TabPane>

                            <TabPane tab="pieces" key="2">
                                <Button type="primary" onClick={() => this.handleServerBtn("list-cids")}>list-cids</Button>
                                <Divider type="vertical" />
                                <Button type="primary" onClick={() => this.handleServerBtn("cid-info")}>cid-info</Button>
                            </TabPane>

                            <TabPane tab="sectors" key="3">
                                <Button type="primary" onClick={() => this.handleServerBtn("list")}>list</Button>
                                <Divider type="vertical" />
                                <Button type="primary" onClick={() => this.handleServerBtn("status")}>status</Button>
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
    // 获取属于lotusMiner页面 store中的所有数据
    isLoading: state.get('lotusMiner').get('isLoading'),
    lotusOrderList: state.get('lotusMiner').get('lotusOrderList')
})
// 发送方
const mapDispatchToProps = (dispatch) => ({
    handleLotusOrders: (options) => {
        dispatch(actionCreator.handleLotusOrdersAction(options))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(LotusMiner)
