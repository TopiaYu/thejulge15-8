import useAuth from './use-auth';

const useToken = () => {
  const { userData } = useAuth();
  const token = userData?.item.token;
  return token;
};
export default useToken;
