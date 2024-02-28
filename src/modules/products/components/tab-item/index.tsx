import clsx from "clsx";
import { useState } from "react";


function TabItem({ active, title, onClick }: { active?: boolean, title: string, onClick: React.MouseEventHandler }) {
  const [hover, setHover] = useState(false);
  return <div
    onClick={onClick}
    onMouseEnter={() => setHover(true)}
    onMouseLeave={() => setHover(false)}
    className={clsx("p-4 relative rounded-t transition-all cursor-pointer", {
      '!bg-black !text-white ': active || hover,
    })}>
    <span className="uppercase font-bold">
      {title}
    </span>

  </div>
}

export default TabItem