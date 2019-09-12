import React,{useState,useEffect} from 'react'
import user from '../img/user.jpg'
import bottoms from '../img/bottom_extend.png'
function Red(prop){
    return(<div id='headSubclass'>
        <div>
            <div><span className='focus'>推荐</span></div>
            <div><span>排行榜</span></div>
            <div><span>歌单</span></div>
            <div><span>主播电台</span></div>
            <div><span>歌手</span></div>
            <div><span>新碟上架</span></div> 
            </div>
            </div>)
}
function Inputs(prop){
    let handleFocus=function(e){
        e.target.placeholder=''
    }
    let hanldeBlur=function(e){
        e.target.placeholder='音乐/视频/电台/用户'
    }
    let handleKeyDown=function(e){
        if(e.keyCode===13){
            alert('目前未开放搜索功能')
        }
    }

    return (
        <>
        <input type='text' placeholder='音乐/视频/电台/用户' onFocus={handleFocus} onBlur={hanldeBlur} onKeyDown={handleKeyDown}/>
        </>
    )
}
function Header(prop){
    //判定现在处在哪个网页中 这是本地环境下的
    return(
        <>
    <div id="Header">
        <ul>
            <li className="LOGO">
                某某云音乐
            </li>
            <li className="but focus">发现音乐<div id='bundle'>&nbsp;</div></li>
            <li className="but">我的音乐<div id='my'>&nbsp;</div></li>
            <li className="but">朋友<div id='friend'>&nbsp;</div></li>
            <li className="but">商城</li>
            <li className="but">音乐人</li>
            <li className="but">下载客户端</li>
            <li className="inp"><Inputs /></li>
            <li className="czz">创作者中心</li>
            <li className="user"><img src={user}/><img src={bottoms} />
            <div className="option" >
            <ul>
                <li>我的主页</li>
                <li>我的消息</li>
                <li>我的等级</li>
                <li>VIP会员</li>
                <li>个人设置</li>
                <li>实名认证</li>
                <li>退出</li>
                </ul>
            </div>
            </li>
            </ul>
    </div>
    <Red />
    </>)
}

export default Header