'use client';

import RouterGuard from '@/components/common/RouterGuard';
import MyStore from './MyStore';
import RegisteredJob from './RegisteredJob';

function OwnerStoreDetail() {
  return (
    <>
      <MyStore />
      <RegisteredJob />
    </>
  );
}

export default RouterGuard(OwnerStoreDetail, ['employer']);
