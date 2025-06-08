'use client';

import { usePathname } from 'next/navigation';
import Header from '../components/common/Header/Header';
import Footer from '../components/common/Footer/Footer';

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAuthPage = pathname === '/login' || pathname === '/sign';

  return (
    <>
      {!isAuthPage && <Header />}
      <main>{children}</main>
      {!isAuthPage && <Footer />}
    </>
  );
}
