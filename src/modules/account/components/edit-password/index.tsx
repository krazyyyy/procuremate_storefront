import { medusaClient } from "@lib/config"
import { useAccount } from "@lib/context/account-context"
import useToggleState from "@lib/hooks/use-toggle-state"
import Button from "@modules/common/components/button"
import Input from "@modules/common/components/input"
import Modal from "@modules/common/components/modal"
import Spinner from "@modules/common/icons/spinner"
import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { isPasswordValid } from "../register"

type FormValues = {
  new_password: string,
  confirm_password: string,
}

const EditPassword: React.FC = () => {
  const { state, open, close } = useToggleState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | undefined>(undefined)

  const { refetchCustomer } = useAccount()
  const {
    register,
    handleSubmit,
    formState: { errors, },
    reset,
    watch,
  } = useForm<FormValues>()

  const handleClose = () => {
    reset({
      new_password: '',
      confirm_password: '',
    })
    close()
  }

  const submit = handleSubmit(async (data: FormValues) => {
    setSubmitting(true)
    setError(undefined)

    const payload = {
      password: data.new_password,
    }

    medusaClient.customers.update({ password: payload.password })
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
  const new_password = watch('new_password'); // Get the value of the new_password field
  return (
    <>
      <button className="underline font-bold" onClick={open}>
        Edit
      </button>

      <Modal isOpen={state} close={handleClose}>
        <Modal.Title></Modal.Title>
        <Modal.Body>
          <div className="grid grid-cols-1 gap-y-2">
            <Input
              label="New Password"
              {...register("new_password", {
                required: "New password is required",
                minLength: 8,
                validate: (value) => isPasswordValid(value) || 'Minimum should be 8 characters password.'
              })}
              errors={errors}
              autoComplete="new-password"
            />
            <Input
              label="Confirm Password"
              {...register("confirm_password", {
                required: "Confirm password is required",
                minLength: 8,
                validate: (value) => value === new_password || "Passwords do not match",
              })}
              errors={errors}
              autoComplete="confirm-password"
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

export default EditPassword
