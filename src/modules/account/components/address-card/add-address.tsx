import { medusaClient } from "@lib/config"
import { useAccount } from "@lib/context/account-context"
import useToggleState from "@lib/hooks/use-toggle-state"
import CountrySelect from "@modules/checkout/components/country-select"
import Button from "@modules/common/components/button"
import Input from "@modules/common/components/input"
import Modal from "@modules/common/components/modal"
import Spinner from "@modules/common/icons/spinner"
import React, { useState } from "react"
import { useForm } from "react-hook-form"

type FormValues = {
  first_name: string
  last_name: string
  city: string
  country_code: string
  postal_code: string
  province?: string
  address_1: string
  address_2?: string
  phone?: string
  company?: string
}

const AddAddress: React.FC = () => {
  const { state, open, close } = useToggleState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | undefined>(undefined)

  const { refetchCustomer } = useAccount()
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>()

  const handleClose = () => {
    reset({
      first_name: "",
      last_name: "",
      city: "",
      country_code: "",
      postal_code: "",
      address_1: "",
      address_2: "",
      company: "",
      phone: "",
      province: "",
    })
    close()
  }

  const submit = handleSubmit(async (data: FormValues) => {
    setSubmitting(true)
    setError(undefined)

    const payload = {
      first_name: data.first_name,
      last_name: data.last_name,
      company: data.company || "",
      address_1: data.address_1,
      address_2: data.address_2 || "",
      city: data.city,
      country_code: data.country_code,
      province: data.province || "",
      postal_code: data.postal_code,
      phone: data.phone || "",
      metadata: {},
    }

    medusaClient.customers.addresses
      .addAddress({ address: payload })
      .then(() => {
        setSubmitting(false)
        refetchCustomer()
        handleClose()
      })
      .catch(() => {
        setSubmitting(false)
        setError("Failed to add address, please try again.")
      })
  })

  return (
    <>
      <button
        className="border border-gray-200  p-5 min-h-[220px] h-full w-full flex flex-col justify-center items-center"
        onClick={open}
      >
        <span className="text-base-semi flex items-center justify-center flex-col gap-2">
          <svg width="45" height="44" viewBox="0 0 45 44" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M44.2402 19.1H25.6402V0.799996H19.3402V19.1H0.740234V25H19.3402V43.2H25.6402V25H44.2402V19.1Z" fill="black" />
          </svg>
          Add New Address
        </span>
      </button>

      <Modal isOpen={state} close={handleClose}>
        <Modal.Title></Modal.Title>
        <Modal.Body>
          <div className="grid py-4 grid-cols-1 gap-y-2">
            {/* <div className="grid grid-cols-2 gap-x-2">
              <Input
                label="First name"
                {...register("first_name", {
                  required: "First name is required",
                })}
                required
                errors={errors}
                autoComplete="given-name"
              />
              <Input
                label="Last name"
                {...register("last_name", {
                  required: "Last name is required",
                })}
                required
                errors={errors}
                autoComplete="family-name"
              />
            </div> */}
            {/* <Input label="Company" {...register("company")} errors={errors} /> */}
            <Input
              label="Address 1"
              {...register("address_1", {
                required: "Address is required",
              })}
              errors={errors}
              autoComplete="address-line1"
            />
            <Input
              label="Address 2"
              {...register("address_2", {
                required: "Address is required",
              })}
              errors={errors}
              autoComplete="address-line1"
            />
            <Input
              label="Apartment, suite, etc."
              {...register("address_2")}
              errors={errors}
              autoComplete="address-line2"
            />
            <Input
              label="City"
              {...register("city", {
                required: "City is required",
              })}
              errors={errors}
              required
              autoComplete="locality"
            />
            <Input
              label="Zip code"
              {...register("postal_code", {
                required: "Postal code is required",
              })}
              required
              errors={errors}
              autoComplete="postal-code"
            />
            <Input
              label="Province / State"
              {...register("province")}
              errors={errors}
              autoComplete="address-level1"
            />
            <CountrySelect
              {...register("country_code", { required: true })}
              autoComplete="country"
            />
            <Input
              label="Phone Number"
              {...register("phone")}
              errors={errors}
              autoComplete="phone"
            />
          </div>
          {error && (
            <div className="text-rose-500 text-small-regular py-2">{error}</div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="!bg-gray-200 !text-gray-900 !border-gray-200 rounded min-h-0"
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button className="min-h-0 rounded" onClick={submit} disabled={submitting}>
            Save
            {submitting && <Spinner />}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default AddAddress
