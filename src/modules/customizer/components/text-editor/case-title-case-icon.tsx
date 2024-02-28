import clsx from "clsx";

type IconProps = {
  active: boolean
}


function CaseTitleCaseIcon({ active = false, ...attributes }) {
  return <div  {...attributes} className={clsx('cursor-pointer w-full h-full text-center flex items-center justify-center',
    { '!bg-white': active }
  )}>
    <span className={active ? "text-black" : 'text-white'}>Ab</span>
  </div>;
}


export default CaseTitleCaseIcon;