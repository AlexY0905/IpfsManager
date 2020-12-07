// lotus部署页面
import React, { Component } from 'react'
import { connect } from 'react-redux'
import Layout from 'common/layout/index.js'
import {Breadcrumb, Table, Divider, Tag, Button, Modal} from 'antd';
import "./index.css"
import { actionCreator } from './store'

class LotusHelp extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: '',
            visible: false,
            modalType: ''
        }
        this.handleCompileBtn = this.handleCompileBtn.bind(this)
        this.handleModalBtn = this.handleModalBtn.bind(this)
        this.handleCancel = this.handleCancel.bind(this)
    }
    componentDidMount() {
        // 在生命周期调用发送方的数据
        // this.props.handleGetMinerList()
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


    render() {
        return (
            <div>
                <Layout>
                    <Breadcrumb style={{ margin: '16px 0', textAlign: 'left' }}>
                        <Breadcrumb.Item>lotus部署</Breadcrumb.Item>
                    </Breadcrumb>
                    <div>
                        {/*我是lotus部署页*/}
                        <Button type="primary" onClick={() => this.handleCompileBtn()}>编译</Button>
                        <Divider type="horizontal" />
                        <Button type="primary" onClick={() => this.handleModalBtn('同步区块')}>同步区块</Button>
                        <Divider type="horizontal" />
                        <Button type="primary" onClick={() => this.handleModalBtn('初始化矿工')}>初始化矿工</Button>
                        <Divider type="horizontal" />
                        <Button type="primary" onClick={() => this.handleModalBtn('启动矿工')}>启动矿工</Button>
                        <Divider type="horizontal" />
                        <Button type="primary" onClick={() => this.handleModalBtn('启动 worker')}>启动 worker</Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(LotusHelp)
