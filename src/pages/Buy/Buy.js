import React,{ Component } from 'react';
import Card from '../../components/Card';
import axios from 'axios';
import './Buy.less';

class Buy extends Component {

    createList() {
        return this.props.state.lesson.map(item => <Card key={item._id} data={item}></Card>)
    }

    buyLesson() {
        axios.post('/data/buy',{ ids: this.props.state.lesson.map(item => item._id)})
            .then(({ data }) => {
                if(data.error === 0) {
                    alert('购买成功');
                } else {
                    alert('购买失败');
                }
            })
    }

    render() {
        console.log(this.props);
        return (
            <div className='page-buy'>
                <div className="price-part">
                    <div className="price-title">商品总价</div>
                    <div className="price-num">{'$' + this.props.price()}</div>
                </div>
                <div className="btns-part">
                    <span className="cancel" onTouchEnd={e => this.props.history.goBack()}>取消购买</span>
                    <span className="buy" onTouchEnd={e => this.buyLesson()}>立即购买</span>
                </div>
                <h3 className='buy-title'>已购课程</h3>
                <div className="line"></div>
                {this.createList()}
            </div>
        );
    }
}

export default Buy;