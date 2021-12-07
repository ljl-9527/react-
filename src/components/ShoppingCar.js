import React, { Component } from 'react';
import { deal } from '../store';
import { withRouter } from 'react-router-dom';
import './ShoppingCar.less';
// let DealShoppingCar = deal(ShoppingCar)

class ShoppingCar extends Component {


    // getPrice() {
    //     return this.props.state.lesson
    //         .reduce((res,item) => {
    //            return res + +item.price
    //         },0)
    //             .toFixed(2);
    // }

    showBuyPage() {
       setTimeout(() => {
        if(+this.props.price() > 0) {
            this.props.history.push('/buy')
        } else {
             return alert('please buy')
        }
       },200)
    }

    render() {
        // console.log(this.props);
        return (
            <div  className='ljl-shopping-car'>
                <span className='price'>{`$${this.props.price()}元`}</span>
                <span className='btn' onTouchEnd={e => this.showBuyPage()}>选好了</span>
            </div>
        );
    }
}

//返回高阶组件不用重复拓展
export default withRouter(deal(ShoppingCar));