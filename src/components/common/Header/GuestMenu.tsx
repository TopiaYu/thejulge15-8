import Link from 'next/link';

const GuestMenu = () => {
  return (
    <>
      <Link href="/login">로그인</Link>
      <Link href="/sign">회원가입</Link>
    </>
  );
};

export default GuestMenu;
