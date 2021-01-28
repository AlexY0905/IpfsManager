// 区块高度详情页面
import React, { Component } from 'react'
import { connect } from 'react-redux'
import "./index.css"
import { actionCreator } from './store'
import Layout from 'common/layout'
import { Breadcrumb } from 'antd'
import moment from "moment"

class HeightDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
        this.handleGoPage = this.handleGoPage.bind(this)
    }
    componentDidMount() {
        // 调用发送方函数, 处理获取区块高度数据列表
        // console.log(22222222222, this.props.location.state.parameter);
        let options = {
            name: 'minerblockinfo',
            height: this.props.location.state.parameter
        }
        this.props.handleBlockHeightData(options)
        setInterval(() => {
            this.props.handleBlockHeightData(options)
        }, 7800000)
    }
    handleGoPage (val, type) {
        if (val == 'N/A') return
        if (type == 'messageIdDetailPage') {
            this.props.history.push({ pathname: "/minerOverview/messageIdDetail", state: { parameter: val } })
        } else if (type == 'heightDetailPage') {
            this.props.history.push({ pathname: "/minerOverview/heightDetail", state: { parameter: val } })
        } else if (type == 'senderDetailPage') {
            this.props.history.push({ pathname: "/minerOverview/senderDetail", state: { parameter: val } })
        } else if (type == 'blockDetailPage') {
            this.props.history.push({ pathname: "/minerOverview/blockDetail", state: { parameter: val } })
        } else if (type == 'nodeIdPage') {
            this.props.history.push({ pathname: "/minerOverview/nodeIdDetail", state: { parameter: val } })
        }
    }


    render() {
        const { blockHeightDataList } = this.props

        return (
            <div className="News">
                <Layout>
                    <Breadcrumb style={{ margin: '16px 0', textAlign: 'left', fontSize: '16px' }}>
                        <Breadcrumb.Item>{blockHeightDataList != '' && (<span style={{color: '#000'}}>区块高度 #{blockHeightDataList.Height}</span>)}</Breadcrumb.Item>
                    </Breadcrumb>
                    {
                        blockHeightDataList != '' && (
                            <div className="content" style={{boxSizing: 'border-box', padding: '0 20px'}}>
                                <div className="heightDetail_content">
                                    <p><span>区块时间</span><span>{moment.unix(blockHeightDataList.Timestamp).format('YYYY-MM-DD HH:mm:ss')}</span></p>
                                    <p><span>累计消息数（去重）</span><span>{blockHeightDataList.MessageCount}</span></p>
                                </div>
                                <div className="heightDetail_list_wrap">
                                    <div>
                                        <Breadcrumb style={{ margin: '16px 0', textAlign: 'left', fontSize: '16px' }}>
                                            <Breadcrumb.Item>所有区块</Breadcrumb.Item>
                                        </Breadcrumb>
                                    </div>
                                    <div className="heightItem_wrap">
                                        <ul>
                                        {
                                            blockHeightDataList.Blocks.length > 0 && blockHeightDataList.Blocks.map((item, index) => (
                                                <li>
                                                    <p><span>区块ID</span><span style={{color: '#1a4fc9'}} onClick={ () => this.handleGoPage(item.Cid, 'blockDetailPage')}>{item.Cid}</span></p>
                                                    <p>
                                                        <span>矿工</span>
                                                        <div style={{flex: '1.5', display: 'flex'}}>
                                                            <span style={{flex: '0', marginRight: '5px', color: '#1a4fc9'}}>{item.Miner}</span>
                                                            {
                                                                item.MinerTag.Signed && (
                                                                    <span className="minerTagTxt" style={{flex: '0'}}>{item.MinerTag.Name}
                                                                        <span>
                                                                            <img src="https://filfox.info/dist/img/signed.16bca8b.svg" style={{width: '12px', marginLeft: '5px'}} />
                                                                        </span>
                                                                    </span>
                                                                )
                                                            }
                                                        </div>
                                                    </p>
                                                    <p><span>奖励</span><span>{item.Reward}</span></p>
                                                    <p><span>消息数</span><span>{item.MessageCount}</span></p>
                                                </li>
                                            ))
                                        }
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </Layout>
            </div>
        )
    }
}

// 接收方
const mapStateToProps = (state) => ({
    isLoading: state.get('minerOverview').get('isLoading'),
    blockHeightDataList: state.get('minerOverview').get('blockHeightDataList')
})


// 发送方
const mapDispatchToProps = (dispatch) => ({
    handleBlockHeightData: (options) => {
        dispatch(actionCreator.handleBlockHeightDataAction(options))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(HeightDetail)