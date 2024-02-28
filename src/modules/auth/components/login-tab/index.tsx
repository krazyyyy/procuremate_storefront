import clsx from 'clsx'
import React from 'react'

function LoginTab({ title, active, onClick }: { title: string, active: boolean, onClick: React.MouseEventHandler }) {
  return (
    <div
      onClick={onClick}
      className={clsx(
        'border-b transition-all text-center w-full hover:bg-gray-50 cursor-pointer pt-2',
        { '!border-b-4 border-black': active, }
      )}>
      <h1 className='uppercase font-bold font-montserrat small:text-[40px]'>{title}</h1>
    </div>
  )
}

export default LoginTab