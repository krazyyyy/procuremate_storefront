import clsx from "clsx";

type IconProps = {
  active: boolean
}


function AlignLeftIcon({ active = false, ...attributes }) {
  return <div  {...attributes} className={clsx('cursor-pointer w-full h-full text-center flex items-center justify-center rounded-l',
    { '!bg-white': active }
  )}>
    <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 1H14" stroke={active ? 'black' : 'white'} />
      <path d="M0 4H7" stroke={active ? 'black' : 'white'} />
      <path d="M0 7H10" stroke={active ? 'black' : 'white'} />
    </svg>
  </div>;
}



export default AlignLeftIcon;