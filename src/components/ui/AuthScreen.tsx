// AuthScreen.js
import React from 'react';

const AuthScreen = ({login}: any) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-80 z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-2xl font-semibold mb-4">Welcome to Secure ChatGPT</h1>
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" onClick={() => {
            login()
        }}>
          Login to Continue
        </button>
      </div>
    </div>
  );
};

export default AuthScreen