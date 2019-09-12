import React,{useState,useEffect,useContext} from 'react'
function Content(prop){
    return (
        <div className='content'>
            {prop.children}
        </div>
    )
}
export default Content