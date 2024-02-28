import clsx from "clsx";
import { useRouter } from "next/router";
import { FC, useMemo } from "react";
import { SidebarItemType } from "../../sidebar";


const SidebarItem: FC<SidebarItemType & { onClick: React.MouseEventHandler }> = ({ id, href, layer, onClick }) => {
  const router = useRouter();

  const active = useMemo(() => {
    return href?.replaceAll('/customizer/', '') == ((router.query.customizer?.at(0) ?? '#'))
  }, [href, router])

  const className = clsx(
    "border-[1px] min-w-[120px] transition-all h-24 flex flex-col items-center justify-center cursor-pointer break-words hover:bg-c-black-2 px-2 text-center py-2 rounded-[5px]",
    { "!bg-primary !text-black": active }
  );

  return (
    <div
      id={id}
      onClick={onClick}
      className={className}
      aria-label={`Go to ${layer?.name} page`}>
      <span className="font-bold text-[10px] small:text-sm uppercase">{layer?.name}</span>
      <span className={clsx(
        "uppercase text-[10px] small:text-sm line-clamp-1 font-medium",
        {
          'text-green-400': layer.customizer_area_id?.optional && !active && !layer.selected_value,
          'text-red-400': !layer.customizer_area_id?.optional && !active && !layer.selected_value,
        }
      )}>
        ({layer.selected_value && layer.selected_value.name.length > 0 ? layer.selected_value?.name : (layer?.customizer_area_id?.optional === true) ? 'Optional' : 'Required'})
      </span>
    </div>
  )
}

export default SidebarItem;
