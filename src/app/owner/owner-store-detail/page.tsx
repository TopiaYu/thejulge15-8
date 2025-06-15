'use client';

import MyStore from './MyStore';
import RegisteredJob from './RegisteredJob';

export default function OwnerStoreDetail() {
  const Hardcooded_shop_id = 'cc5003b4-870f-4adb-bfe2-d906c33d04b7';
  return (
    <>
      <MyStore />
      <RegisteredJob shopId={Hardcooded_shop_id} />
    </>
  );
}
