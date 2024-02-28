import Image from "next/image";
import BackIcon from "@modules/common/icons/back-icon";
import ForwardIcon from "@modules/common/icons/forward-icon";
import { HTMLAttributes } from "react";

interface ProductEditorProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  handleBack: () => void;
  handleFront: () => void;
  src: string;
  alt: string;
  zoom?: number;
}

const ProductEditor = ({ title, src, alt, handleBack, handleFront, zoom, ...rest }: ProductEditorProps) => {
  return (
    <div className="w-full py-6 h-full min-h-fit text-center" {...rest}>
      <Image
        src={src}
        height={513}
        width={563}
        objectFit="contain"
        className={`scale-[${zoom ?? "1"}]`}
        alt={alt}
      />

      <div className="flex select-none z-20 relative gap-4 w-full items-center mt-4 justify-center">
        <BackIcon className="cursor-pointer" onClick={handleBack} />
        <span>{title} View</span>
        <ForwardIcon className="cursor-pointer" onClick={handleFront} />
      </div>
    </div>
  );
};

export default ProductEditor;
