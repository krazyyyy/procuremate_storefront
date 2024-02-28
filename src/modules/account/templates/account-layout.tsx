import { useAccount } from "@lib/context/account-context"
import Spinner from "@modules/common/icons/spinner"
import React, { useEffect, useState } from "react"
import Tabbar from "../components/tabbar"
import { useRouter } from "next/router"

const AccountLayout: React.FC = ({ children }) => {
  const { customer, retrievingCustomer, checkSession } = useAccount()
  const { pathname } = useRouter()

  useEffect(() => {
    checkSession()
  }, [checkSession])

  const [tabs, setTabs] = useState([
    { title: 'Account', href: 'profile' },
    { title: 'Your Designs', href: 'design' },
    { title: 'Orders', href: 'orders' },
  ]);
  const [tab, setTab] = useState(0);

  useEffect(() => {
    if (pathname.includes('orders')) {
      setTab(2);
    } else if (pathname.includes('design')) {
      setTab(1);
    } else {
      setTab(0)
    }

  }, [pathname])

  if (retrievingCustomer || !customer) {
    return (
      <div className="flex items-center justify-center w-full min-h-[640px] h-full text-gray-900">
        <Spinner size={36} />
      </div>
    )
  }

  const getTitleText = () => {
    if (pathname.includes('profile')) {
      return "Create Your Profile | Procuremate";
    } else if (pathname.includes('design')) {
      return "Your Design";
    } else {
      return "Track Your Procuremate Orders";
    }
  };

  const titleText = getTitleText();

  return (
    <div className="bg-black font-montserrat">
      <div className="bg-white">
        <div className="content-container py-10 small:py-20">
          <h1 className="text-3xl small:text-[60px] font-bold italic leading-[73px]">
            {titleText}
          </h1>
        </div>
        <Tabbar setTab={setTab} tab={tab} tabs={tabs} />
        {children}
      </div>
    </div>
  )
}

export default AccountLayout
