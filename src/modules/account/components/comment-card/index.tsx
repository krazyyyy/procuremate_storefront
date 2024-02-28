import { useAccount } from "@lib/context/account-context"
import useToggleState from "@lib/hooks/use-toggle-state"
import Input from "@modules/common/components/input"
import Modal from "@modules/common/components/modal"
import Edit from "@modules/common/icons/edit"
import Spinner from "@modules/common/icons/spinner"
import clsx from "clsx"
import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import Medusa from '@lib/services/api';

type FormValues = {
  message: string
}

type AddCommentProps = {
  isActive?: boolean
}

const AddComment: React.FC<AddCommentProps> = ({
  isActive = false,
  children,
}) => {
  const { state, open, close } = useToggleState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | undefined>(undefined)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      message: '',
    },
  })

  const submit = handleSubmit(async (data: FormValues) => {
    setSubmitting(true)
    setError(undefined)

    const payload = {
      message: data.message,
    }
    console.info('⚒️ submitting form', payload)

    // medusaClient.customers.update(payload)
    //   .then(() => {
    //     setSubmitting(false)
    //     refetchCustomer()
    //     close()
    //   })
    //   .catch(() => {
    //     setSubmitting(false)
    //     setError("Failed to update address, please try again.")
    //   })
  })


  return (
    <div>
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
            {children}
          </button>
        </div>
      </div>

      <Modal isOpen={state} close={close}>
        <Modal.Title>Add New Comment</Modal.Title>
        <Modal.Body>
          <div className="grid mt-4 grid-cols-1 gap-y-2">
            <Input
              label="Enter your comment"
              {...register("message", {
                required: "Message is required",
              })}
              required
              type="textarea"
              errors={errors}
              autoComplete="message"
            />
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
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default AddComment
