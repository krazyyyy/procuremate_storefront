import { useEffect, useState } from "react";
import BackIcon from "@modules/common/icons/back-icon";
import { linearIntroAnimation } from "@lib/util/animation-util";
import ForwardIcon from "@modules/common/icons/forward-icon";
import PrimaryButton from "@modules/common/components/primary-button";
import { motion } from 'framer-motion'

const ProductReviews = ({ reviews = [] }: { reviews: string[] }) => {
  const [index, setIndex] = useState(0);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    setInView(false);
    setTimeout(() => {
      setInView(true);
    }, 300)
  }, [index])


  const goForward = () => {
    if (index < (reviews.length - 1)) {
      setIndex(index + 1);
    } else {
      setIndex(0)
    }
  }
  const goBackward = () => {
    if (index > 1) {
      setIndex(index - 1)
    } else {
      setIndex(reviews.length - 1)
    }
  }

  return <div className='bg-white py-10 content-container flex justify-between'>
    <div>
      <span className="font-bold">
        {reviews.length} reviews
      </span>
      <div className="flex w-full max-w-md gap-2 items-center select-none">
        <BackIcon onClick={goBackward} className='min-w-[20px] cursor-pointer' />
        <motion.p
          className='text-xs small:text-base'
          {...linearIntroAnimation('left', 0.75, 0.45)}
        >{reviews[index] ?? "I recently purchased the Titan Tornado Boxing Shorts and they're fantastic! Super comfortable, great fit, and the design is stylish. They've held up well during my intense training sessions. Highly recommended for any boxer!"}
        </motion.p>
        <ForwardIcon onClick={goForward} className='min-w-[20px] cursor-pointer' />
      </div>
    </div>
    <PrimaryButton className='max-w-xs my-auto' >Write a review</PrimaryButton>
  </div>
}

export default ProductReviews;