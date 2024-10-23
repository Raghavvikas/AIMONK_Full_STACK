import React, { useEffect, useState } from 'react';

function Test() {
    const [message, setMessage] = useState('');

    useEffect(() => {
        // Fetch data from backend
        fetch('http://localhost:5000/api')
            .then(response => response.json())
            .then(data => setMessage(data.message));
    }, []);

    return (
        <div className="App">
            <h1>{message}</h1>
        </div>
    );
}

export default Test;
