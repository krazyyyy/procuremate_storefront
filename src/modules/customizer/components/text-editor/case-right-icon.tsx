import clsx from "clsx";

type IconProps = {
  active: boolean
}


function CaseRightIcon({ active = false, ...attributes }) {
  return <div  {...attributes} className={clsx('cursor-pointer w-full h-full text-center flex items-center justify-center rounded-r',
    { '!bg-white': active }
  )}>
    <span className={active ? "text-black" : 'text-white'}>ab</span>
  </div>;
}


export default CaseRightIcon;