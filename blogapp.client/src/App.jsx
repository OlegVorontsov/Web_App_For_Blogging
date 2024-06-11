import React from 'react';
import './App.css';

function App() {
    const [currentCount, setCounter] = React.useState(0);
    
    return (
        <>
            <div className='card'>
                <h1>Counter Func</h1>
                <button className="btn btn-secondary" onClick={() => setCounter(currentCount + 1)}>{currentCount}</button>
            </div>
        </>
    )
}

export default App;