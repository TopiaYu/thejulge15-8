import Link from 'next/link';

const GuestMenu = () => {
  return (
    <>
      <Link href="/login">로그인</Link>
      <Link href="/signup">회원가입</Link>
    </>
  );
};

export default GuestMenu;
