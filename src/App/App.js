import React,{ Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom'
import Home from '../pages/Home/Home';
import Detail from '../pages/Detail/Detail';
import Buy from '../pages/Buy/Buy';
import Header from '../components/Header'
import { deal } from '../store'
import './App.less';

let DealDetail = deal(Detail);
let DealBuy = deal(Buy)

class App extends Component {
    render() {
      // console.log(this.props);
      let { history } = this.props;
      return (
        <div className='App'>
           <Header
            onLeftClick={e => history.goBack()}
            onSearch={e => history.push('/search/' + e)}
           >
             <Link to='/'>梁炯麟授课平台</Link>
           </Header>
            <Switch>
              <Route path='/search/:word' name='search' component={ Home }></Route>
              <Route path='/detail/:id' name='detail' component={ DealDetail }></Route>
              <Route path='/buy' name='buy' component={ DealBuy }></Route>
              <Route path='*' name='default' component={ Home }></Route>
            </Switch>
        </div>
      );
    }
}

export default App;
