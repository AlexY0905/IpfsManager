// 本地机器监控页面
import React, { Component } from 'react'
import { connect } from 'react-redux'
import Layout from 'common/layout/index.js'
import { Breadcrumb, Table, Divider, Tag, Button, Progress } from 'antd';
import "./index.css"
import { actionCreator } from './store'


class Monitor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: ''
        }


    }
    componentDidMount() {
        // 在生命周期调用发送方的数据
        this.props.handleGetMonitorList()
        setInterval(() => {//定时器  每15秒更新一次
            this.props.handleGetMonitorList()
        }, 15000)
    }



    render() {

        // 后台返回的真实数据想要用的话需要this.props
        let { monitorList } = this.props;

        const columns = [
            {
                title: 'hostname',
                align: 'center',
                dataIndex: 'hostname',
                key: 'hostname',
                id: 'id'
            },
            {
                title: 'machineType',
                align: 'center',
                dataIndex: 'machineType',
                key: 'machineType',
                id: 'id'
            },
            {
                title: 'ip',
                align: 'center',
                dataIndex: 'ip',
                key: 'ip',
                id: 'id'
            },
            {
                title: 'cpu_detail',
                align: 'center',
                dataIndex: 'cpu_detail',
                key: 'cpu_detail',
                id: 'id'
            },
            {
                title: 'gpuRate',
                align: 'center',
                dataIndex: 'gpuRate',
                key: 'gpuRate',
                id: 'id',
                render: (gpuRate, record) => (
                    <span>
                        <Progress type="circle" percent={gpuRate} width={70} status="normal" format={percent => `${gpuRate} %`} />
                    </span>
                )
            },
            {
                title: 'cpuRate',
                align: 'center',
                dataIndex: 'cpuRate',
                key: 'cpuRate',
                id: 'id',
                render: (cpuRate, record) => (
                    <span>
                        <Progress type="circle" percent={cpuRate} width={70} status="normal" format={percent => `${cpuRate} %`} />
                    </span>
                )
            },
            {
                title: 'memRate',
                align: 'center',
                dataIndex: 'memRate',
                key: 'memRate',
                id: 'id',
                render: (memRate, record) => (
                    <span>
                        <Progress type="circle" percent={memRate} width={70} status="normal" format={percent => `${memRate} %`} />
                    </span>
                )
            },
            {
                title: 'light',
                align: 'center',
                dataIndex: 'light',
                key: 'light',
                id: 'id'
            },
            {
                title: 'networkPort',
                align: 'center',
                dataIndex: 'networkPort',
                key: 'networkPort',
                id: 'id',
                render: (networkPort, record) => (
                    <span>
                        {networkPort == 0 ? '千兆网口' : '万兆网口'}
                    </span>
                )
            },
            {
                title: 'run',
                align: 'center',
                dataIndex: 'run',
                key: 'run',
                id: 'id',
                render: (run, record) => (
                    <span>
                        {run == 0 ? '无运行' : '运行'}
                    </span>
                )
            },
            {
                title: 'mem',
                align: 'center',
                dataIndex: 'mem',
                key: 'mem',
                id: 'id'
            },
            {
                title: 'gpu',
                align: 'center',
                key: 'gpu',
                dataIndex: 'gpu',
                id: 'id'
            },
        ];



        let data = monitorList.toJS(); //将immutable对象转换成数组

        return (
            <div className='content' style={{overflowX: 'auto'}}>
                <Layout>
                    <Breadcrumb style={{ margin: '16px 0', textAlign: 'left', fontSize: '16px' }}>
                        <Breadcrumb.Item>本地机器监控页面</Breadcrumb.Item>
                    </Breadcrumb>

                    <div>
                        <Table
                            columns={columns}
                            dataSource={data}
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
                </Layout>
            </div>
        )
    }
}
// 接收方
const mapStateToProps = (state) => ({
    // 获取属于monitor页面 store中的所有数据
    monitorList: state.get('monitor').get('monitorList'),
    isLoading: state.get("monitor").get("isLoading")
})
// 发送方
const mapDispatchToProps = (dispatch) => ({
    // （handleGetMonitorList）自定义这个函数名 用这个函数名派发action
    handleGetMonitorList: () => {
        dispatch(actionCreator.handleGetMonitorListAction())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Monitor)
