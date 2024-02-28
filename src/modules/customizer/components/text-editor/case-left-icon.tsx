import clsx from "clsx";

type IconProps = {
  active: boolean
}


function CaseLeftIcon({ active = false, ...attributes }) {
  return <div  {...attributes} className={clsx('cursor-pointer w-full h-full text-center flex items-center justify-center rounded-l',
    { '!bg-white': active }
  )}>
    <span className={active ? "text-black" : 'text-white'}>-</span>
  </div>;
}


export default CaseLeftIcon;