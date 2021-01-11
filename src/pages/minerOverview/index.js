// 批量命令页面
import React, { Component } from 'react'
import { connect } from 'react-redux'
import "./index.css"
import { actionCreator } from './store'
import Layout from 'common/layout'
import { Breadcrumb, Table, Button, Radio } from 'antd'
import { Pie } from '@ant-design/charts';


class MinerOverview extends Component {
    constructor(props) {
        super(props)
        this.textAreaIpt = React.createRef()
        this.state = {

        }
        this.handleRadioChange = this.handleRadioChange.bind(this)
    }
    componentDidMount() {
        // 调用发送方的数据 显示服务器列表
        // this.props.handleGetServerHostData()
    }
    handleRadioChange (val) {
        console.log('val---------', val.target.value)
    }



    render() {
        const { serverhostlist, ipsshtxt } = this.props
        let data = [
            {
                type: '可用余额',
                value: 146.9657
            },
            {
                type: '扇区抵押',
                value: 3575.7056
            },
            {
                type: '挖矿锁仓',
                value: 1599.8182
            }
        ]

        let config = {
            appendPadding: 10,
            data: data,
            angleField: 'value',
            colorField: 'type',
            radius: 1,
            innerRadius: 0.5,
            label: {
                type: 'inner',
                offset: '-50%',
                // content: '{value}',
                content: function () {
                    return ''
                },
                style: {
                    textBaseline: 'top',
                    textAlign: 'center',
                    fontSize: 14
                }
            },
            style: {
                width: '200px',
                height: '200px'
            },
            legend: false,
            interactions: [{ type: 'element-selected' }, { type: 'element-active' }],
            statistic: {
                title: false,
                content: {
                    formatter: function formatter() {
                        return '';
                    }
                }
            }
        }
        return (
            <div className="News">
                <Layout>
                    <Breadcrumb style={{ margin: '16px 0', textAlign: 'left', fontSize: '16px' }}>
                        <Breadcrumb.Item style={{paddingLeft: '18px'}}>矿工概览</Breadcrumb.Item>
                    </Breadcrumb>
                    <div className="content">
                        <div className="overview_wrap">
                            <div className="overview_left">
                                <div style={{marginRight: '30px'}}>
                                    <Pie {...config} />
                                </div>
                                <div className="overview_msg">
                                    <h2>账户余额</h2>
                                    <p className="account-balance">5,322.7003 FIL</p>
                                    <div className="charts_msg_num">
                                        <p>可用余额: 146.9657 FIL</p>
                                        <p>扇区抵押: 3,575.7056 FIL</p>
                                        <p>挖矿锁仓: 1,599.8182 FIL</p>
                                    </div>
                                </div>
                            </div>
                            <div className="overview_right">
                                <div className="power_wrap">
                                    <h2>有效算力</h2>
                                    <div className="power_num">
                                        <span style={{fontSize: '24px'}}>487.97 TiB</span>
                                        <span>占比: 0.03%</span>
                                        <span>排名: 417</span>
                                    </div>
                                </div>
                                <div className="power_msg_wrap">
                                    <div className="power_msg_left">
                                        <p>原值算力: 487.97 TiB</p>
                                        <p style={{marginBottom: '0'}}>累计出块奖励: 2,581.00 FIL</p>
                                    </div>
                                    <div className="power_msg_right">
                                        <p>累计出块份数: 162</p>
                                        <p style={{marginBottom: '0'}}>扇区大小: 32 GiB</p>
                                    </div>
                                </div>
                                <div className="status_msg_wrap">
                                    <div className="status_msg_content">
                                        <div>扇区状态:</div>
                                        <div>
                                            <span>15,622 全部, </span>
                                            <span style={{color: '#38a169'}}>15,615 有效, </span>
                                            <span style={{color: '#c53030'}}>0 错误, </span>
                                            <span style={{color: '#ecc94b'}}>0 恢复中</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="statistics_wrap">
                            <div className="statistics_title_wrap">
                                <div>
                                    <Breadcrumb style={{ margin: '16px 0', textAlign: 'left', fontSize: '16px' }}>
                                        <Breadcrumb.Item>挖矿统计</Breadcrumb.Item>
                                    </Breadcrumb>
                                </div>
                                <div>
                                    <Radio.Group defaultValue="24h" buttonStyle="solid" onChange={this.handleRadioChange}>
                                        <Radio.Button value="24h">24h</Radio.Button>
                                        <Radio.Button value="7天">7天</Radio.Button>
                                        <Radio.Button value="30天">30天</Radio.Button>
                                        <Radio.Button value="1年">1年</Radio.Button>
                                    </Radio.Group>
                                </div>
                            </div>
                            <div className="statistics_msg">

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
    isLoading: state.get('minerOverview').get('isLoading')
})


// 发送方
const mapDispatchToProps = (dispatch) => ({
    handleGetServerHostData: () => { // 处理获取服务器数据列表
        dispatch(actionCreator.handleGetServerHostDataAction())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(MinerOverview)