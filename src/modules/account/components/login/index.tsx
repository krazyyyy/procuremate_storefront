import { medusaClient } from "@lib/config"
import { LOGIN_VIEW, useAccount } from "@lib/context/account-context"
import Button from "@modules/common/components/button"
import Input from "@modules/common/components/input"
import Spinner from "@modules/common/icons/spinner"
import { useRouter } from "next/router"
import { useState } from "react"
import { FieldValues, useForm } from "react-hook-form"
import PrimaryButton from "../../../common/components/primary-button"
import Checkbox from "../../../common/components/checkbox"
import { useCart } from "medusa-react"
import Medusa from '@lib/services/api'
import { toast } from "react-toastify"

interface SignInCredentials extends FieldValues {
  email: string
  password: string
}

const Login = () => {
  const { loginView, refetchCustomer } = useAccount()
  const [forgotPass, setForgotPass] = useState(false);
  const [_, setCurrentView] = loginView
  const [authError, setAuthError] = useState<string | undefined>(undefined)
  const router = useRouter()
  const [keep, setKeep] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleError = (_e: Error) => {
    setAuthError("Invalid email or password");
    setLoading(false);
  }

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInCredentials>()

  const onSubmit = handleSubmit(async (credentials) => {
    setLoading(true);
    await medusaClient.auth
      .authenticate(credentials)
      .then(() => {
        refetchCustomer()
        router.push("/account/profile")
      })
      .catch(handleError)

  })

  const submitForgotPass = handleSubmit(async (credentials) => {
    setLoading(true);
    var response = await Medusa.customers.resetPassword(credentials.email);
    const { status } = response.data;
    if (status === 'success') {
      toast.success("Password reset successfully, check your email.");
      setForgotPass(false);
    } else {
      toast.error("Email is not a registered user.")
    }
    setLoading(false);

  })

  if (forgotPass) {
    return <div className="w-full max-w-xl">
      <form onSubmit={submitForgotPass}>
        <Input
          label="Email"
          {...register("email", { required: "Please enter a valid email-address" })}
          autoComplete="email"
          errors={errors}
        />
        <PrimaryButton isLoading={loading} className="mt-6">Reset</PrimaryButton>
      </form>
    </div>
  }

  return (
    <div className="max-w-xl w-full flex flex-col items-center">
      {isSubmitting && (
        <div className="z-10 fixed inset-0 bg-white bg-opacity-50 flex items-center justify-center">
          <Spinner size={24} />
        </div>
      )}
      <form className="w-full" onSubmit={onSubmit}>
        <div className="flex flex-col w-full gap-y-2">
          <Input
            label="Email"
            {...register("email", { required: "Please enter a valid email-address" })}
            autoComplete="email"
            errors={errors}
          />
          <div className="flex justify-between items-end underline">
            <div
              onClick={(e) => {
                e.preventDefault();
                setForgotPass(true)
              }}
              className="text-center text-gray-700 text-small-regular mt-3">
              Forgot your password?{" "}
            </div>
          </div>
          <Input
            label="Password"
            {...register("password", { required: "Password is required" })}
            type="password"
            autoComplete="current-password"
            errors={errors}
          />
        </div>
        <div className="mt-3">
          <Checkbox label=" Keep me logged in." checked={keep} onChange={() => setKeep(!keep)} />
        </div>
        {authError && (
          <div>
            <span className="text-rose-500 w-full text-small-regular">
              {authError}
            </span>
          </div>
        )}
        <PrimaryButton role="button" className="mt-6">Login</PrimaryButton>
      </form>

    </div>
  )
}

export default Login
