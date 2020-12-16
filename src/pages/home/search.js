// lotus命令页面
import React, { Component } from 'react'
import { connect } from 'react-redux'
import Layout from 'common/layout/index.js'
import { Breadcrumb, Card, BackTop } from 'antd';
import "./index.css"
import { actionCreator } from './store'



class HomeSearch extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }

    }
    componentDidMount () {
        let info = this.props.location.state.info
        let name = this.props.location.state.name
        console.log(1111111111, info)
        console.log(1111111111, name)
        let options = {
            info,
            name
        }
        // 调用发送方函数, 处理搜索
        this.props.handleSearchText(options)
    }

    render() {
        let {lotusBlockSearchData} = this.props
        let searchData = ''
        if (lotusBlockSearchData != '') {
            console.log(111111112222222222, lotusBlockSearchData)
            searchData = JSON.stringify(lotusBlockSearchData)
        }
        return (
            <div>
                <Layout>
                    <Breadcrumb style={{ margin: '16px 0', textAlign: 'left', fontSize: '20px' }}>
                        <Breadcrumb.Item>lotus命令</Breadcrumb.Item>
                    </Breadcrumb>
                    <div className="content">
                        <div>
                            <Card>
                                <p style={{wordWrap: 'break-word'}}>
                                    {
                                        searchData !== '' && searchData
                                    }
                                </p>
                            </Card>
                        </div>
                    </div>
                    <BackTop />
                </Layout>
            </div>
        )
    }
}
// 接收方
const mapStateToProps = (state) => ({
    // 获取属于home页面 store中的所有数据
    isLoading: state.get('home').get('isLoading'),
    lotusBlockSearchData: state.get('home').get('lotusBlockSearchData')
})
// 发送方
const mapDispatchToProps = (dispatch) => ({
    handleSearchText: (options) => {
        dispatch(actionCreator.handleSearchTextAction(options))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(HomeSearch)
