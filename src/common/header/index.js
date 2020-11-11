import React, { Component } from 'react'
import { Layout, Menu, Breadcrumb, Icon, Dropdown } from 'antd';
// import { Link } from "react-router-dom";
import './index.css'
import { getUsername, removeUsername } from 'util/index'

const { Header } = Layout;

class HomeHeader extends Component {
    constructor(props) {
        super(props)
        this.handleLogout = this.handleLogout.bind(this)
        this.handleAddAdmin = this.handleAddAdmin.bind(this)
    }

    handleLogout() {
        //清除本地缓存用户信息
        removeUsername()
        //清除后回到登录页面
        window.location.href = '/login'
    }
    handleAddAdmin() {//添加管理员函数
        removeUsername()
        window.location.href = '/register'
    }

    render() {
        const menu = (
            <Menu>
                <Menu.Item key="1" onClick={this.handleLogout}>
                    <Icon type="logout" /> 退出
                </Menu.Item>
                <Menu.Item key="2" onClick={this.handleAddAdmin}>
                    <Icon type="plus-circle" />添加管理员
                </Menu.Item>
            </Menu>
        )
        return (
            <div>
                <Header className="header">
                    <div className="logo">
                        lotus管理
                    </div>
                    <Dropdown overlay={menu} trigger={['click']}>
                        <a className="ant-dropdown-link" href=" ">
                            {getUsername()} <Icon type="down" />
                        </ a>
                    </Dropdown>
                </Header>
            </div>
        )
    }
}

export default HomeHeader
