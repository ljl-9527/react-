import React, { Component } from 'react';
import './Header.less'

class Header extends Component {
    constructor(props){
        super(props);
        this.state = {
            isShow:false,
            msg:''
        }
    }
    showSearch(e) {
        if(e.keyCode === 13) {
            this.props.onSearch(this.state.msg);
            this.setState({msg:'', isShow:false})
        }
    }
    render() {
        let { leftContent ,rightContent, title, cancelText, placeholder, children, onLeftClick, onSearch} = this.props;
        let { isShow, msg } = this.state;
        return (
            <div className='ljl-header'>
                <div className="left" onTouchEnd={e => onLeftClick(e)}>{leftContent}</div>
                <div className="center">{children || title}</div>
                <div className="right" onTouchStart={e => this.setState({isShow:true})}>{rightContent}</div>
                <div className="search" style={{display:isShow ? '' : 'none'}}>
                    <input type="text" placeholder={placeholder} value={msg} onChange={e => this.setState({msg: e.target.value})} onKeyDown={e => this.showSearch(e)} />
                    <span onTouchEnd={e => this.setState({isShow:false})}>{cancelText}</span>
                </div>
            </div>
        );
    }
}

Header.defaultProps = {
    leftContent:'返回',
    rightContent:'搜索',
    title:'',
    cancelText:'取消',
    placeholder:'请输入搜索内容',
    onLeftClick() {},
    onSearch() {}
}

export default Header