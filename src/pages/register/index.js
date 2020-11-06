// 注册页面
import React, { Component } from 'react'
import { connect } from 'react-redux'
import './index.css'
import { Form, Icon, Input, Button, Checkbox, Message, message } from 'antd';
import { Link } from 'react-router-dom'
import { actionCreator } from './store/index'

class Register extends Component {
    constructor(props) {
        super(props)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(e) {
        // 阻止默认事件的触发
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                var reg = /(^\s+)|(\s+$)|\s+/g;
                let name = values.name
                let password = values.password
                if (name == "insert" || password == "insert") {
                    Message.error("输入的有非法字符,请重新输入")
                    return
                } else if (name == "update" || password == "update") {
                    Message.error("输入的有非法字符,请重新输入")
                    return
                } else if (name == "or" || password == "or") {
                    Message.error("输入的有非法字符,请重新输入")
                    return
                } else if (name == "and" || password == "and") {
                    Message.error("输入的有非法字符,请重新输入")
                    return
                } else if (reg.test(name) || reg.test(password)) {
                    Message.error("不能输入空格")
                    return
                } else if (name == 'drop' || password == 'drop') {
                    Message.error("输入的有非法字符,请重新输入")
                    return
                } else {
                    // 调用发送方中处理注册用户函数
                    this.props.handleRegister(values)
                }

            }
        });
    };


    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className='regsiter'>
                <Form className="login-form">
                    <Form.Item>
                        {getFieldDecorator('name', {
                            rules: [{ required: true, message: '请输入你的用户名' }],
                        })(
                            <Input
                                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="用户名"
                                style={{ width: '80%', marginTop: '40px' }}
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
                            添加管理员
                        </Button>
                    </Form.Item>
                    <Form.Item>
                        <Link to="/login">已有账号? 去登录</Link>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}

// 接收方
const mapStateToProps = (state) => ({
    isLoading: state.get("register").get("isLoading")
})

// 发送方
const mapDispatchToProps = (dispatch) => ({
    handleRegister: (values) => {
        // 派发action处理用户注册数据
        dispatch(actionCreator.handleRegisterAction(values))
    }
})

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(Register);

export default connect(mapStateToProps, mapDispatchToProps)(WrappedNormalLoginForm)
