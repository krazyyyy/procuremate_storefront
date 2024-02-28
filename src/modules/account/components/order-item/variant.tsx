import Image from "next/image";
import { motion } from 'framer-motion';
import { linearIntroAnimation } from "@lib/util/animation-util";

interface CheckoutCartItemProps {
  img: string,
  name: string,
  type: string,
  price: number,
  color: string,
  size: string,
  index: number,
}

const CheckoutCartItem = ({ img, name, type, price, color, size, index = 0 }: CheckoutCartItemProps) => {
  return <motion.div
    {...linearIntroAnimation('left', index * 0.15, 0.45)}
    className="w-full flex items-start justify-between  gap-4">
    <motion.div
      {...linearIntroAnimation('right', index * 0.15, 0.75)}
      className="bg-[#d9d9d9] p-3 rounded-lg">
      <Image style={{ objectFit: 'contain' }} src={img} alt={name} height={100} width={100} />
    </motion.div>
    <div className="flex flex-col justify-between h-full w-full">
      <span className="font-bold text-xl">
        {name}
      </span>
      <span className="font-bold text-base">
        ({type})
      </span>
      <span>Color: {color}</span>
      <span>Size: {size}</span>
    </div>
    <motion.button
      {...linearIntroAnimation('left', 0.3)}
      className="whitespace-nowrap">THB {price?.toLocaleString()}</motion.button>
  </motion.div>
}


export default CheckoutCartItem