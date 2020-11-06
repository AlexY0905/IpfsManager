import React, { Component } from 'react'
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import './index.css'
import HomeHeader from  '../header/index'
import HomeSider from '../sider/index'


const { SubMenu } = Menu;
const { Content, Sider } = Layout;

class HomeLayout extends Component {
    constructor(props){
        super(props)
    }
    render() {
        return (
            <div>
                <Layout>
                    <HomeHeader />
                    <Layout>
                    <HomeSider />
                        <Layout style={{ padding: '0 24px 24px' }}>
                            <Content
                                style={{
                                    background: '#fff',
                                    padding: 24,
                                    margin: 0,
                                    minHeight: 280,
                                    textAlign:'left',
                                    marginTop:'24px'
                                }}
                            >
                                {this.props.children}
                            </Content>
                        </Layout>
                    </Layout>
                </Layout>
            </div>
        )
    }
}

export default HomeLayout
