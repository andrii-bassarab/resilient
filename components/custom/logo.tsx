import Image from 'next/image';

import logo from '@/public/logo_dark.png';

export const Logo = () => {

  return <Image src={logo} alt='logo' height={32} width={32} />
}