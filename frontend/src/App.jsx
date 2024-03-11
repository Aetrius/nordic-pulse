// App.jsx
import React, { useState, useEffect } from 'react';
import NavAppBar from './NavAppBar';
import Dashboard from './Dashboard';
import Settings from './Settings';
import Exports from './Exports';
import Updates from './Updates';

function App() {
  const [currentPage, setCurrentPage] = useState('Updates'); // Default view
  const [key, setKey] = useState(0);

  const handleMenuClick = (option) => {
    console.log(`Selected option: ${option}`);
    setCurrentPage(option);
    setKey(prevKey => prevKey + 1); // Change the key to force a re-render
  };

  useEffect(() => {
    // Your side effect logic here
  }, [currentPage]);

  return (
    <div id="App">
      <div id="navBar">
        <NavAppBar onMenuClick={handleMenuClick} />
      </div>

      {currentPage === 'Dashboard' && <Dashboard />}
      {currentPage === 'Settings' && <Settings />}
      {currentPage === 'Exports' && <Exports />}
      {currentPage === 'Updates' && <Updates />}
    </div>
  );
}

export default App;
