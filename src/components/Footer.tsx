import Image from 'next/image';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="w-full h-[126px] sm:h-[100px] px-5 pt-8 pb-4 sm:px-8 sm:py-[37px] bg-gray-10 relative sm:static">
      <ul className="flex items-center justify-between text-[#7D7986] text-sm font-normal leading-[22px] sm:text-base sm:leading-[26px]">
        <li className="absolute bottom-4 sm:static sm:bottom-0">&copy;codeit-2023</li>
        <li>
          <ul className="flex items-center justify-between gap-[30px]">
            <li>Privacy Policy</li>
            <li>FAQ</li>
          </ul>
        </li>
        <li>
          <ul className="flex items-center justify-between gap-2.5">
            <li>
              <Link href="mailto:thejulge@example.com">
                <Image src="/email.png" width={25} height={25} alt="Email" />
              </Link>
            </li>
            <li>
              <Link href="https://www.facebook.com/">
                <Image src="/facebook.png" width={25} height={25} alt="Facebook" />
              </Link>
            </li>
            <li>
              <Link href="https://www.instagram.com/">
                <Image src="/insta.png" width={25} height={25} alt="Instagram" />
              </Link>
            </li>
          </ul>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
