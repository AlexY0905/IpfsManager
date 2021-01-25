// 区块id详情页面
import React, { Component } from 'react'
import { connect } from 'react-redux'
import "./index.css"
import { actionCreator } from './store'
import Layout from 'common/layout'
import {Breadcrumb, Radio, Select, Table} from 'antd'

class BlockDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            newListType: '消息列表',
            newListSelectType: '全部'
        }
        this.handleNewListSelectChange = this.handleNewListSelectChange.bind(this)
        this.handlePaginationChange = this.handlePaginationChange.bind(this)
    }
    componentDidMount() {
        console.log(111111111111, this.props)
        // 调用发送方函数, 处理消息列表数据
        let newListOptions = {name: 'minermessage', page: 1}
        this.props.handleNewList(newListOptions)
    }
    // 处理消息列表下拉框改变事件
    handleNewListSelectChange (val) {
        console.log('val==============', val);
        /*
        if (val == '全部') {
            this.setState({newListSelectType: 'minermessage'})
        } else {
            this.setState({newListSelectType: val})
        }
        */

        this.setState({newListSelectType: val, currentPage: 1})
        // 调用发送方函数, 处理消息列表数据
        let newListOptions = {name: 'minermessage', page: 1, method: val}
        this.props.handleNewList(newListOptions)
    }
    // 处理表格分页器
    handlePaginationChange (page, pageSize) {
        console.log(':::::::::-----123', page)
        console.log(22222222, this.state.newListType);
        let options = {
            name: '',
            page: page
        }
        if (this.state.newListType == '消息列表') {
            options.name = 'minermessage'
            options.method = this.state.newListSelectType
        } else if (this.state.newListType == '转账列表') {
            options.name = 'minertransfors'
        }
        /*
        if (this.state.newListSelectType == 'minermessage') {
            options.name = 'minermessage'
        } else {
            options.name = 'minermessage'
            options.method = this.state.newListSelectType
        }
        */
        // 调用发送方函数, 处理消息列表数据
        this.props.handleNewList(options)
    }



    render() {
        const { newListData, newListSelectData, totalCount } = this.props
        // ---------------------------------------------- 消息列表表格数据 ----------------------------------------
        let columns = []
        let dataSource = []
        if (newListData.toJS().length > 0) {
            console.log('newListData.toJS()----------', newListData.toJS());
            if (this.state.newListType == '' || this.state.newListType == '消息列表') {
                columns = [
                    { title: () => (<span className='text_title'>消息ID</span>), dataIndex: 'Cid', key: 'Cid', align: 'center', ellipsis: true, render: (Cid) => (<span className="cursor_hover" onClick={ () => this.handleGoPage(Cid, 'messageIdDetailPage')}>{Cid}</span>) },
                    { title: () => (<span className='text_title'>区块高度</span>), dataIndex: 'Height', key: 'Height', align: 'center', ellipsis: true, render: (Height) => (<span className="cursor_hover" style={{color: '#1a4fc9'}} onClick={ () => this.handleGoPage(Height, 'heightDetailPage')}>{Height}</span>) },
                    { title: () => (<span className='text_title'>时间</span>), dataIndex: 'TimeCreate', key: 'TimeCreate', align: 'center', ellipsis: true },
                    { title: () => (<span className='text_title'>发送方</span>), dataIndex: 'From', key: 'From', align: 'center', ellipsis: true, render: (From) => (<span className="cursor_hover" onClick={ () => this.handleGoPage(From, 'senderDetailPage')}>{From}</span>) },
                    { title: () => (<span className='text_title'>接收方</span>), dataIndex: 'To', key: 'To', align: 'center', ellipsis: true },
                    { title: () => (<span className='text_title'>方法</span>), dataIndex: 'Method', key: 'Method', align: 'center', ellipsis: true },
                    { title: () => (<span className='text_title'>金额</span>), dataIndex: 'Balance', key: 'Balance', align: 'center', ellipsis: true },
                    { title: () => (<span className='text_title'>状态</span>), dataIndex: 'Status', key: 'Status', align: 'center', ellipsis: true }
                ]
                dataSource = newListData.toJS()
            }
        }
        // ---------------------------------------------- 消息列表表格数据 ----------------------------------------
        return (
            <div className="News">
                <Layout>
                    <Breadcrumb style={{ margin: '16px 0', textAlign: 'left', fontSize: '16px' }}>
                        <Breadcrumb.Item style={{color: '#000'}}>区块详情</Breadcrumb.Item>
                    </Breadcrumb>
                    <div className="content" style={{boxSizing: 'border-box', padding: '0 20px'}}>
                        <div className="blockDetail_wrap">
                            <div>
                                <Breadcrumb style={{ margin: '16px 0', textAlign: 'left', fontSize: '16px' }}>
                                    <Breadcrumb.Item style={{color: '#000'}}>区块概览</Breadcrumb.Item>
                                </Breadcrumb>
                            </div>
                            <div className="blockDetail_content">
                                <p><span>区块ID</span><span>bafy2bzacecsxggqitgc544oghgzjvu5gncvgw4iazozqjo6suw6tu2csngxsu</span></p>
                                <p><span>高度</span><span>424655</span></p>
                                <p><span>矿工</span><span>f015734</span></p>
                                <p><span>时间</span><span>2021-01-19 16:47:30</span></p>
                                <p><span>大小</span><span>1116 Bytes</span></p>
                                <p><span>消息</span><span>234</span></p>
                                <p><span>奖励</span><span>18.860864341150966 FIL</span></p>
                                <p><span>奖励份数</span><span>1</span></p>
                                <p><span>父区块</span><span>bafy2bzacebfpktdvvigk7zywef2qnwkgojeybwgi6ci6q4ev3tcehchganw22bafy2bzacea2hkn4fk4spcgkzwfrylg7kxzw2t4e2mndryhtxadllfu567cbhkbafy2bzaceai2xu3cajuzyovlr5juoedx5wnup7zgr7oi2odg562y67jdsrkb6bafy2bzacedhsr7mwpva7oc2tyh7c7ed5udq3kznvskkyypwyw52mx45lzhssgbafy2bzaceckumnxypd7u5etx64ktxh5i34ux3ynqjumsd7mpvfcaotao7vgqmbafy2bzacedbhtwddmkssdq4ts3vnosi6xcqpdpfyrw7gjz6e52j5b3v6m2l4m</span></p>
                                <p><span>父区块权重</span><span>9,162,639,855</span></p>
                                <p><span>罚金</span><span>0 FIL</span></p>
                                <p><span>Parent Base Fee</span><span>4.290164184 nanoFIL</span></p>
                            </div>
                        </div>
                        <div className="newList_wrap" style={{padding: '0'}}>
                            <div className="newList_top_wrap">
                                <div className="top_left_wrap">
                                    <span style={{fontSize: '16px', color: '#000'}}>消息列表</span>
                                </div>
                                {
                                    newListSelectData.toJS().length > 0 && (
                                        <div className="top_right_wrap">
                                            <Select defaultValue="全部" style={{ width: 200 }} onChange={this.handleNewListSelectChange}>
                                                <Option value='全部'>全部</Option>
                                                {
                                                    newListSelectData.toJS().map((item, index) => (
                                                        <Option value={item}>{item}</Option>
                                                    ))
                                                }
                                            </Select>
                                        </div>
                                    )
                                }
                            </div>
                            <div className="newList_bottom_wrap">
                                <Table
                                    columns={columns}
                                    dataSource={dataSource}
                                    rowKey='id'
                                    loading={
                                        {
                                            spinning: this.props.isLoading,
                                            tip: "加载中..."
                                        }
                                    }
                                    style={{ marginTop: '30px' }}
                                    pagination={{
                                        showQuickJumper: true,
                                        defaultCurrent: 1,
                                        total: totalCount,
                                        pageSize: 20,
                                        onChange: this.handlePaginationChange
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </Layout>
            </div>
        )
    }
}

// 接收方
const mapStateToProps = (state) => ({
    isLoading: state.get('minerOverview').get('isLoading'),
    newListData: state.get('minerOverview').get('newListData'),
    newListSelectData: state.get('minerOverview').get('newListSelectData'),
    totalCount: state.get('minerOverview').get('totalCount')
})


// 发送方
const mapDispatchToProps = (dispatch) => ({
    handleNewList: (options) => {
        dispatch(actionCreator.handleNewListAction(options))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(BlockDetail)