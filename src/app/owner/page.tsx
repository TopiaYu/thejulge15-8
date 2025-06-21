'use client';

import RegisterForm from '../owner/Register/page';
import RouterGuard from '@/components/common/RouterGuard';

const Owner = () => {
  return (
    <div>
      <RegisterForm />
    </div>
  );
};

export default RouterGuard(Owner, ['employer']);
