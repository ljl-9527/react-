import React, { Component, forwardRef } from 'react';
import './Movie.less'

let lineHeight = window.outerHeight - 50 + 'px';

class Movie extends Component {
    render() {
        // console.log(this.props);
        let { title, movie, isShow, icktRef, onHide } = this.props;
        return (
            <div className='ljl-movie'
                onTouchEnd={ e => onHide(e)}
                style={{
                    lineHeight,
                    display:isShow ? '' : 'none'
                }}
            >
                <div className="title">{title}</div>
                <video src={movie} autoPlay controls ref={icktRef}></video>
            </div>
        );
    }
}


Movie.defaultProps = {
    title:'',
    movie:'',
    isShow:false,
    onHide() {}
}

export default forwardRef((props, ref) => <Movie {...props} icktRef={ref} ></Movie> );