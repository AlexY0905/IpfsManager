// 登录页面
import React, { Component } from 'react'
import { connect } from 'react-redux'
import './index.css'
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import { actionCreator } from './store/index'
import { Link } from 'react-router-dom'


class Login extends Component {
    constructor(props) {
        super(props)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(e) {
        // 阻止默认事件的触发
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                // console.log('Received values of form: ', values);
                // 调用发送方处理用户登录函数
                this.props.handleLogin(values)
            }
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className='login'>
                <Form className="login-form">
                    <Form.Item style={{ fontSize: '24px', paddingTop: '20px', color: '#fff' }}>
                        管理员登录
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('name', {
                            rules: [{ required: true, message: '请输入你的用户名' }],
                        })(
                            <Input
                                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="用户名"
                                style={{ width: '80%', marginTop: '10px' }}
                            />,
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: '请输入你的密码' }],
                        })(
                            <Input
                                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                type="password"
                                placeholder="密码"
                                style={{ width: '80%' }}
                            />,
                        )}
                    </Form.Item>
                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            style={{ width: '80%' }}
                            onClick={this.handleSubmit}
                            loading={this.props.isLoading}
                        >
                            登录
                        </Button>
                    </Form.Item>
                    {/* <Form.Item>
                        <Link to="/register">没有账号? 去注册</Link>
                    </Form.Item> */}
                </Form>
            </div>
        )
    }
}

// 接收方
const mapStateToProps = (state) => ({
    isLoading: state.get("login").get("isLoading")
})
// 发送方
const mapDispatchToProps = (dispatch) => ({
    handleLogin: (values) => {
        // 派发action处理用户注册数据
        dispatch(actionCreator.handleLoginAction(values))
    }
})

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(Login);

export default connect(mapStateToProps, mapDispatchToProps)(WrappedNormalLoginForm)
