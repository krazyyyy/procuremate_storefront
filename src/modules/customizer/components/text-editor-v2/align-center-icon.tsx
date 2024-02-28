import clsx from "clsx";

type IconProps = {
  active: boolean
}


function AlignCenterIcon({ active = false, ...attributes }) {
  return <div {...attributes} className={clsx('cursor-pointer w-full h-full text-center flex items-center justify-center rounded-r',
    { '!bg-white': active }
  )}>
    <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 1L14 1" stroke={active ? 'black' : "white"} />
      <path d="M3 4H10" stroke={active ? 'black' : "white"} />
      <path d="M1 7L12 7" stroke={active ? 'black' : "white"} />
    </svg>
  </div>

}



export default AlignCenterIcon;