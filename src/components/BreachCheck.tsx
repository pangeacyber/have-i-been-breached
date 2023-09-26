// components/BreachCheck.js
import React, { ChangeEvent, useState } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';

interface BreachCheckProps {
    setBreachCount: Function;
}

const BreachCheck = ({setBreachCount}: BreachCheckProps) => {
  const [email, setEmail] = useState('');
  const [breachData, setBreachData] = useState(null);

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async () => {
    await fetch('/api/lookup/user', {
    method: 'POST', 
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        email: email,
    }),
    })
    .then(response => response.json()) 
    .then(data => {
        console.log(data.breach_count)
        setBreachCount(data.breach_count)
    }) 
    .catch((error) => console.error('Error:', error));

  };

  return (
    <div className="w-1/3 mr-4">
      <h2 className="text-xl font-semibold mb-4">Have I been breached?</h2>
      {/* <input
        type="text"
        placeholder="Enter your email"
        className="w-full p-2 mb-2 border rounded"

      />
      <button
        onClick={handleSubmit}
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      >
        Check
      </button> */}
        <div className="flex w-full max-w-sm items-center space-x-2">
            <Input type="email" placeholder="Email"
                    value={email}
                    onChange={handleEmailChange} />
            <Button type="submit"
            onClick={handleSubmit}>Check 🕵️‍♀️</Button>
        </div>

      {/* Display breach data here once available */}
      {breachData && (
        <div className="mt-4">
          {/* Display breach information */}
        </div>
      )}
    </div>
  );
};

export default BreachCheck;