import { medusaClient } from "@lib/config"
import { useAccount } from "@lib/context/account-context"
import Input from "@modules/common/components/input"
import Spinner from "@modules/common/icons/spinner"
import Link from "next/link"
import { useRouter } from "next/router"
import { useState } from "react"
import { FieldValues, useForm } from "react-hook-form"
import PrimaryButton from "@modules/common/components/primary-button"
import Checkbox from "../../../common/components/checkbox"
export interface RegisterCredentials extends FieldValues {
  first_name: string
  last_name: string
  email: string
  password: string
  phone?: string,
  confirm_password?: string,
}

const Register = () => {
  const { loginView, refetchCustomer, customer } = useAccount()
  const [_, setCurrentView] = loginView
  const [authError, setAuthError] = useState<string | undefined>(undefined)
  const router = useRouter()
  const [gender, setGender] = useState('male')
  const [confirm, setConfirm] = useState(false)

  const handleError = (e: Error) => {
    setAuthError("An error occured. Please try again.")
  }

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch
  } = useForm<RegisterCredentials>()

  const onSubmit = handleSubmit(async (credentials) => {
    await medusaClient.customers
      .create({
        first_name: credentials.first_name,
        last_name: credentials.last_name,
        phone: credentials.phone,
        email: credentials.email,
        password: credentials.password,
      })
      .then(async (data) => {
        refetchCustomer()
        let metadata: Record<string, unknown> = { gender };
        if (router.query.q) {
          metadata.discount = true
        }
        await medusaClient.customers.update({
          metadata
        })
        refetchCustomer()
        router.push("/account")
      })
      .catch(handleError)
  })

  const password = watch('password')

  return (
    <div className="max-w-lg flex flex-col items-center">
      {isSubmitting && (
        <div className="z-10 fixed inset-0 bg-white bg-opacity-50 flex items-center justify-center">
          <Spinner size={24} />
        </div>
      )}
      <form className="w-full flex flex-col" onSubmit={onSubmit}>
        <div className="flex flex-col w-full gap-y-4">
          <Input
            label="First name"
            title="Enter your first name"
            {...register("first_name", { required: "First name is required", })}
            autoComplete="given-name"
            errors={errors}
          />
          <Input
            title="Enter your last name"
            label="Last name"
            {...register("last_name", { required: "Last name is required" })}
            autoComplete="family-name"
            errors={errors}
          />
          <div className="flex gap-6">
            <Checkbox
              label="Male"
              checked={gender === 'male'}
              onChange={() => {
                setGender('male')
              }} />
            <Checkbox
              label="Female"
              checked={gender === 'female'}
              onChange={() => { setGender('female') }} />
            <Checkbox
              label="Other"
              checked={gender === 'other'}
              onChange={() => { setGender('other') }} />
          </div>
          <Input
            label="Email"
            title="Enter a valid email address"
            {...register("email", { required: "Email is required" })}
            autoComplete="email"
            errors={errors}
          />
          <Input
            title="Password is required"
            label="Password"
            {...register("password", {
              required: "Password is required",
              minLength: 8,
              validate: (value) => isPasswordValid(value) || 'Minimum should be 8 characters password.'
            })}
            type="password"
            autoComplete="new-password"
            errors={errors}
          />
          <Input
            title="Confirm Password is required"
            label="Confirm password"
            {...register("confirm_password", {
              required: "Confirm Password is required",
              minLength: 8,
              validate: (val) => val === password || 'Password do not match'
            })}
            type="password"
            autoComplete="confirm-password"
            errors={errors}
          />
          {/* <span className="text-small-regular">Minimum 8 characters with at least one uppercase, one lowercase, one special character and a number.</span> */}
          <Input
            title="Phone"
            label="Phone"
            {...register("phone", {
            })}
            type="text"
            autoComplete="phone"
            errors={errors}
          />
        </div>
        <div className="w-full mt-4 flex items-start">
          <span className="mt-1">
            <Checkbox checked={confirm} label="" onChange={() => setConfirm(!confirm)} />
          </span>
          <span className="text-small-regular">By clicking “REGISTER” and continuing to create account, I acknowledge that I have read and understood the Terms and Conditions and Procuremate  <Link href="/content/privacy-policy" className="underline">
            Privacy Policy
          </Link>{" "}, as well as the(each as may be updated from time to time), and hereby agree to be bound by such terms.</span>
        </div>
        {authError && (
          <div>
            <span className="text-rose-500 w-full text-small-regular">
              {authError}
            </span>
          </div>
        )}
        <PrimaryButton onClick={(e) => {
          onSubmit(e)
        }} className="mt-6">Signup</PrimaryButton>
      </form>
    </div>
  );
}

export default Register

export function isPasswordValid(password: string) {
  // Check if the password meets the requirements
  return password.length >= 8;
  // var pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=~`[\]{}|:;"'<>,.?/]).{8,}$/;
  // return pattern.test(password);
}
