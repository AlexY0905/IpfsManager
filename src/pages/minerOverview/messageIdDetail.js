// 消息Id详情页面
import React, { Component } from 'react'
import { connect } from 'react-redux'
import "./index.css"
import { actionCreator } from './store'
import Layout from 'common/layout'
import { Breadcrumb } from 'antd'

class MessageIdDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    componentDidMount() {
        // 调用发送方函数, 处理矿工概览饼形图数据
        // this.props.handleOverviewEchartsData()
        console.log(1111111111111, this.props);
    }


    render() {
        return (
            <div className="News">
                <Layout>
                    <Breadcrumb style={{ margin: '16px 0', textAlign: 'left', fontSize: '16px' }}>
                        <Breadcrumb.Item style={{paddingLeft: '18px'}}>消息ID</Breadcrumb.Item>
                    </Breadcrumb>
                    <div className="content">
                        消息id详情页
                    </div>
                </Layout>
            </div>
        )
    }
}

// 接收方
const mapStateToProps = (state) => ({
    // isLoading: state.get('minerOverview').get('isLoading')
})


// 发送方
const mapDispatchToProps = (dispatch) => ({
    // handleOverviewEchartsData: (options) => {
    //     dispatch(actionCreator.handleOverviewEchartsDataAction(options))
    // }
})

export default connect(mapStateToProps, mapDispatchToProps)(MessageIdDetail)