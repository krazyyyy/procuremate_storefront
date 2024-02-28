import { useAccount } from "@lib/context/account-context"
import useToggleState from "@lib/hooks/use-toggle-state"
import Button from "@modules/common/components/button"
import Modal from "@modules/common/components/modal"
import Spinner from "@modules/common/icons/spinner"
import React, { useState } from "react"
import { useForm } from "react-hook-form"
import Medusa from '@lib/services/api'
import PrimaryButton from "../../../common/components/primary-button"

type FormValues = {
  current_password: string
  new_password: string,
  confirm_password: string,
}

const DeleteAccountModal: React.FC = () => {
  const { state, open, close } = useToggleState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | undefined>(undefined)

  const { customer, handleLogout } = useAccount()
  const {
    register,
    handleSubmit,
    formState: { errors, },
  } = useForm<FormValues>()

  const handleClose = () => {
    close()
  }

  const submit = handleSubmit(async (data: FormValues) => {
    setSubmitting(true)
    setError(undefined)
    Medusa.customers.delete(customer?.id)
      .then(() => {
        setSubmitting(false)
        handleLogout();
        handleClose()
      })
      .catch(() => {
        setSubmitting(false)
        setError("Failed to delete account, please try again.")
      })
  })

  return (
    <>
      <PrimaryButton onClick={open} className="mt-3 font-montserrat">Delete Account</PrimaryButton>

      <Modal isOpen={state} close={handleClose}>
        <Modal.Title></Modal.Title>
        <Modal.Body>
          <div className="grid grid-cols-1 text-sm gap-y-2">
            <span className="font-bold">Are you sure you want to delete this account {customer?.first_name}?</span>
            <br />
            <span className="text-rose-500">
              By deleting your account you will no longer have access to the information stored in your Procuremate account such as order history or your wishlist.
            </span>
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
            Delete
            {submitting && <Spinner />}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default DeleteAccountModal
