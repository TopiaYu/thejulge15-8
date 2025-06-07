'use client';

import { useEffect } from 'react';

const Notice = () => {
  useEffect(() => {
    const latest = localStorage.getItem('latest');
    console.log(latest);
  }, []);

  return (
    <>
      <div>공지</div>
    </>
  );
};

export default Notice;
