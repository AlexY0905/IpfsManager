// 节点Id详情页面
import React, { Component } from 'react'
import { connect } from 'react-redux'
import "./index.css"
import { actionCreator } from './store'
import Layout from 'common/layout'
import { Breadcrumb } from 'antd'

class NodeIdDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    componentDidMount() {
        console.log(1111111111111, this.props.location.state.parameter);
        let options = {name: 'minernodedetail', nodeid: this.props.location.state.parameter}
        // 调用发送方函数, 获取节点详情数据
        this.props.handleGetNodeDetail(options)
    }


    render() {
        const { nodeDetailMsgData } = this.props
        if (nodeDetailMsgData != '') {
            console.log('nodeDetailMsgData---------', nodeDetailMsgData)
        }
        return (
            <div className="News">
                <Layout>
                    <Breadcrumb style={{ margin: '16px 0', textAlign: 'left', fontSize: '16px' }}>
                        <Breadcrumb.Item>节点详情</Breadcrumb.Item>
                    </Breadcrumb>
                    <div className="content">
                        <div className="nodeMsgDetail">
                            {
                                nodeDetailMsgData != '' && (
                                    <div>
                                        <p><span>ID</span><span>{nodeDetailMsgData.PeerId}</span></p>
                                        <p><span>矿工</span><span>{nodeDetailMsgData.Miners}</span></p>
                                        <p>
                                            <span>地区（公开IP）</span>
                                            <span style={{display: 'flex'}}>
                                                <span style={{display: 'flex', marginRight: '5px', flex: '0'}}><img src={nodeDetailMsgData.Location.Flag} style={{width: '20px'}} alt="" /></span>
                                                <span>亚洲-</span>
                                                <span>中国-</span>
                                                <span>江苏省-</span>
                                                <span>南京市</span>
                                                <span>{nodeDetailMsgData.Location.Ip}</span>
                                            </span>
                                        </p>
                                        <p>
                                            <span>MultiAddresses</span>
                                            <span className="ip_content">
                                                {
                                                    nodeDetailMsgData.MultiAddresses.length > 0 && nodeDetailMsgData.MultiAddresses.map((item, index) => (
                                                        <span>{item}</span>
                                                    ))
                                                }
                                            </span>
                                        </p>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </Layout>
            </div>
        )
    }
}

// 接收方
const mapStateToProps = (state) => ({
    nodeDetailMsgData: state.get('minerOverview').get('nodeDetailMsgData')
})


// 发送方
const mapDispatchToProps = (dispatch) => ({
    handleGetNodeDetail: (options) => {
        dispatch(actionCreator.handleGetNodeDetailAction(options))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(NodeIdDetail)