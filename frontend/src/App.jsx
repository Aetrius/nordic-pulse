import {useState} from 'react';
import logo from './assets/images/viking-ship.png';
import './App.css';
import NavAppBar from './NavAppBar';
import Dashboard from './Dashboard';
import RemoteServer from './RemoteServer';
import Monitor from './components/monitor/Monitor';

function App() {

    const [parentResult, setParentResult] = useState('');

    const handleResultChange = (result) => {
        // Update the parent component's state with the result
        setParentResult(result);
      };
    

    return (
        <div id="App">
            <div id="navBar">
                <NavAppBar />
            </div>    
            {/* <img src={logo} alt="logo"/> */}
            <RemoteServer onResultChange={handleResultChange}/>
            <Monitor pingResults={parentResult}/>
        </div>
    )
}

export default App;
