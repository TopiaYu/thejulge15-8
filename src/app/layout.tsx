import type { Metadata } from 'next';
import './globals.css';

import LayoutWrapper from '../components/LayoutWrapper';

export const metadata: Metadata = {
  title: '더줄게 | 알바 공고 매칭 서비스',
  description: '당신의 알바 매칭을 도와주는 더줄게 서비스입니다',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
