// 文件传输页面
import React, { Component } from 'react'
import { connect } from 'react-redux'
import "./index.css"
import { actionCreator } from './store'
import Layout from 'common/layout'
import { Breadcrumb, Table, Divider, Button, Modal, Input, Form, notification } from 'antd'
const { TextArea } = Input;


class Fileupload extends Component {
    constructor(props) {
        super(props)
        this.state = {
            textAreaVal: ''
        }
        this.pressEnter = this.pressEnter.bind(this)
    }
    componentDidMount() {
        // 调用发送方的数据 显示服务器列表
        // this.props.handleGetServerHostData()
    }
    pressEnter(e) {
        // 获取文本框中的值
        console.log(11111111111, e.target.value)
    }



    render() {
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

        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
                console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            }
        };

        return (
            <div className="News">
                <Layout>
                    <Breadcrumb style={{ margin: '16px 0', textAlign: 'left', fontSize: '16px' }}>
                        <Breadcrumb.Item>文件传输</Breadcrumb.Item>
                    </Breadcrumb>
                    <div style={{ textAlign: 'right', marginBottom: '15px' }}>

                    </div>
                    <div className="content">
                        <div className='content_wrap'>
                            <div className='table_box'>
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
                            <div className='terminal_box'>
                                <div className='terminal_top'>
                                    结果
                                </div>
                                <div className='terminal_bottom'>
                                    <TextArea
                                        rows={8}
                                        allowClear={true}
                                        onPressEnter={this.pressEnter}
                                    />
                                </div>
                            </div>
                        </div>
                        <Button type="primary" style={{ float: 'right', marginTop: '10px' }}>
                            提交
                        </Button>
                    </div>
                </Layout>
            </div>
        );
    }
}

// 接收方
const mapStateToProps = (state) => ({
    isLoading: state.get('fileupload').get('isLoading'),
    serverhostlist: state.get('fileupload').get('serverhostlist')
})


// 发送方
const mapDispatchToProps = (dispatch) => ({
    handleGetServerHostData: () => { // 处理获取服务器数据列表
        dispatch(actionCreator.handleGetServerHostDataAction())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Fileupload)