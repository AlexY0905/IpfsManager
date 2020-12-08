import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link, Switch, Redirect, } from "react-router-dom";
import Register from 'pages/register/index';
import Login from 'pages/login/index';
import Home from 'pages/home/index';
import LotusHelp from 'pages/lotusHelp/index';
import ServerManage from 'pages/serverManage/index';
import Monitor from 'pages/monitor/index';
import Ipssh from 'pages/ipssh/index';
import AddGroup from 'pages/addGroup/index';
import Grouping from 'pages/grouping/index';
import LotusMiner from 'pages/lotusMiner/index';
import { getUsername } from 'util';

function App() {
  // 自定义路由
  // 当用户在浏览器的地址栏中手动输入页面路由地址时, 进行一个对页面的保护判断
  // 如果当前浏览器的缓存中有后台管理员的登录用户名时, 就跳转到手动输入的页面中, 如果没有, 就自动跳转到登录页面
  const ProtectRoute = ({ component: Component, ...rest }) => (<Route
    {...rest}
    render={(props) => {
      // return getUsername() ? <Component {...props} /> : <Redirect to="/register" />
      return getUsername() ? <Component {...props} /> : <Redirect to="/login" />//第一次登陆进来默认是登录页面
    }}
  />)
  // 对当前登录路由做一个判断, 如果当前后台管理已经登录了管理员账号, 就自动跳转到首页, 如果没有, 就自动跳转到登录页
  const LoginRoute = ({ component: Component, ...rest }) => (<Route
    {...rest}
    render={(props) => {
      return getUsername() ? <Redirect to="/" /> : <Component {...props} />
    }}
  />)
  //想要注册管理员,必須先登录(获取权限)
  // const GoLogin = ({ component: Component, ...rest }) => (<Route
  //   {...rest}
  //   render={(props) => {
  //     return getUsername() ? <Component{...props} /> : <Redirect to="/login" />
  //   }}
  // />)
  return (
    <Router forceRefresh={true}>
      <div className="App">
        <Switch>
          <ProtectRoute exact path='/' component={LotusHelp} />
          <ProtectRoute path='/home' component={Home} />
          <ProtectRoute path='/lotusminer' component={LotusMiner} />
          <ProtectRoute path='/serverManage' component={ServerManage} />
          <ProtectRoute path='/Monitor' component={Monitor} />
          <ProtectRoute path='/ipssh' component={Ipssh} />
          <ProtectRoute path='/addgroup' component={AddGroup} />
          <ProtectRoute path='/grouping' component={Grouping} />
          <LoginRoute path='/register' component={Register} />
          <LoginRoute path='/login' component={Login} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
