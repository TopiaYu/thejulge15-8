'use client';

import { ReactNode } from 'react';
import { createPortal } from 'react-dom';

const NoticeModal = ({ children }: { children: ReactNode }) => {
  const body = document.body;
  return createPortal(
    <div className="fixed top-0 left-0 w-screen h-full flex items-center justify-center bg-black/25 bg z-40">
      {children}
    </div>,
    body,
  );
};

export default NoticeModal;
