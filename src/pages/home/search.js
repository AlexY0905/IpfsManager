// lotus命令页面
import React, { Component } from 'react'
import { connect } from 'react-redux'
import Layout from 'common/layout/index.js'
import { Breadcrumb, Table, Divider, Button, Modal, Tabs, Input, notification } from 'antd';
import "./index.css"
import { actionCreator } from './store'
import { Chart, Geom, Axis, Tooltip, Legend } from "bizcharts";

const { TabPane } = Tabs;
const { Search } = Input;



class HomeSearch extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }

    }
    componentDidMount () {
        let cid = this.props.location.state.cid
        console.log(1111111111, cid)
    }

    render() {
        return (
            <div>
                <Layout>
                    <Breadcrumb style={{ margin: '16px 0', textAlign: 'left', fontSize: '20px' }}>
                        <Breadcrumb.Item>lotus命令</Breadcrumb.Item>
                    </Breadcrumb>
                    <div className="content">
                        搜索页
                    </div>
                </Layout>
            </div>
        )
    }
}
// 接收方
const mapStateToProps = (state) => ({
    // 获取属于home页面 store中的所有数据
    isLoading: state.get('home').get('isLoading')
})
// 发送方
const mapDispatchToProps = (dispatch) => ({
    handleLotusOrders: (options) => {
        dispatch(actionCreator.handleLotusOrdersAction(options))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(HomeSearch)
