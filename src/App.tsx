import React, { useState } from 'react';

export const App: React.FC = () => {
  const [count, setCount] = useState(0);
  return (
    <main style={{ fontFamily: 'system-ui', padding: '2rem' }}>
      <h1>React + Vite + TypeScript</h1>
      <p>Minimal starter with best practices.</p>
      <button onClick={() => setCount((c) => c + 1)}>Clicked {count} times</button>
    </main>
  );
};

