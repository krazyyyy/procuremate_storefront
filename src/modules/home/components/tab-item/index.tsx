import clsx from "clsx";
import PureDropdown from "@modules/layout/components/pure-dropdown"
import { useState } from "react";


function TabItem({ active, items, title, onClick }: { active?: boolean, items: any[], title: string, onClick: (value: string) => void }) {
  const [hover, setHover] = useState(false);
  return <div
    onMouseEnter={() => setHover(true)}
    onMouseLeave={() => setHover(false)}
    className={clsx("p-4 relative rounded-t cursor-pointer", {
      '!bg-black !text-white ': hover,
    })}>
    <PureDropdown title={title} open={hover}>
      <div className="absolute top-full left-0 text-white min-w-fit w-full bg-black rounded-b p-4 py-8">
        {items?.map((item: any) => {
          return <div onClick={() => onClick(item)} className={clsx("hover:text-primary font-medium my-1  whitespace-nowrap text-base")} key={item}>
            <span>{item}</span>
          </div>
        })}
      </div>
    </PureDropdown>
  </div>
}

export default TabItem