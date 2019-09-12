import React,{useState,useEffect,useRef,useContext} from 'react'
import {myContext} from '../reducer/reducer.js'
import alita from '../img/benner/alita.jpg'
import bojack from '../img/benner/bojack.jpg'
import spiderman from '../img/benner/spiderman.jpg'
import duola from '../img/benner/duola.jpg'
let time={} //计时器载体
function benner(prop){
    //imaElement是绑定img标签  background控制背景颜色
    let imgElement=useRef(null),background=useRef(null)
    //ben是图片在数组中的索引
    let [ben,useben]=useState(0)
    //图片数组
    let images=[alita,bojack,spiderman,duola]
    //点击事件的附加函数 点击后清除benner轮播的计时器 并开始重新计时
    function ClickTransition(){
        let imgs=imgElement.current
            clearTimeout(time.one)
            clearTimeout(time.two)
            clearTimeout(time.three)
            imgs.style.transition=''
            imgs.style.opacity=1
            time.one=setTimeout(imgTransition,5000)
    }
    //benner图透明度变化 在不完全透明时更新ben
    function imgTransition(){
        let imgs=imgElement.current
        imgs.style.transition='opacity 1s'
        imgs.style.opacity=0
        time.three=setTimeout(function(){useben(ben+1>listItems.length-1?0:ben+1)},500)
    }
    //获取自身索引位置 并根据索引位置更新ben
    let handleRadiusClick=(index)=>{
        function handleRadiusClick(e){//圆点点击事件
            ClickTransition()
            useben(index)
         }
         return handleRadiusClick
    }
    let listItems=images.map((img,index)=>{
            return <div key={index} onClick={handleRadiusClick(index)}><div /></div>
    })
    //将当前索引的节点 添加焦点类名
        listItems[ben]=(<div key={ben} onClick={handleRadiusClick(ben)}><div className="Radius-focus" /></div>)
    //开始自动轮播计时器与计算图片色调
    function handleImgOnload(e){
        let canvas=document.createElement('canvas')
        let image=e.target
        if(time.one||time.two){
            clearTimeout(time.one)
            clearTimeout(time.two)
            time.two=setTimeout(()=>{image.style.opacity=1},100)
        }
        time.one=setTimeout(imgTransition,5000)
        canvas.width=image.width
        canvas.height=image.height
        let context=canvas.getContext("2d")
        context.drawImage(image,0,0,canvas.width,canvas.height)
        let data=context.getImageData(0,0,image.width,image.height).data
        let r=data[0],g=data[1],b=data[2];//计算所有像素平均值
        for(let i=0;i<image.height;i++){
            for(let j=0;j<image.width;j++){
                r+=data[(i*j+j)*4]
                g+=data[(i*j+j)*4+1]
                b+=data[(i*j+j)*4+2]
            }
        }
        /*let r=data[0],g=data[1],b=data[2];  //取每个角100像素的rgb值
        for(let i=0;i<100;i++){
            r+=data[i*4]+data[(image.width-100+i)*4]+data[((image.width*(image.height-1))+i)*4]+data[((image.width*image.height)-100+i)*4]
            g+=data[i*4+1]+data[(image.width-100+i)*4+1]+data[((image.width*(image.height-1))+i)*4+1]+data[((image.width*image.height)-100+i)*4+1]
            b+=data[i*4+2]+data[(image.width-100+i)*4+2]+data[((image.width*(image.height-1))+i)*4+2]+data[((image.width*image.height)-100+i)*4+2]
        }*/
        r=Math.floor(r/(image.height*image.width))
        g=Math.floor(g/(image.height*image.width))
        b=Math.floor(b/(image.height*image.width))
        background.current.style.backgroundColor=`rgb(${r},${g},${b})`
    }
    //轮播左键
    function handleLeftClick(e){ 
        ClickTransition()
        let length=listItems.length-1
        if(ben-1<0){
            useben(length)   
        }else{
            useben(ben-1)
        }
    }
    //轮播右键
    function handleRightClick(e){
        ClickTransition()
        let length=listItems.length-1
        if(ben+1>length){
            useben(0)
        }else{
            useben(ben+1)
        }
    }

    return(<div id='benner' ref={background}>
            <div>
            <div className='left' onClick={handleLeftClick}>&lt;</div>
                <div className='image'>
                <img src={images[ben]} ref={imgElement} onLoad={handleImgOnload} style={{transition:''}}/>
                <div className='radius'>
                    {listItems}
                    </div>
                </div>
                <div className='user'>
                <h2>网易云首页模仿</h2>
                <p>这个轮播图的背景色是通过取当前图片的颜色平均值所得来的</p>
                    </div>
                    <div className='right' onClick={handleRightClick}>&gt;</div>
                </div>
            </div>)
}

export default benner