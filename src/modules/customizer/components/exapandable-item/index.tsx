import clsx from "clsx";
import { useEffect, useState } from "react";


type ExpandableItemProps = {
  title: string,
  expandedInitially: boolean,
  children: React.ReactElement,
  close?: boolean,
  className?: string,
}


const ExpandableItem = ({ expandedInitially, children, title, close = false, className }: ExpandableItemProps) => {
  const [expanded, setExpanded] = useState<boolean>(false);

  useEffect(() => {
    if (expandedInitially) setExpanded(true);
  }, [expandedInitially])
  useEffect(() => {
    if (close) {
      setExpanded(false);
    }
  }, [close])

  return <div className={clsx("border-b border-t py-3  border-c-black-3", className)}>
    <div onClick={() => {
      setExpanded(!expanded);
    }} className="flex justify-between items-center cursor-pointer">
      <p className="select-none text-xs small:text-base">{title}</p>
      <ArrowIcon className={clsx(expanded ? "rotate-180" : 'rotate-0', 'transition-all cursor-pointer')} />
    </div>
    <div className={clsx(expanded ? "max-h-full" : "h-0 hidden max-h-0", "py-2 pt-8 transition-transform duration-150")}>{children}</div>
  </div>
}


export default ExpandableItem;


export const ArrowIcon = ({ ...attributes }) => {
  return <svg {...attributes} width="13" height="7" viewBox="0 0 13 7" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M6.5 5.15712L1.13313 0.0872344C1.00996 -0.0291186 0.810255 -0.0291186 0.687127 0.0872345L0.0923877 0.649019C0.0332207 0.704872 -2.71854e-07 0.780666 -2.68401e-07 0.859679C-2.64947e-07 0.938691 0.0332207 1.01448 0.0923877 1.07034L6.277 6.9127C6.40017 7.02906 6.59987 7.02906 6.723 6.9127L12.9076 1.07038C12.9668 1.01452 13 0.93873 13 0.859717C13 0.780705 12.9668 0.704911 12.9076 0.649058L12.3129 0.087274C12.1897 -0.029079 11.99 -0.029079 11.8669 0.087274L6.5 5.15712Z" fill="currentColor" />
  </svg>

}