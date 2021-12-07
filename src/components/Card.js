import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import './Card.less'
class Card extends Component {
    render() {
        let { data } = this.props
        // console.log(this.props);
        return (
            <Link to={'/detail/' + data._id} className='ljl-card'>
                <img src={data.img} alt="" />
                <h2>{data.title}</h2>
                <div className="introduce">
                    <span className='sales'>{data.sales + '人一起学习'}</span>
                    <span className='price'>{'$' + data.price}</span>
                    <span className='button'>立即购买</span>
                </div>
            </Link>
        );
    }
}

Card.defaultProps = {
    data:{}
}


export default Card