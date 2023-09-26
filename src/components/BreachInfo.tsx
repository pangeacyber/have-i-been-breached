// components/BreachInfo.js
import React, { useEffect } from 'react';
import { Progress } from './ui/progress';

interface BreachInfoProps {
    breachCount: number
}

const BreachInfo = ({breachCount}: BreachInfoProps) => {

  useEffect(() => {console.log(breachCount)}, [breachCount])
  return (
    <div className="w-1/2">
      <h2 className="text-xl font-semibold mb-4">Breach Information</h2>

      {/* Display credit score UI here */}
      <div className="mb-4">
        <p className='text-md font-light'>Breach Count: {breachCount}</p>
        <Progress value={breachCount} breachCountColor={breachCount > 75 ? 'bg-red-600' : breachCount > 25 ? 'bg-yellow-600' : 'bg-green-600'} />
      </div>

      {/* Display previous passwords and other breach data here */}
      <div>
        {/* Display breach data */}
      </div>
    </div>
  );
};

export default BreachInfo;