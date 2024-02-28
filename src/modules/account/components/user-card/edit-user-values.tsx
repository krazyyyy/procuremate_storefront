import { medusaClient } from "@lib/config"
import { useAccount } from "@lib/context/account-context"
import useToggleState from "@lib/hooks/use-toggle-state"
import Input from "@modules/common/components/input"
import Modal from "@modules/common/components/modal"
import Edit from "@modules/common/icons/edit"
import Spinner from "@modules/common/icons/spinner"
import clsx from "clsx"
import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import Checkbox from "../../../common/components/checkbox"
type FormValues = {
  first_name: string
  last_name: string
  gender: string,
  phone?: string

  // city: string
  // country_code: string
  // postal_code: string
  // province?: string
  // address_1: string
  // address_2?: string
  // company?: string
}

type EditUserProps = {
  isActive?: boolean
}

const EditUser: React.FC<EditUserProps> = ({
  isActive = false,
}) => {
  const { state, open, close } = useToggleState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | undefined>(undefined)
  const [gender, setGender] = useState<any>('')
  const [phone, setPhone] = useState<any>('')

  const { refetchCustomer, customer } = useAccount()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      first_name: customer?.first_name,
      last_name: customer?.last_name,
      phone: customer?.phone,
    },
  })

  useEffect(() => {
    setGender(customer?.metadata?.gender ?? '')
  }, [customer])

  const submit = handleSubmit(async (data: FormValues) => {
    setSubmitting(true)
    setError(undefined)

    const payload = {
      first_name: data.first_name,
      last_name: data.last_name,
      phone: data.phone,
      metadata: {
        gender,
      },
    }
    medusaClient.customers.update(payload)
      .then(() => {
        setSubmitting(false)
        refetchCustomer()
        close()
      })
      .catch(() => {
        setSubmitting(false)
        setError("Failed to update address, please try again.")
      })
  })


  return (
    <>
      <div
        className={clsx(
          "h-full w-full flex flex-col justify-between transition-colors",
          {
            "border-gray-900": isActive,
          }
        )}
      >
        <div className="flex items-center gap-x-4">
          <button
            className="font-bold underline flex items-center gap-x-2"
            onClick={open}>
            <Edit size={16} />
            Edit
          </button>
        </div>
      </div>

      <Modal isOpen={state} close={close}>
        <Modal.Title></Modal.Title>
        <Modal.Body>
          <div className="grid grid-cols-1 gap-y-2">
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
            <Input
              label="Phone"
              {...register("phone", {
                required: "Last name is required",
              })}
              required
              errors={errors}
              autoComplete="family-name"
            />

            <div className="flex gap-6">
              <Checkbox
                label="Male"
                checked={gender == 'male'}
                onChange={() => setGender('male')}
              />
              <Checkbox
                label="Female"
                checked={gender === 'female'}
                onChange={() => { setGender('female') }}
              />
              <Checkbox
                label="Other"
                checked={gender === 'other'}
                onChange={() => { setGender('other') }}
              />
            </div>
          </div>
          {error && (
            <div className="text-rose-500 text-small-regular py-2">{error}</div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <button className="w-full h-12 rounded bg-[#23A265] text-white" onClick={submit} disabled={submitting}>
            Save and Close
            {submitting && <Spinner />}
          </button>
          {/* <Button className="bg-green-500" onClick={submit} disabled={submitting}>
            Save
            {submitting && <Spinner />}
          </Button> */}
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default EditUser
