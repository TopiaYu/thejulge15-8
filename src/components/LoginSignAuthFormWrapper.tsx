// components/AuthFormWrapper.tsx
import React from 'react';

const AuthFormWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-white">
      <div className="w-full max-w-md">{children}</div>
    </div>
  );
};

export default AuthFormWrapper;
