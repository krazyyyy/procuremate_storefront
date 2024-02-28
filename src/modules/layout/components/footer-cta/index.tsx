import PrimaryButton from "../../../common/components/primary-button"
import Link from "next/link"
const FooterCTA = () => {
  return (
    <div className="bg-black w-full font-montserrat">
      <div className="content-container py-4 flex flex-col  gap-y-8 small:flex-row small:items-center justify-between relative">
        <span className="text-white uppercase small:text-[40px] leading-[49px] font-bold">
          register with us to get 10% off on your order
        </span>
        <PrimaryButton variant="secondary" className="max-w-sm" ><Link href="/account/login?q=discount#register">Register</Link></PrimaryButton>
      </div>
    </div>
  )
}

export default FooterCTA


