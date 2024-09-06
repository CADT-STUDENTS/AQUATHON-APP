'use client';

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export function TopNav() {
  return (
    <nav className='w-full bg-[#7E83DE] shadow-md fixed top-0 left-0 right-0 z-10'>
      <div className='flex items-center h-16 px-6'>
        <Link href='/' passHref>
          <Image src='/assets/icons/ic_logo_text.svg' alt='Logo' width={160} height={45} className='cursor-pointer' />
        </Link>
      </div>
    </nav>
  );
}
