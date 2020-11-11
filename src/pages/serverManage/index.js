// 批量部署页面
import React, { Component } from 'react'
import { connect } from 'react-redux'
import "./index.css"
import { actionCreator } from './store'
import Layout from 'common/layout'
import { Breadcrumb, Table, Divider, Button, Modal, Input, Form, notification } from 'antd'

const { confirm } = Modal

class ServerManage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            seeVisible: false,
            editVisible: false,
            addVisible: false,
            serverId: ''
        }
        this.handleSeeShowModal = this.handleSeeShowModal.bind(this)
        this.handleSeeOk = this.handleSeeOk.bind(this)
        this.handleSeeCancel = this.handleSeeCancel.bind(this)
        this.handleEditShowModal = this.handleEditShowModal.bind(this)
        this.handleeditCancel = this.handleeditCancel.bind(this)
        this.handleEditSubmitBtn = this.handleEditSubmitBtn.bind(this)
        this.handleAddServerBtn = this.handleAddServerBtn.bind(this)
        this.handleAddCancel = this.handleAddCancel.bind(this)
        this.handleLink = this.handleLink.bind(this)
        this.handleDel = this.handleDel.bind(this)

        this.handleSubmit = this.handleSubmit.bind(this)


    }
    componentDidMount() {
        // 调用发送方的数据 显示服务器列表
        this.props.handleGetServerData()
    }
    handleSeeShowModal() { // 显示查看对话框
        this.setState({
            seeVisible: true
        })
    }
    handleSeeOk() { // 处理查看对话框中确定按钮
        this.setState({
            seeVisible: false
        })
    }
    handleSeeCancel() { // 处理查看对话框中取消按钮
        this.setState({
            seeVisible: false
        })
    }


    handleEditShowModal(record) { // 显示编辑对话框
        // console.log('::::::::::::', record);
        let { id } = record
        // 调用发送方函数, 请求数据, 进行编辑数据的回填
        this.props.handleGetEditData(id)
        this.setState({
            editVisible: true,
            serverId: id
        })
    }
    handleeditCancel() { // 处理编辑对话框中取消按钮
        this.setState({
            editVisible: false
        })
    }
    handleEditSubmitBtn() { // 处理编辑对话框中编辑按钮
        let addServerName = this.nameInput.state.value
        let addServerUserName = this.usernameInput.state.value
        let addServerPassword = this.passwordInput.state.value
        let addServerHost = this.hostInput.state.value
        let addServerPort = this.portInput.state.value
        console.log(addServerName);
        console.log(addServerUserName);
        console.log(addServerPassword);
        console.log(addServerHost);
        console.log(addServerPort);
        if (addServerName == undefined) {
            notification['warning']({
                message: 'name 不能为空 !'
            })
            return false
        } else if (addServerUserName == undefined) {
            notification['warning']({
                message: 'username 不能为空 !'
            })
        } else if (addServerPassword == undefined) {
            notification['warning']({
                message: 'password 不能为空 !'
            })
            return false
        } else if (addServerHost == undefined) {
            notification['warning']({
                message: 'host 不能为空 !'
            })
            return false
        } else if (addServerPort == undefined) {
            notification['warning']({
                message: 'port 不能为空 !'
            })
            return false
        } else {
            let options = {
                id: this.state.serverId,
                name: addServerName,
                username: addServerUserName,
                password: addServerPassword,
                host: addServerHost,
                port: addServerPort
            }
            // 调用发送方函数, 进行数据的编辑
            this.props.handleServerEdit(options)
            this.setState({
                addVisible: false
            })
        }
    }

    handleLink() { // 处理链接按钮
        console.log('点击了链接按钮')
    }

    handleDel(record) { // 处理删除按钮
        console.log('::::::::::::::', record);
        let { id } = record
        //调用发送方函数 派发action 删除点击当前的机器数据
        let { handleDelIp } = this.props
        confirm({
            title: '确定要删除这个机器吗?',
            cancelText: '取消',
            okText: '确定',
            onOk() {
                handleDelIp(id)
            },
            onCancel() {
                console.log('Cancel');
            }
        })
    }

    handleAddServerBtn() { // 处理添加服务器
        this.setState({
            addVisible: true
        })
    }
    handleAddCancel() { // 处理编辑对话框中右上角关闭按钮
        this.setState({
            addVisible: false
        })
    }

    handleSubmit() { // 处理添加对话框添加按钮
        let addServerName = this.nameInput.state.value
        let addServerUserName = this.usernameInput.state.value
        let addServerPassword = this.passwordInput.state.value
        let addServerHost = this.hostInput.state.value
        let addServerPort = this.portInput.state.value
        console.log(addServerName);
        console.log(addServerUserName);
        console.log(addServerPassword);
        console.log(addServerHost);
        console.log(addServerPort);
        if (addServerName == undefined) {
            notification['warning']({
                message: 'name 不能为空 !'
            })
            return false
        } else if (addServerUserName == undefined) {
            notification['warning']({
                message: 'username 不能为空 !'
            })
            return false
        } else if (addServerPassword == undefined) {
            notification['warning']({
                message: 'password 不能为空 !'
            })
            return false
        } else if (addServerHost == undefined) {
            notification['warning']({
                message: 'host 不能为空 !'
            })
            return false
        } else if (addServerPort == undefined) {
            notification['warning']({
                message: 'port 不能为空 !'
            })
            return false
        } else {
            let options = {
                name: addServerName,
                username: addServerUserName,
                password: addServerPassword,
                host: addServerHost,
                port: addServerPort
            }
            // 调用发送方函数, 处理添加服务器
            this.props.handleAddServer(options)
            this.setState({
                addVisible: false
            })
        }
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const { serverlist, name, username, host, port, password } = this.props
        const columns = [
            {
                title: '名称',
                dataIndex: 'name',
                key: 'name',
                id: 'id'
            },
            {
                title: '服务器别名',
                dataIndex: 'username',
                key: 'username',
                id: 'id'
            },
            {
                title: '服务器地址',
                dataIndex: 'host',
                key: 'host',
                id: 'id'
            },
            {
                title: '服务器端口',
                dataIndex: 'port',
                key: 'port',
                id: 'id'
            },
            {
                title: '服务器密码',
                dataIndex: 'password',
                key: 'password',
                id: 'id'
            },
            {
                title: '操作',
                align: 'center',
                id: 'id',
                render: (is_valid, record) => (
                    <span>
                        {
                            /*
                                <Button type="primary" onClick={() => { this.handleSeeShowModal(record) }} className="bottom1">查看</Button>
                                <Divider type="vertical" />
                            */
                        }
                        <Button type="primary" onClick={() => { this.handleEditShowModal(record) }} className="bottom2">编辑</Button>
                        <Divider type="vertical" />
                        <Button type="primary" onClick={() => { this.handleLink(record) }} className="bottom2">链接</Button>
                        <Divider type="vertical" />
                        <Button type="danger" onClick={() => { this.handleDel(record) }} className="bottom2">删除</Button>
                    </span>
                )
            }
        ];
        const dataSource = serverlist.toJS()


        return (
            <div className="News">
                <Layout>
                    <Breadcrumb style={{ margin: '16px 0', textAlign: 'left', fontSize: '16px' }}>
                        <Breadcrumb.Item>服务器管理</Breadcrumb.Item>
                    </Breadcrumb>
                    <div style={{ textAlign: 'right', marginBottom: '15px' }}>
                        <Button type="primary" onClick={this.handleAddServerBtn} className="bottom2">添加</Button>
                    </div>
                    <div className="content">
                        <div>
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
                            />
                        </div>
                        <div>
                            <Modal
                                title="查看"
                                visible={this.state.seeVisible}
                                onOk={this.handleSeeOk}
                                onCancel={this.handleSeeCancel}
                                footer={null}
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
                                onCancel={this.handleeditCancel}
                                footer={null}
                            >
                                <div>
                                    <Form.Item label="name">
                                        {getFieldDecorator('name', {
                                            initialValue: name
                                        })(<Input ref={input => this.nameInput = input} placeholder="name" />)}
                                    </Form.Item>
                                    <Form.Item label="username">
                                        {getFieldDecorator('username', {
                                            initialValue: username
                                        })(<Input ref={input => this.usernameInput = input} placeholder="username" />)}
                                    </Form.Item>
                                    <Form.Item label="password">
                                        {getFieldDecorator('password', {
                                            initialValue: password
                                        })(<Input ref={input => this.passwordInput = input} placeholder="password" />)}
                                    </Form.Item>
                                    <Form.Item label="host">
                                        {getFieldDecorator('host', {
                                            initialValue: host
                                        })(<Input ref={input => this.hostInput = input} placeholder="host" />)}
                                    </Form.Item>
                                    <Form.Item label="port">
                                        {getFieldDecorator('port', {
                                            initialValue: port
                                        })(<Input ref={input => this.portInput = input} placeholder="port" />)}
                                    </Form.Item>
                                    <Form.Item>
                                        <Button type="primary" onClick={this.handleEditSubmitBtn}>
                                            编辑
                                        </Button>
                                    </Form.Item>
                                </div>
                            </Modal>
                        </div>
                        <div>
                            <Modal
                                title="添加"
                                visible={this.state.addVisible}
                                onCancel={this.handleAddCancel}
                                footer={null}
                            >
                                <div>
                                    <Form.Item label="name">
                                        <Input ref={input => this.nameInput = input} placeholder="name" />
                                    </Form.Item>
                                    <Form.Item label="username">
                                        <Input ref={input => this.usernameInput = input} placeholder="username" />
                                    </Form.Item>
                                    <Form.Item label="password">
                                        <Input ref={input => this.passwordInput = input} placeholder="password" />
                                    </Form.Item>
                                    <Form.Item label="host">
                                        <Input ref={input => this.hostInput = input} placeholder="host" />
                                    </Form.Item>
                                    <Form.Item label="port">
                                        <Input ref={input => this.portInput = input} placeholder="port" />
                                    </Form.Item>
                                    <Form.Item>
                                        <Button type="primary" onClick={this.handleSubmit}>
                                            添加
                                        </Button>
                                    </Form.Item>
                                </div>
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
    isLoading: state.get('serverManage').get('isLoading'),
    serverlist: state.get('serverManage').get('serverlist'),
    name: state.get('serverManage').get('name'),
    username: state.get('serverManage').get('username'),
    host: state.get('serverManage').get('host'),
    port: state.get('serverManage').get('port'),
    password: state.get('serverManage').get('password')
})


// 发送方
const mapDispatchToProps = (dispatch) => ({
    handleGetServerData: () => { // 处理获取服务器数据列表
        dispatch(actionCreator.handleGetServerDataAction())
    },
    handleAddServer: (options) => { // 处理添加服务器页面 添加服务器功能
        dispatch(actionCreator.handleAddServerAction(options))
    },
    handleGetEditData: (id) => { // 处理添加服务器页面, 编辑数据的回填
        dispatch(actionCreator.handleGetEditDataAction(id))
    },
    handleServerEdit: (options) => { // 处理添加服务器页面 编辑服务器功能
        dispatch(actionCreator.handleServerEditAction(options))
    },
    handleDelIp: (id) => {//处理删除机器功能
        dispatch(actionCreator.handleDelIpAction(id))
    }

})

const WrappedDynamicRule = Form.create()(ServerManage);
export default connect(mapStateToProps, mapDispatchToProps)(WrappedDynamicRule)