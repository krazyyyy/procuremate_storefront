import { useAccount } from "@lib/context/account-context"
import AccountSection from "../components/account-section"

const ProfileTemplate = () => {
  const { customer, retrievingCustomer, } = useAccount()

  if (retrievingCustomer || !customer) {
    return null
  }

  return (
    <div className="w-full">
      <AccountSection customer={customer} />
    </div>
  )
}

const Divider = () => {
  return <div className="w-full h-px bg-gray-200" />
}

export default ProfileTemplate
