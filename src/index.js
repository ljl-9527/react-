import React from 'react';
import ReactDOM from 'react-dom';
import './index.less';
import App from './App/App';
import { Provider } from 'react-redux';
import store,{ deal } from './store'
import { HashRouter, withRouter, Route } from 'react-router-dom'
// import reportWebVitals from './reportWebVitals';

let RouterApp = withRouter(App);
let DealRouterApp = deal(RouterApp);
ReactDOM.render(
  <HashRouter>
    <Provider store={store}>
    <DealRouterApp></DealRouterApp>
    </Provider>
  </HashRouter>,
  //第二种方法
//   <HashRouter>
//   <Route path='/' component={App}></Route>
// </HashRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
