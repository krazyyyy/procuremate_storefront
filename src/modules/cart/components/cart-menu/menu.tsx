import clsx from "clsx"
import useToggleState from "@lib/hooks/use-toggle-state"
import useCartSidebar from "@lib/hooks/use-cart-sidebar"
import { motion } from 'framer-motion'
import CartItem from "../cart-item"
import { linearIntroAnimation } from "@lib/util/animation-util"
import Input from "@modules/common/components/input"
import CloseIcon from "@modules/common/icons/close"
import Checkbox from "../../../common/components/checkbox"
import PrimaryButton from "../../../common/components/primary-button"

export default function CartMenu({ children }: any) {
  const { toggle, state } = useToggleState()
  const { toggle: toggleLogin, state: loggedIn } = useToggleState();
  const { items, clearAll, handleAmountChange } = useCartSidebar();

  return <div className="">
    <div onClick={toggle}>{children}</div>
    <aside className="w-full">
      <div onClick={toggle} className={clsx("fixed w-screen bg-black z-10 bg-opacity-50 transition-all top-0 h-screen right-0 ", { 'hidden': !state })} />
      <div className={clsx("fixed w-screen overflow-y-scroll max-w-lg z-50 shadow-lg transition-all duration-300 top-0 h-screen bg-white right-0", !state ? 'translate-x-full' : 'translate-x-0')}>
        {loggedIn ? <>
          <div className="px-5 pt-5 flex justify-between items-center">
            <span className="uppercase font-bold small:text-base">cart</span>
            <button onClick={clearAll} className="font-normal ">
              Clear All
            </button>
          </div>
          <div className="flex px-5 pb-5 items-center w-full justify-between">
            <span>{items.length} items</span>
          </div>

          <div className="px-5">
            <div className="flex max-w-3xl flex-col w-full  gap-10">
              {items.map((c, i) => {
                return <CartItem
                  index={i}
                  line_item={c}
                  key={i} onAmountChange={(amount) => handleAmountChange(i, amount)} />
              })}
            </div>
            <motion.div  {...linearIntroAnimation('right', 0.3)} className="flex flex-col w-full gap-4 mt-5">
              <Input name="promo" title="Promo Code/Voucher" label="Promo Code/Voucher" />
              <Input name="gift" title="Gift Card" label="Gift Card" />
              <div className="text-xl">
                <div className="flex  justify-between w-full">
                  <span className="">Subtotal</span>
                  <span>THB 20,000.00</span>
                </div>
                <div className="flex font-bold justify-between w-full">
                  <span className="">Total</span>
                  <span>THB 20,000.00</span>
                </div>
              </div>
            </motion.div>
          </div>
          <div className="h-40 w-full" />
        </>
          : <>
            <div className="px-5 pt-5 flex flex-col w-full gap-5 justify-between">
              <span className="uppercase font-bold small:text-base">
                I already have an account:
              </span>
              <Input name="email" title="Email" label="Email" />
              <Input name="password" title="Password" label="Password" />
              <Checkbox label="Keep me logged in" />
              <PrimaryButton>Login</PrimaryButton>
              <span className="text-[40px] font-bold">OR</span>
              <PrimaryButton>Continue as guest</PrimaryButton>
            </div>

          </>}
      </div>
      {state && <button onClick={toggle} className="fixed max-w-lg flex-col gap-2 right-0 bottom-10 z-50 py-5 bg-black text-white flex items-center justify-center w-full text-center">
        <CloseIcon />
        Close
      </button>}
    </aside>
  </div>
}
