import { LOGIN_VIEW, useAccount } from "@lib/context/account-context"
import Register from "@modules/account/components/register"
import { useRouter } from "next/router"
import { useEffect } from "react"
import Login from "../components/login"
import Image from "next/image"
import LoginTab from "../../auth/components/login-tab"

const LoginTemplate = () => {
  const { query, replace, asPath } = useRouter()
  const { loginView, customer, retrievingCustomer } = useAccount()
  const [currentView, setCurrentView] = loginView

  useEffect(() => {
    const hasHash = asPath.includes('#');
    if (hasHash) {
      var value = asPath?.split('#').at(1);
      if (value === 'register') {
        setCurrentView(LOGIN_VIEW.REGISTER)
      }
    }
  }, [asPath])

  const router = useRouter()

  useEffect(() => {
    if (!retrievingCustomer && customer) {
      router.push("/account/profile")
    }
  }, [customer, retrievingCustomer, router])

  return (
    <div className="">
      <div className='flex flex-wrap-reverse'>
        <div className="relative w-full aspect-square small:w-1/2 small:aspect-[14/14]">
          <Image
            src="/login-bg.png"
            alt=""
            layout="fill"
            objectFit="cover"
            className="absolute inset-0"
          />
        </div>
        <div className='w-full p-4 small:w-1/2 mx-auto max-w-3xl'>
          <div className="flex border-b w-full justify-between mb-2 border-b-black h-20">
            <LoginTab
              onClick={() => {
                replace({ hash: 'login' })
                setCurrentView(LOGIN_VIEW.SIGN_IN)
              }}
              title='Log in'
              active={currentView == LOGIN_VIEW.SIGN_IN} />
            <LoginTab
              onClick={() => {
                replace({ hash: 'register' })
                setCurrentView(LOGIN_VIEW.REGISTER)
              }}
              title='Sign up'
              active={currentView == LOGIN_VIEW.REGISTER} />
          </div>
          <div className="w-full flex justify-center py-5">
            {currentView === "sign-in" ? <Login /> : <Register />}
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginTemplate
