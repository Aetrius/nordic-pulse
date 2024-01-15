import {useState} from 'react';
import logo from './assets/images/viking-ship.png';
import './App.css';
import NavAppBar from './NavAppBar';
import Dashboard from './Dashboard';
import RemoteServer from './RemoteServer';

function App() {
    return (
        <div id="App">
            <div id="navBar">
                <NavAppBar />
            </div>    
            {/* <img src={logo} alt="logo"/> */}
            <RemoteServer />
        </div>
    )
}

export default App;
