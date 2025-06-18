import useAuth from '@/lib/hooks/use-auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

type Role = 'employer' | 'employee';

const RouterGuard = <T extends object>(
  WrapperComponent: React.ComponentType<T>,
  allowedRole: Role[],
) => {
  const Guard = (props: T) => {
    const router = useRouter();
    const { userData } = useAuth();

    useEffect(() => {
      if (!userData) {
        router.replace('/login');
      } else if (!allowedRole.includes(userData.item.user.item.type)) {
        router.replace('/');
      }
    }, [userData]);

    if (!userData || !allowedRole.includes(userData?.item.user.item.type)) return null;

    return <WrapperComponent {...props} />;
  };
  return Guard;
};

export default RouterGuard;
