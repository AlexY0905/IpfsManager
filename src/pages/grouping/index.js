// 分组批量命令页面
import React, { Component } from 'react'
import { connect } from 'react-redux'
import "./index.css"
import { actionCreator } from './store'
import Layout from 'common/layout'
import {
    Breadcrumb,
    Table,
    Divider,
    Button,
    Modal,
    Input,
    Form,
    Icon,
    message,
    Tree,
    Upload
} from 'antd'
const { TextArea } = Input;
const { TreeNode } = Tree;


class Grouping extends Component {
    constructor(props) {
        super(props)
        this.textAreaIpt = React.createRef()
        this.state = {
            textAreaVal: '',
            selectedRows: [],
            fileAddress: '',
            upLoadDisable: true,
            downLoadFileAddress: '',
            downLoadBtnDisable: true,
            ipAddress: [],
            delSelectedList: []
        }
        this.pressEnter = this.pressEnter.bind(this)
        this.handlefileAddress = this.handlefileAddress.bind(this)
        this.handleUpLoadBtn = this.handleUpLoadBtn.bind(this)
        this.handleDownLoadFile = this.handleDownLoadFile.bind(this)
        this.handleDownLoadfileAddress = this.handleDownLoadfileAddress.bind(this)
        this.onSelectGroup = this.onSelectGroup.bind(this)
        this.onCheckGroup = this.onCheckGroup.bind(this)
    }
    componentDidMount() {
        // 调用发送方的数据 显示服务器列表
        // this.props.handleGetServerHostData()
        // 调用发送方的数据 显示组名列表
        this.props.handleGetGroupList()
    }
    // -------------------------------------------------批量命令功能---------------------------------------------------
    pressEnter(e) { // 处理命令输入框的回车事件
        // 获取文本框中的值
        console.log(11111111111, e.target.value)
        let { delSelectedList } = this.state
        if (e.target.value == '') {
            message.error('指令不能为空 !')
            return false
        } else if (delSelectedList.length == 0) {
            message.error('请选择需要的 ip')
            return false
        }
        delSelectedList.forEach((item, index) => {
            if (item['children']) {
                delSelectedList.splice(index, 1)
            }
        })
        let options = {
            servers: delSelectedList,
            cmds: e.target.value
        }
        // 清空文本输入框
        // this.textAreaIpt.current.state.value = ''
        // 调用发送方函数, 处理服务器的批量命令
        console.log(111111111111, options)
        this.props.handleIpSsh(options)
    }
    // -------------------------------------------------文件上传功能-----------------------------------------------------
    handlefileAddress(e) { // 获取上传地址输入框中数据 
        console.log(111111111111, e.target.value)
        // 利用setState方法的回调函数, 可以实时的拿到最新的state中的值, 以用来最新的判断
        this.setState({ fileAddress: e.target.value, upLoadDisable: false }, () => {
            // 改变状态的时候做个判断 如果输入框为空 就禁止上传 否则就可以上传
            if (this.state.fileAddress == '') { // 上传地址为空
                this.setState({ // 改变上传按钮的状态, 设置为禁止上传状态
                    upLoadDisable: true
                })
            } else { // 上传地址不为空
                this.setState({ // 改变上传按钮的状态, 设置为允许上传状态
                    upLoadDisable: false
                })
            }
        })

    }
    handleUpLoadBtn() { // 处理上传按钮的点击事件
        const { fileAddress, delSelectedList } = this.state
        if (fileAddress == '') { // 判断有没有填写上传的地址, 如果没有, 就提示用户信息
            message.error('请填写文件上传的地址')
            return false
        } else if (delSelectedList.length == 0) { // 判断有没有选中ip地址, 如果没有, 就提示用户信息
            message.error('请选中需要上传的ip')
            return false
        } else { // 填写了上传地址和选中了需要上传的ip
            // 调用发送方, 处理文件上传
            let options = {
                path: fileAddress,
                ipAddress: delSelectedList
            }
            console.log(222222222222, options);
            this.props.handleUpLoadFile(options)
        }
    }
    // -------------------------------------------------文件下载功能-----------------------------------------------------
    handleDownLoadfileAddress(e) { // 获取下载地址输入框中数据
        console.log(2222222222, e.target.value)
        // 利用setState方法的回调函数, 可以实时的拿到最新的state中的值, 以用来最新的判断
        this.setState({ downLoadFileAddress: e.target.value, downLoadBtnDisable: false }, () => {
            // 改变状态的时候做个判断 如果输入框为空 就禁止下载 否则就可以下载
            if (this.state.downLoadFileAddress == '') { // 下载地址为空
                this.setState({
                    downLoadBtnDisable: true // 改变下载按钮的状态, 设置为禁止下载状态
                })
            } else { // 下载地址不为空
                this.setState({
                    downLoadBtnDisable: false // 改变下载按钮的状态, 设置为允许下载状态
                })
            }
        })
    }
    handleDownLoadFile() { // 处理下载文件按钮的点击事件
        const { downLoadFileAddress, delSelectedList } = this.state
        if (downLoadFileAddress == '') { // 判断有没有填写下载的地址, 如果没有, 就提示用户信息
            message.error('请填写文件下载的地址')
            return false
        } else if (delSelectedList.length == 0) { // 判断有没有选中ip地址, 如果没有, 就提示用户信息
            message.error('请选中需要下载的ip')
            return false
        } else { // 判断有没有填写下载的地址, 如果有, 就调用发送方函数, 处理文件的下载
            // 调用发送方, 处理文件上传
            let options = {
                path: downLoadFileAddress,
                ipAddress: delSelectedList
            }
            console.log(222222222222, options);
            // return
            // 调用发送方函数, 处理文件的下载
            this.props.handleDownFile(options)
        }
    }
    // -------------------------------------------------处理组名折叠功能---------------------------------------------------
    onSelectGroup (selectedKeys, info) {
        console.log('selected', selectedKeys, info);
    };
    // -------------------------------------------------处理组名全选/单选功能---------------------------------------------------
    onCheckGroup(checkedKeys, info) {
        console.log('onCheck', checkedKeys, info);
        let delSelectedListData = info.checkedNodes.map((item, index) => {return item.props})
        delSelectedListData.forEach((item, index) => {
            if (item['title']) {
                item.host = item.title
                delete item.title
            }
        })
        this.setState({
            delSelectedList: delSelectedListData
        })
    };



    render() {
        const { serverhostlist, ipsshtxt, groupList } = this.props
        const dataSource = groupList.toJS()
        const columns = [
            {
                title: '组名',
                dataIndex: 'Title',
                key: 'Title',
                render: (Title, record) => (
                    <div>
                        <Tree
                            checkable
                            onSelect={this.onSelectGroup}
                            onCheck={this.onCheckGroup}
                        >
                            <TreeNode title={Title.Name} key="0-0">
                                {
                                    Title.Servers != null
                                    &&
                                    Title.Servers.map((item, index) => {
                                        return (
                                            <TreeNode title={item.host} key={index} id={item.id} name={item.name} password={item.password} port={item.port} username={item.username}  />
                                        )
                                    })
                                }
                            </TreeNode>
                        </Tree>
                    </div>
                )
            }
        ];
        /*
        const rowSelection = { // 单选, 全选
            onChange: (selectedRowKeys, selectedRows) => {
                console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
                const { ipAddress } = this.state
                // 利用setState方法的回调函数, 可以实时的拿到最新的state中的值, 以用来最新的判断
                this.setState({ selectedRows, ipAddress: selectedRows, upLoadDisable: false, downLoadBtnDisable: false }, () => {
                    // console.log(333333333, this.state.ipAddress);
                    if (this.state.ipAddress.length == 0) { // 如果没有选中ip地址
                        console.log('1233123======')
                        this.setState({ // 按钮设置为禁止点击状态
                            upLoadDisable: true,
                            downLoadBtnDisable: true
                        })
                    } else { // 如果有选中ip地址
                        this.setState({ // 按钮设置为允许点击状态
                            upLoadDisable: false,
                            downLoadBtnDisable: false
                        })
                    }
                })
            }
        };
        */
        let ipsshtxtArr = []
        ipsshtxt.toJS().map((item, index) => {
            return item.Result.map((v, i) => {
                if (i == 0) {
                    ipsshtxtArr.push(<h2 style={{ color: 'red' }}>{v}</h2>)
                } else if (v == 'file is existed') {
                    ipsshtxtArr.push(<h3 style={{ color: 'red' }}>{v}</h3>)
                } else {
                    ipsshtxtArr.push(<p style={{ color: "#fff" }}>{v}</p>)
                }
            })
        })
        const upLoadProps = {
            directory: true,
            name: 'file',
            action: '/v3/localupload',
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
            <div className="News">
                <Layout>
                    <Breadcrumb style={{ margin: '16px 0', textAlign: 'left', fontSize: '16px' }}>
                        <Breadcrumb.Item>分组批量命令</Breadcrumb.Item>
                    </Breadcrumb>
                    <div className="btn_wrap">
                        <div className="upload_wrap">
                            <Input style={{ width: '300px', marginRight: '10px' }} placeholder="例如: /root/xxxx;/root" onChange={this.handlefileAddress} />
                            <Button onClick={this.handleUpLoadBtn} disabled={this.state.upLoadDisable}>
                                <Icon type="upload" /> 点击上传
                            </Button>
                        </div>
                        <div className="localUpLoad_wrap">
                            <Upload {...upLoadProps}>
                                <Button>
                                    <Icon type="upload" /> 本地文件上传
                                </Button>
                            </Upload>
                        </div>
                        <div className="down_wrap">
                            <Input style={{ width: '300px', marginRight: '10px' }} placeholder="输入下载的地址" onChange={this.handleDownLoadfileAddress} />
                            <Button type="primary" style={{ textAlign: 'right' }} onClick={this.handleDownLoadFile} disabled={this.state.downLoadBtnDisable}>
                                <Icon type="download" /> 下载文件
                            </Button>
                        </div>
                    </div>
                    <div className="content">
                        <div className='content_wrap'>
                            <div className='table_box'>
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
                            <div className='terminal_box'>
                                <div className='terminal_top' style={{ background: '#000' }}>
                                    <div>
                                        {
                                            ipsshtxtArr.length > 0 && ipsshtxtArr
                                        }
                                    </div>
                                </div>
                                <div className='terminal_bottom'>
                                    <TextArea
                                        ref={this.textAreaIpt}
                                        rows={8}
                                        allowClear={true}
                                        onPressEnter={this.pressEnter}
                                    />
                                </div>
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
    isLoading: state.get('grouping').get('isLoading'),
    serverhostlist: state.get('grouping').get('serverhostlist'),
    ipsshtxt: state.get('grouping').get('ipsshtxt'),
    groupList: state.get('grouping').get('groupList')
})


// 发送方
const mapDispatchToProps = (dispatch) => ({
    handleGetServerHostData: () => { // 处理获取服务器数据列表
        dispatch(actionCreator.handleGetServerHostDataAction())
    },
    handleIpSsh: (options) => { // 处理服务器的批量命令
        dispatch(actionCreator.handleIpSshAction(options))
    },
    handleDownFile: (options) => { // 处理文件的下载
        dispatch(actionCreator.handleDownFileAction(options))
    },
    handleUpLoadFile: (options) => { // 处理文件的上传
        dispatch(actionCreator.handleUpLoadFileAction(options))
    },
    handleGetGroupList: () => { // 处理获取组名数据列表
        dispatch(actionCreator.handleGetGroupListAction())
    },
    handleUpLoadCallBack: () => {
        dispatch(actionCreator.handleUpLoadCallBackAction())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Grouping)