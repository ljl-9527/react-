import React,{ Component, createRef } from 'react';
import ShoppingCar from '../../components/ShoppingCar';
import axios from 'axios';
import { addLesson, deleteLesson } from '../../action'
import Movie from '../../components/Movie';
import './Detail.less'

class Detail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data:{},
            nav:'introduce',
            movie:'',
            isShowMovie: false
        }
        this.videoDOM = createRef();
        this.hasPlay = false;
    }

    getData() {
        let { params } = this.props.match;
        axios.get('/data/detail',{ params })
            .then(({ data }) => {
                console.log(this.props.state.lesson.findIndex(item => item._id === data.data._id));
                if(this.props.state.lesson.findIndex(item => item._id === data.data._id) >= 0) {
                    data.data.hasBuy = true;
                }
                this.setState(data);
            })
    }
    componentDidMount() {
        this.getData();
    }


    componentDidUpdate(props) {
        if(props.match.url !== this.props.match.url) {
                this.getData();
        }
    }

    showMovie(movie) {
        this.setState({
            movie,
            isShowMovie:true
        })
        if(this.hasPlay) {
            this.videoDOM.current.play()
        }
        this.hasPlay = true;
    }

    createSubList(movies) {
        return movies ? 
            movies.map((item, index) => 
                <li 
                    key={index}
                    onTouchEnd={e => this.showMovie(item)}    
                >{item.title}</li>
            ) :
            '';
    }

    toggleItem(item) {
        item.isShow = !item.isShow;
        this.setState({data: this.state.data})
    }

    createList() {
        // console.log(this.state.data);
        return this.state.data.list ? this.state.data.list.map(
            item =>
            <li key={item._id} className={item.isShow ? 'open item' : 'item'}>
                <h3 onTouchEnd={e => this.toggleItem(item)}><span>{item.title}</span></h3>
                <ul>{this.createSubList(item.movies)}</ul>
            </li>
            ) : '';
    }

    hideMovie(e) {
        //  console.log(e.target.tagName)
        // 点击div容器元素和标题可以隐藏
        if (e.target.tagName.toUpperCase() !== 'DIV') {
            // 跳过
            return;
        }
        // 解决点击穿透问题
        setTimeout(() => {
            // 隐藏
            this.setState({ isShowMovie: false });
            // console.log(this.videoDOM);
            // 暂停
            this.videoDOM.current.pause();
        }, 200) 
    }


    buyLesson() {
        let { data } = this.state;
        this.props.dispatch( data.hasBuy ? deleteLesson(data) : addLesson(data));
        data.hasBuy = !data.hasBuy;
        this.setState({ data })
    }

    render() {
       let { data, nav, movie, isShowMovie } = this.state;
    //    console.log(data);
        if(!data._id) {
            return(
                <div className="page-detail">
                    <p className='loading'>数据加载中.....</p>
                </div>
            )
        }
        return (
            <div className='page-detail'>
                <div className='img-part'>
                    <img src={data.img} alt="" />
                    <h2>{data.title}</h2>
                </div>
                <div className="introduce-part">
                    <div className='part-1'>
                        <div className="teacher">{data.teacher}</div>
                        <div className={'btn' + (data.hasBuy ? ' has-buy' : '')} onTouchEnd={e => this.buyLesson(e)}>{ data.hasBuy ? '取消购买' : '立即购买' }</div>
                    </div>
                    <div className="part-2">
                        <span className="price">{'$' + data.price}</span>
                        <span className="sales">{data.sales + '人一起学习'}</span>
                    </div>
                </div>
                {/* tab栏 */}
                <div className="main">
                <div className="nav">
                    <span className={nav === 'introduce' ? 'choose' : ''} onTouchEnd={e => this.setState({ nav: 'introduce' })}>课程内容</span>
                    <span className={nav === 'library' ? 'choose' : ''} onTouchEnd={e => this.setState({ nav: 'library' })}>课程目录</span>
                </div>
                {nav === 'introduce' && <div className="content" dangerouslySetInnerHTML={{__html:data.intro}}></div>}
               {nav === 'library' &&  <ul className='library'>{this.createList()}</ul>}
                </div>
                <ShoppingCar></ShoppingCar>
                <Movie {...movie} isShow={isShowMovie} onHide={e => this.hideMovie(e)} ref={this.videoDOM}></Movie>
            </div>
        );
    }
}

export default Detail;