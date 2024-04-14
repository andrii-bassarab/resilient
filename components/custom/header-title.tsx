'use client';

import { usePathname } from 'next/navigation';

export const HeaderTitle = () => {
  const pathname = usePathname();

  const title = pathname.substring(1) || 'Home';

  return (
    <div className='flex sm:hidden'>
      <span className='text-lg capitalize'>{title}</span>
    </div>
  );
};
