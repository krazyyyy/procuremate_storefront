import clsx from "clsx";
import Image from "next/image";


type ProductPreviewProps = {
  title: string,
  active: boolean,
  onClick: React.MouseEventHandler,
  src: string,
}
function ProductPreview({ active, title, src, onClick }: ProductPreviewProps) {
  return <div onClick={onClick} className={clsx("bg-gray-300 shadow rounded-[2px] p-3 cursor-pointer w-full text-center h-full flex flex-col gap-4",
    {
      '!bg-gray-500': active,
      '!text-white': active,
    }
  )}>
    <Image 
      key={src}
      src={src}
      height={100}
      objectFit="contain"
      width={100}
      alt={title} />
    <p className="">{title} View</p>
  </div>
}

export default ProductPreview