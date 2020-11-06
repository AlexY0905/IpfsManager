//页面
import React, { Component } from 'react'
import { connect } from 'react-redux'
import Layout from 'common/layout/index.js'
import { Breadcrumb, Table, Divider, Tag, Button } from 'antd';
import "./index.css"
import { actionCreator } from './store'

class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: ''
        }
    }
    componentDidMount() {
        // 在生命周期调用发送方的数据
        // this.props.handleGetMinerList()
    }

    render() {
        return (
            <div>
                <Layout>
                    <Breadcrumb style={{ margin: '16px 0', textAlign: 'left' }}>
                        <Breadcrumb.Item>首页</Breadcrumb.Item>
                    </Breadcrumb>
                    <div>
                        {/*我是首页*/}
                    </div>
                </Layout>
            </div>
        )
    }
}
// 接收方
const mapStateToProps = (state) => ({
    // 获取属于home页面 store中的所有数据
    // minerList: state.get('home').get('minerList')
})
// 发送方
const mapDispatchToProps = (dispatch) => ({
    // （handleGetMinerList）自定义这个函数名 用这个函数名派发action
    /*
    handleGetMinerList: () => {
        dispatch(actionCreator.handleMinerlistAction())
    }
     */
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)
