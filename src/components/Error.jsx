import React from 'react';

const Error = ({ error }) => {
  return (
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
      <strong>Ошибка:</strong> {error}
    </div>
  );
};

export default Error;