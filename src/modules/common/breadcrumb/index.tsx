import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import ArrowIcon from '../icons/arrow';

function BreadCrumb() {
  const router = useRouter();
  const breadcrumbs = ['home', ...router.asPath.split('/').filter(x => x)];

  return (
    <div className='flex gap-2 my-1 rounded uppercase items-center'>
      {breadcrumbs.map((b, index) => (
        <React.Fragment key={b}>
          <div className='rounded-md px-5 py-1 border bg-gray-50'>
            <Link className='hover:text-black text-gray-600 font-medium text-sm'
              href={`/${breadcrumbs.map((b) => b === 'home' ? b.replaceAll('home', '/') : b).slice(0, index + 1).join('/')}`}>
              {b.replaceAll('-', ' ')}
            </Link>
          </div>
          {index !== breadcrumbs.length - 1 && (
            <ArrowIcon className="rotate-180" />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

export default BreadCrumb;