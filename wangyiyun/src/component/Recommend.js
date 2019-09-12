import React,{useState,useEffect,useContext,useRef} from 'react'

let br=false //true为动画执行中 false为静止
function Recommend(prop){
    //两个数组代表的是轮播的两页
    let arrs=[6,7,8,9,10]
    let arr=[1,2,3,4,5]
    arr=arr.map((value,index)=>(<div key={index}>{value}</div>))
    arrs=arrs.map((value,index)=>(<div key={index}>{value}</div>))
    //两页用四个element来轮换
    let oneLine=useRef(null),twoLine=useRef(null),threeLine=useRef(null),fourLine=useRef(null);
    let Line=[oneLine,twoLine,threeLine,fourLine]
    let [arry,usearry]=useState([
        (<div className='tenLine a' ref={oneLine} key={0} style={{left:'-825px'}}>
        {arrs}
        </div>),
        (<div className='tenLine b' ref={twoLine} key={1} style={{left:'-825px'}}>
                        {arr}
                        </div>),
        (<div className='tenLine c' ref={threeLine} key={2} style={{left:'-825px'}}>
                        {arrs}
        </div>),
        (<div className='tenLine d' ref={fourLine} key={3} style={{left:'-825px'}}>
                        {arr}
                        </div>)
        ])
    //月份与星期数
    let s=new Date(),ti;
    switch(s.getDay()){
        case 0:
            ti='星期日'
            break;
            case 1:
                ti= '星期一'
                break;
                case 2:
                    ti= '星期二'
                    break
                    case 3:
                        ti= '星期三'
                        break
                        case 4:
                            ti= '星期四'
                            break
                            case 5:
                                ti= '星期五'
                                break
                                case 6:
                                    ti= '星期六'
                                    break
    }
    //在第一次渲染的时候为四个element绑定transitionend 这是渲染结束后触发的事件 React中好像没有支持
    useEffect(()=>{
        for(let i=0;i<Line.length;i++){
            Line[i].current.addEventListener('transitionend',function(e){
                br=false
                e.target.style.transition='none'
            })
        }
    },[])
    //轮播左键
    function handleLeftClick(e){
if(!br){
            br=true
            arry.unshift(arry.pop())
            let s=[...arry]
            usearry(s)
            let left=parseInt(Line[0].current.style.left)
            console.log(1)
            for(let i=0;i<Line.length;i++){
                Line[i].current.style.left=left-825+'px'
            }
            left=parseInt(Line[0].current.style.left)
            setTimeout(()=>{
                for(let i=0;i<Line.length;i++){
                Line[i].current.style.transition='left 2s'
                Line[i].current.style.left=left+825+'px'
            }
        },0)
        }
    }
    /*
    轮播的逻辑是：先修改state数组中四个节点的位置 然后更新状态 当我usearry(arry)发现不会引起渲染 然后我只得浅复制一个数组来更新
    更新后让因为我的布局是relative 当我用absolute 绝对定位时 出现了BUG(元素都被隐藏了) 因为我找不到这个BUG的原因 
    使用relative 在每次移动前 更新四个节点的位置 并保持可见领域相对的位置 然后移动位置 
    当我移动位置时 React页面反馈给我是瞬间完成的 这应该是useState的异步性导致的 最后用setTimeout将代码拖延到下一个事件循环中就正常了
    */
    //轮播右键
    function handleRightClick(e){
        if(!br){
            br=true
            arry.push(arry.shift())
            let s=[...arry]
            usearry(s)
            let left=parseInt(Line[0].current.style.left)
            console.log(1)
            for(let i=0;i<Line.length;i++){
                Line[i].current.style.left=left+825+'px'
            }
            left=parseInt(Line[0].current.style.left)
            setTimeout(()=>{
                for(let i=0;i<Line.length;i++){
                Line[i].current.style.transition='left 2s'
                Line[i].current.style.left=left-825+'px'
            }
        },1)
        }
    }
    return (
        <div className='Recommend'>
            <div className="bottomBorder one">
            <div className='title'>
                热门推荐
            </div>
            <ul>
                <li>华语</li><li className='line'>|</li>
                <li>流行</li><li className='line'>|</li>
                <li>摇滚</li><li className='line'>|</li>
                <li>民谣</li><li className='line'>|</li>
                <li>电子</li>
                </ul>
                <div className='rightTitle'>更多</div>
                </div>
                <div className='musicList'>
                <div><div><div><span>{Math.floor(Math.random()*10000)}</span><div>⑤</div></div></div><a>听歌识人：哪一首故事，是你的故事？</a></div>
                <div><div><div><span>{Math.floor(Math.random()*10000)}</span><div>⑤</div></div></div><a>朋克摇滚是怎样影响电子音乐的？</a></div>
                <div><div><div><span>{Math.floor(Math.random()*10000)}</span><div>⑤</div></div></div><a>爵士&Pop丨 Bad Girl 丨 脏女孩

</a></div>
                <div><div><div><span>{Math.floor(Math.random()*10000)}</span><div>⑤</div></div></div><a> 第32期丨茶走</a></div>
                <div><div><div><span>{Math.floor(Math.random()*10000)}</span><div>⑤</div></div></div><a>花房午后 · 37℃柔情小调</a></div>
                <div><div><div><span>{Math.floor(Math.random()*10000)}</span><div>⑤</div></div></div><a> Revealed Radio 225 - Blackcode</a></div>
                <div><div><div><span>{Math.floor(Math.random()*10000)}</span><div>⑤</div></div></div><a>英语民谣，安静的舒服(๑´ㅂ`๑)</a></div>
                <div><div><div><span>{Math.floor(Math.random()*10000)}</span><div>⑤</div></div></div><a> River（cover：Charlie Puth）</a></div>
                    </div>
                <div className="bottomBorder">
                    <div className="title">个性化推荐
                    </div>
                    </div>
                <div className='push'>
                    <div className='one'>
                        <div>
                            <div>
                                {ti}
                                </div>
                                <p>{s.getDate()}</p>
                            </div>
                            <p>每日歌曲推荐
                            </p>
                            <p>根据你的口味生成，
                                每天6:00更新
                            </p>
                            </div>
                    <div><div><div className='bottomLine'><span>{Math.floor(Math.random()*10000)}</span><div>⑤</div></div></div><p>[聚精会神] 工作学习必备专属背景音乐

</p><p>猜你喜欢</p></div>
                    <div><div><div className='bottomLine'><span>{Math.floor(Math.random()*10000)}</span><div>⑤</div></div></div><p>国内|独立/迷幻/另类摇滚&朋克狂热集</p><p>根据你喜欢的单曲《再谈记忆》推荐</p></div>
                    <div><div><div className='bottomLine'><span>{Math.floor(Math.random()*10000)}</span><div>⑤</div></div></div><p>Future Bass┇迷幻萌动的清新系旋律</p><p>根据你喜欢的单曲《Grind Me Down (Jawster Remix)》推荐</p></div>
                    </div>
                <div className="bottomBorder">
                    <div className='title'>
                        新歌上架
                        </div>
                        <div className='rightTitle'>
                            更多
                            </div>
                    </div>
                    <div className='three'>
                        <div className='left' onClick={handleLeftClick}>&lt;</div>
                        <div className='center'>
                            <div className='box'>
                        {arry}
                        </div>
                        </div>
                        <div className='right' onClick={handleRightClick}>
                        &gt;
                        </div>
                        </div>
                    <div className="bottomBorder">
                        <div className='title'>榜单
                            </div>
                            <div className='rightTitle'>
                                更多
                            </div>
                        </div>
                        <div>
                            </div>
            </div>
    )
}
export default Recommend