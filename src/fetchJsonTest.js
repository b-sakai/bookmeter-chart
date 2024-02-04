import React, { useEffect } from 'react';
import bookData from './python/book_data.json';

const JsonTest = () => {
  useEffect(() => {
    console.log('JSON Data:', bookData);
  }, []);

  return (
    <div>
      {/* ここに表示するコンポーネントなどを追加 */}
    </div>
  );
};

export default JsonTest;

