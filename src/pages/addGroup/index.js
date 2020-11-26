// 添加组页面
import React, { Component } from 'react'
import { connect } from 'react-redux'
import "./index.css"
import { actionCreator } from './store'
import Layout from 'common/layout'
import { Breadcrumb, Table, Divider, Button, Modal, Input, Form, Tree, message } from 'antd'
const { TreeNode } = Tree;


class AddGroup extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedRows: [],
            editVisible: false,
            addGroupVisible: false,
            groupName: ''
        }
        this.handleAddGroup = this.handleAddGroup.bind(this)
        this.handleDistributionGroup = this.handleDistributionGroup.bind(this)
        this.handleeditCancel = this.handleeditCancel.bind(this)
        this.handleEditShowModal = this.handleEditShowModal.bind(this)
        this.handleEditSubmitBtn = this.handleEditSubmitBtn.bind(this)
        this.handleAddGroupCancel = this.handleAddGroupCancel.bind(this)
        this.handleDel = this.handleDel.bind(this)
        this.handleAddGroupBtn = this.handleAddGroupBtn.bind(this)
        this.onSelectGroup = this.onSelectGroup.bind(this)
        this.onCheckGroup = this.onCheckGroup.bind(this)
    }
    componentDidMount() {
        // 调用发送方的数据 显示服务器列表
        this.props.handleGetServerHostData()
        // 调用发送方的数据 显示组名列表
        // this.props.handleGetGroupList()
    }
    // -------------------------------------------------处理显示添加组弹出框功能---------------------------------------------------
    handleAddGroup () {
        this.setState({
            addGroupVisible: true
        })
    }
    // -------------------------------------------------处理关闭添加组弹出框功能---------------------------------------------------
    handleAddGroupCancel () {
        this.setState({
            addGroupVisible: false
        })
    }
    // -------------------------------------------------处理添加组弹出框中添加按钮功能---------------------------------------------------
    handleAddGroupBtn () {
        const { selectedRows } = this.state
        let groupname = this.groupNameInput.state.value
        // console.log(11111111111, this.groupNameInput.state.value);
        // console.log('添加按钮---------', selectedRows)
        if (selectedRows.length == 0) {
            message.error("请选择需要的ip !")
            return false
        } else if (groupname == '') {
            message.error("输入框不能为空 !")
            return false
        } else {
            let options = {
                ipAddress: selectedRows,
                groupname
            }
            console.log(111111111, options);
            // 调用发送方函数, 处理添加组名
            this.props.handleAddGroupName(options)
        }

    }
    // -------------------------------------------------处理分配组按钮功能---------------------------------------------------
    handleDistributionGroup () {
        console.log('222222222222', '点击了分配组按钮')
    }
    // -------------------------------------------------处理显示编辑弹出框功能---------------------------------------------------
    handleEditShowModal () {
        this.setState({
            editVisible: true
        })
    }
    // -------------------------------------------------处理关闭编辑弹出框功能---------------------------------------------------
    handleeditCancel () {
        this.setState({
            editVisible: false
        })
    }
    // -------------------------------------------------处理编辑弹出框中编辑功能---------------------------------------------------
    handleEditSubmitBtn () {
        console.log('::::::::::::::编辑按钮');
    }
    // -------------------------------------------------处理删除按钮功能---------------------------------------------------
    handleDel(record) { // 处理删除按钮
        console.log('::::::::::::::删除');
        return
        console.log('::::::::::::::', record);
        let { id } = record
        //调用发送方函数 派发action 删除点击当前的机器数据
        let { handleDel } = this.props
        confirm({
            title: '确定要删除吗?',
            cancelText: '取消',
            okText: '确定',
            onOk() {
                handleDel(id)
            },
            onCancel() {
                console.log('Cancel');
            }
        })
    }
    // -------------------------------------------------处理组名折叠功能---------------------------------------------------
    onSelectGroup (selectedKeys, info) {
        console.log('selected', selectedKeys, info);
    };
    // -------------------------------------------------处理组名全选/单选功能---------------------------------------------------
    onCheckGroup(checkedKeys, info) {
        console.log('onCheck', checkedKeys, info);
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        const { serverhostlist } = this.props

        const columns = [
            {
                title: '服务器IP地址',
                dataIndex: 'host',
                align: 'center',
                key: 'host',
                id: 'id'
            }
        ];
        const dataSource = serverhostlist.toJS()

        const columns2 = [
            {
                title: '组名',
                dataIndex: 'name',
                key: 'name',
                render: (name, record) => (
                    <div>
                        <Tree
                            checkable
                            onSelect={this.onSelectGroup}
                            onCheck={this.onCheckGroup}
                        >
                            <TreeNode title={name.title} key="0-0">
                                {
                                    name.data.map((item, index) => {
                                        return (
                                            <TreeNode title={item} key={index} name={name.username} pass={name.password} />
                                        )
                                    })
                                }
                            </TreeNode>
                        </Tree>
                    </div>
                )
            },
            {
                title: '操作',
                align: 'center',
                width: '300px',
                id: 'id',
                render: (is_valid, record) => (
                    <span>
                        <Button type="primary" onClick={() => { this.handleEditShowModal(record) }} className="bottom2">编辑</Button>
                        <Divider type="vertical" />
                        <Button type="primary" onClick={() => { this.handleDistributionGroup(record) }} className="bottom2">分配组</Button>
                        <Divider type="vertical" />
                        <Button type="danger" onClick={() => { this.handleDel(record) }} className="bottom2">删除</Button>
                    </span>
                )
            }
        ];
        const dataSource2 = [
            {
                key: '1',
                name: {
                    username: 'qqq',
                    password: '12312',
                    title: 'AMD',
                    data: ['123.123.12.1', '123.123.12.1', '123.123.12.1', '123.123.12.1', '123.123.12.1', '123.123.12.1']
                }
            },
            {
                key: '2',
                name: {
                    username: 'rrrrr',
                    password: '12312',
                    title: '英特尔',
                    data: ['321.321.12.1', '321.321.12.1', '321.321.12.1', '321.321.12.1', '321.321.12.1', '321.321.12.1']
                }
            }
        ]

        const rowSelection = { // 单选, 全选
            onChange: (selectedRowKeys, selectedRows) => {
                console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
                const { ipAddress } = this.state
                // 利用setState方法的回调函数, 可以实时的拿到最新的state中的值, 以用来最新的判断
                this.setState({selectedRows})
            }
        };

        return (
            <div className="News">
                <Layout>
                    <Breadcrumb style={{ margin: '16px 0', textAlign: 'left', fontSize: '16px' }}>
                        <Breadcrumb.Item>添加组</Breadcrumb.Item>
                    </Breadcrumb>
                    <div style={{ textAlign: 'right', marginBottom: '15px' }}>
                        <Button type="primary" onClick={this.handleAddGroup} className="bottom2">添加组</Button>
                    </div>
                    <div className="content">
                        <div className='content_wrap'>
                            <div className='ip_table_box table_box'>
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
                            <div className='table_box'>
                                <Table
                                    columns={columns2}
                                    dataSource={dataSource2}
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
                                    title="添加组"
                                    visible={this.state.addGroupVisible}
                                    onCancel={this.handleAddGroupCancel}
                                    footer={null}
                                >
                                    <div>
                                        <Form.Item label="name">
                                            <Input ref={input => this.groupNameInput = input} placeholder="输入组名" />
                                        </Form.Item>
                                        <Form.Item>
                                            <Button type="primary" onClick={this.handleAddGroupBtn}>
                                                添加
                                            </Button>
                                        </Form.Item>
                                    </div>
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
                                                initialValue: ''
                                            })(<Input ref={input => this.nameInput = input} placeholder="组名" />)}
                                        </Form.Item>
                                        <Form.Item>
                                            <Button type="primary" onClick={this.handleEditSubmitBtn}>
                                                编辑
                                            </Button>
                                        </Form.Item>
                                    </div>
                                </Modal>
                            </div>
                        </div>
                    </div>
                </Layout>
            </div>
        );
    }
}

// 接收方
const mapStateToProps = (state) => ({
    isLoading: state.get('ipssh').get('isLoading'),
    serverhostlist: state.get('ipssh').get('serverhostlist')
})


// 发送方
const mapDispatchToProps = (dispatch) => ({
    handleGetServerHostData: () => { // 处理获取服务器数据列表
        dispatch(actionCreator.handleGetServerHostDataAction())
    },
    handleGetGroupList: () => { // 处理获取组名数据列表
        dispatch(actionCreator.handleGetGroupListAction())
    },
    handleAddGroupName: (options) => { // 处理添加组名
        dispatch(actionCreator.handleAddGroupNameAction(options))
    }
})
const WrappedDynamicRule = Form.create()(AddGroup);
export default connect(mapStateToProps, mapDispatchToProps)(WrappedDynamicRule)