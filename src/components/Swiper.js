import React, { Component,createRef } from 'react';
import './Swiper.less'
class Swiper extends Component {
    constructor(props){
        super(props);
        this.state = {
            num:0
        }
        this.isAnimate = false;
        this.container = createRef()
        this.timer = null;
    }

    startInterval() {
        this.timer = setInterval(() => {
            this.setState({ num: this.state.num + 1 })
            this.isAnimate = true;
        },this.props.time)
    }

    changeImage(num) {
        // console.log(num);
        this.setState({ num });
        clearInterval(this.timer)
        this.isAnimate = true;
        this.startInterval();
    }

    createBtns() {
        let realIndex = this.getIndex();
        return this.props.url.map((item,index) => <span key={item} className={index === realIndex ? 'choose' : ''}
        onTouchEnd={e => this.changeImage(index)}
        ></span>)
    }

    getIndex() {
        if(this.props.url.length) {
            return this.state.num % this.props.url.length;
        }
        return 0;
    }

    componentDidMount() {
        this.startInterval()
        this.container.current.addEventListener('webkitTransitionEnd',() => {
            // console.log(111);
            this.isAnimate = false;
        })
    }

    componentWillUnmount() {
        this.setState = () => false;
    }

    render() {
        let { url, width, height} = this.props;
        return (
            <div
            ref={this.container}
            className='ljl-swiper'
            style={{
                backgroundImage:`url(${url[this.getIndex()]})`,
                width,
                height
            }}
            >
               <div className="btns">{this.createBtns()}</div>
            </div>
        );
    }
}


Swiper.defaultProps = {
    url:[],
    width:'100%',
    height:200,
    time:2000
}




export default Swiper