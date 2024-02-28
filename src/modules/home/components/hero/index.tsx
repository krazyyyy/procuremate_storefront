import { useInView, motion } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import PrimaryButton from "@modules/common/components/primary-button";
import { useProductsFilter } from "@lib/context/filter-context";
import { useRouter } from "next/router";


const primaryButtonAnimation = {
  initial: { scale: 0, rotate: 320 },
  animate: { rotate: 360, scale: 1 },
  transition: {
    type: "spring",
    stiffness: 260,
    damping: 20
  }
}


function Hero() {
  const ref = useRef(null);
  const view = useInView(ref);
  const { collections } = useProductsFilter()
  const router = useRouter()

  const spring = (delay: number = 0) => {
    return {
      initial: { opacity: 0, x: -100, },
      animate: { opacity: view ? 1 : 0, x: view ? 0 : -100 },
      transition: {
        duration: 1,
        type: 'spring',
        delay,
      },
    }
  }

  const headerAnimation = {
    initial: { opacity: 0, x: -10, y: 20 },
    animate: { opacity: !view ? 0 : 1, x: !view ? -10 : 0, y: !view ? 20 : 0 },
    transition: {
      duration: 1,
      type: 'spring'
    },
  }

  return <div ref={ref} className="w-screen h-[128vh] relative">
    <Image objectFit="cover" src="/cover.avif" alt="background"  layout="fill" className="" loading="eager" />
    <div className="content-container h-full relative">
      <div className="absolute left-0 p-4 top-0 text-white text-4xl flex w-full h-full  items-center justify-start font-montserrat">
        <div className="flex flex-col">
          <motion.span
            {...headerAnimation}
            className="font-black text-4xl leading-[45px] italic small:leading-[73px] small:text-[60px]">Procuremate</motion.span>
          <h1 className="text-base font-normal leading-normal">
            <motion.span {...spring(0.1)} className="text-xl small:text-[30px] leading-[37px] font-medium">Sneaker Shop for</motion.span>
            <motion.span {...spring(0.24)} className="text-xl  small:text-[30px] block small:my-4 leading-[24px] font-normal">Sneaker, Footwear, Shoes & More </motion.span>
          </h1>
          <motion.div
            {...primaryButtonAnimation}
            className="max-w-xl mt-5">
            {/* <Link passHref href="/products" scroll={false}> */}
            <PrimaryButton onClick={() => {
              var col = collections?.find((c) => c.handle.includes('products'));
              if (col)
                router.push(col.handle);
            }} variant="secondary" >Products</PrimaryButton>
            {/* </Link> */}
          </motion.div>
        </div>
      </div>
    </div>
  </div>
}


export default Hero;