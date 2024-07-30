import React, { useState } from 'react';

const App: React.FC = () => {
  const [text, setText] = useState('');
  const [response, setResponse] = useState<{ 'Amharic text'?: string, 'Audio output Location'?: string, error?: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const requestData = { text };

    try {
      const res = await fetch('https://q5ltq1bf-8933.uks1.devtunnels.ms/generate_out_put', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      const data = await res.json();
      setResponse(data);
    } catch (error) {
      console.error('Error:', error);
      setResponse({ error: 'Failed to fetch data from the server' });
    }
  };

  return (
    <div>
      <h1>Text to Speech Converter</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text"
          required
        />
        <button type="submit">Convert</button>
      </form>
      {response && (
        <div>
          {response.error ? (
            <p>Error: {response.error}</p>
          ) : (
            <div>
              <p>Amharic text: {response['Amharic text']}</p>
              <p>Audio output Location: {response['Audio output Location']}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default App;