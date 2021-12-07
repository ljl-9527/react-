import React,{ Component } from 'react';
import Swiper from '../../components/Swiper';
import Card from '../../components/Card'
import ShoppingCar from '../../components/ShoppingCar';

import axios from 'axios'




class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data:[]
        }
    }
  
    getData() {
        // console.log(this.props.match);
        let { path, params } = this.props.match;
            let url;
            if(path === '/search/:word') {
                url = '/data/search?word=' + params.word;
            } else {
                url = '/data/home'
            }

            axios.get(url)
            .then(({ data }) => this.setState(data));
    }

    createList() {
        return this.state.data.map(item => <Card key={item._id} data={item}></Card>)
    }

    componentDidUpdate(props) {
        //状态更新 存在期方法也执行
        if(props.match.url !== this.props.match.url) {
            this.getData()
        }
    }

    componentDidMount() {
        this.getData()
    }


    render() {
        return (
            <div style={{paddingBottom: 60}}>
              <Swiper
              url={[
                  '/static/img/banner/01.jpg',
                  '/static/img/banner/02.jpg',
                  '/static/img/banner/03.jpg',
                  '/static/img/banner/04.jpg',
                  '/static/img/banner/05.jpg',
              ]}
              ></Swiper>
              {this.createList()}
              <ShoppingCar></ShoppingCar>
            </div>
        );
    }
}


export default Home;