import Spinner from "@modules/common/icons/spinner"
import clsx from "clsx"
import React from "react"
import ArrowIcon from "../../icons/arrow"
import { motion, MotionProps } from 'framer-motion'

type PrimaryButtonProps = {
  isLoading?: boolean
  variant?: "primary" | "secondary",
} & React.ButtonHTMLAttributes<HTMLButtonElement> & MotionProps

const PrimaryButton = ({
  children,
  className,
  isLoading = false,
  variant = "primary",
  ...props
}: PrimaryButtonProps) => {
  return (
    <motion.button
      {...props}
      className={clsx(
        "w-full relative rounded-lg uppercase flex items-center justify-center min-h-[50px] px-5 py-8  border transition-colors duration-200 disabled:opacity-50",
        {
          "text-white  bg-white border-gray-900 disabled:hover:bg-gray-900 disabled:hover:text-white":
            variant === "primary",
          "text-gray-900 hover:text-gray-100 bg-transparent border-gray-920":
            variant === "secondary",
        },
        className
      )}>
      <span className={clsx("flex transition-all items-center w-full gap-2 text-lg sm:text-lg small:text-[25px] leading-[30px] font-bold uppercase justify-center h-full absolute top-1 left-2 rounded-lg ", {
        'bg-gray-900 hover:!bg-primary hover:!text-black hover:border hover:border-slate-900 ': variant === 'primary',
        'bg-white hover:!bg-slate-900': variant === 'secondary',
      })}>
        {isLoading ? <Spinner /> : children} <ArrowIcon size={32} className="mb-3" />
      </span>
    </motion.button>
  )
}

export default PrimaryButton
