// 批量部署页面
import React, { Component } from 'react'
import { connect } from 'react-redux'
import "./index.css"
import { actionCreator } from './store'
import Layout from 'common/layout'
import { Breadcrumb, Table, Divider, Button, Modal, Input, Form } from 'antd'

class ServerManage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            seeVisible: false,
            editVisible: false
        }
        this.handleSeeShowModal = this.handleSeeShowModal.bind(this)
        this.handleSeeOk = this.handleSeeOk.bind(this)
        this.handleSeeCancel = this.handleSeeCancel.bind(this)
        this.handleEditShowModal = this.handleEditShowModal.bind(this)
        this.handleeditOk = this.handleeditOk.bind(this)
        this.handleeditCancel = this.handleeditCancel.bind(this)
        this.handleLink = this.handleLink.bind(this)
        this.handleDel = this.handleDel.bind(this)
    }
    componentDidMount() {
        // 调用发送方的数据 显示消息列表

    }
    handleSeeShowModal () { // 显示查看对话框
        this.setState({
            seeVisible: true
        })
    }
    handleSeeOk () { // 处理查看对话框中确定按钮
        this.setState({
            seeVisible: false
        })
    }
    handleSeeCancel () { // 处理查看对话框中取消按钮
        this.setState({
            seeVisible: false
        })
    }


    handleEditShowModal () { // 显示编辑对话框
        this.setState({
            editVisible: true
        })
    }
    handleeditOk () { // 处理编辑对话框中确定按钮
        this.setState({
            editVisible: false
        })
    }
    handleeditCancel () { // 处理编辑对话框中取消按钮
        this.setState({
            editVisible: false
        })
    }

    handleLink () { // 处理链接按钮
        alert('链接按钮')
    }
    handleDel () { // 处理删除按钮
        alert('删除按钮')
    }
    render() {
        const columns = [
            {
                title: '服务器别名',
                dataIndex: 'serverName',
                key: 'serverName',
            },
            {
                title: '服务器地址',
                dataIndex: 'serverAddress',
                key: 'serverAddress',
            },
            {
                title: '登录用户名',
                dataIndex: 'loginName',
                key: 'loginName',
            },
            {
                title: '操作',
                align: 'center',
                render: (is_valid, record) => (
                    <span>
                        <Button type="primary" onClick={() => { this.handleSeeShowModal(record) }} className="bottom1">查看</Button>
                        <Divider type="vertical" />
                        <Button type="primary" onClick={() => { this.handleEditShowModal(record) }} className="bottom2">编辑</Button>
                        <Divider type="vertical" />
                        <Button type="primary" onClick={() => { this.handleLink(record) }} className="bottom2">链接</Button>
                        <Divider type="vertical" />
                        <Button type="danger" onClick={() => { this.handleDel(record) }} className="bottom2">删除</Button>
                    </span>
                )
            }
        ];
        const dataSource = [
            {
                key: '1',
                serverName: 't001',
                serverAddress: '192.168.1.63',
                loginName: 'admin'
            },
            {
                key: '2',
                serverName: 't002',
                serverAddress: '192.168.1.63',
                loginName: 'admin'
            },
        ];


        return (
            <div className="News">
                <Layout>
                    <Breadcrumb style={{ margin: '16px 0', textAlign: 'left', fontSize: '16px' }}>
                        <Breadcrumb.Item>服务器管理</Breadcrumb.Item>
                    </Breadcrumb>
                    <div className="content">
                        <div>
                            <Table
                                columns={columns}
                                dataSource={dataSource}
                                bordered={true}
                                rowKey='id'
                                /*
                                loading={
                                    {
                                        spinning: this.props.isLoading,
                                        tip: "加载中..."
                                    }
                                }
                                 */
                            />
                        </div>
                        <div>
                            <Modal
                                title="查看"
                                visible={this.state.seeVisible}
                                onOk={this.handleSeeOk}
                                onCancel={this.handleSeeCancel}
                            >
                                <p>Some contents...</p>
                                <p>Some contents...</p>
                                <p>Some contents...</p>
                            </Modal>
                        </div>
                        <div>
                            <Modal
                                title="编辑"
                                visible={this.state.editVisible}
                                onOk={this.handleeditOk}
                                onCancel={this.handleeditCancel}
                            >
                                <p>Some contents...</p>
                                <p>Some contents...</p>
                                <p>Some contents...</p>
                            </Modal>
                        </div>
                    </div>
                </Layout>
            </div>
        );
    }
}

// 接收方
const mapStateToProps = (state) => ({
    // deploy: state.get('deploy').get('newslist')
})


// 发送方
const mapDispatchToProps = (dispatch) => ({
    /*
    hendleNewsList: () => {//处理消息页面 消息数据展示功能
        dispatch(actionCreator.hendleNewsListAction())
    }
     */
})

const WrappedDynamicRule = Form.create()(ServerManage);
export default connect(mapStateToProps, mapDispatchToProps)(WrappedDynamicRule)