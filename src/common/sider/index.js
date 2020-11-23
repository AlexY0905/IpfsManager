//左边栏页面
import React, { Component } from 'react'
import { NavLink } from "react-router-dom"
import { Layout, Menu, Icon, } from 'antd'
import "./index.css"


const { SubMenu } = Menu;
const { Sider } = Layout;


class HomeSider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: ''
        }
    }
    render() {
        return (
            <div className="homesider">
                <Sider width={200} style={{ background: '#fff' }} >
                    <Menu
                        mode="inline"
                        style={{ minHeight: '750px', borderRight: 0 }}
                    >
                        <SubMenu
                            key="sub1"
                            title={
                                <span>
                                    <Icon type="user" />
                                    lotus管理
                                </span>
                            }
                        >
                            <Menu.Item key="1">
                                <NavLink exact to='/'><Icon type="laptop" /> lotus管理</NavLink>
                            </Menu.Item>
                        </SubMenu>

                        <SubMenu
                            key="sub2"
                            title={
                                <span>
                                    <Icon type="laptop" />
                                    批量部署
                                </span>
                            }
                        >
                            <Menu.Item key="2">
                                <NavLink to='/serverManage'><Icon type="laptop" />资产管理</NavLink>
                            </Menu.Item>
                            <Menu.Item key="3">
                                <NavLink to='/Monitor'><Icon type="video-camera" /> 本地机器监控</NavLink>
                            </Menu.Item>
                            <Menu.Item key="4">
                                <NavLink to='/ipssh'><Icon type="laptop" />批量命令</NavLink>
                            </Menu.Item>
                            {/*<Menu.Item key="5">*/}
                            {/*    <NavLink to='/fileupload'><Icon type="file-ppt" />文件传输</NavLink>*/}
                            {/*</Menu.Item>*/}
                        </SubMenu>
                    </Menu>
                </Sider>
            </div>
        );
    }
}


export default HomeSider