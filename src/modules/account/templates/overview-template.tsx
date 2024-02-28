import { useEffect } from "react";
import { useAccount } from "../../../lib/context/account-context";
import { useRouter } from "next/router";

const OverviewTemplate = () => {
  const { customer } = useAccount()
  const { replace } = useRouter()
  useEffect(() => {
    replace('/account/profile')
  }, [customer])


  return <div className="bg-black font-montserrat">
    <div className="bg-white">
      <div className="content-container py-10 small:py-20">
        <span className="text-3xl small:text-[60px] font-bold italic leading-[73px]">{
          'Hi ' + (customer?.first_name ?? '') + ' ' + (customer?.last_name ?? '')
        }</span>
      </div>
    </div>
  </div>
}

export default OverviewTemplate
