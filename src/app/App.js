import React, { useState } from 'react';

const App = () => {
  
  const [clicks, setClicks] = useState(0);

  return (
    <div>
      <h1>React Clicker Application</h1>
      <button onClick={e => setClicks(clicks + 1)}>Clicked {clicks} times</button>
    </div>
  );
}

export default App;
