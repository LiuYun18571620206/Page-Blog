import React from 'react';
import Header from './component/Header.js'
import Benner from './component/Benner.js'
import {ContextProvider} from './reducer/reducer.js'
import Content from './component/Content.js'
import Recommend from './component/Recommend.js'
import User from './component/User.js'
import ReactDOM from 'react-dom';
import './Main/head.scss';

export default function App(prop){
    return(
        <ContextProvider>
        <Header />
        <Benner />
        <Content>
                <Recommend/>
                <User />
        </Content>
        </ContextProvider>)

}

ReactDOM.render(<App />, document.getElementById('root'));