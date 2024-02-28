import useToggleState from "@lib/hooks/use-toggle-state"
import Button from "@modules/common/components/button"
import Input from "@modules/common/components/input"
import Modal from "@modules/common/components/modal"
import Spinner from "@modules/common/icons/spinner"
import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useCustomizer } from "@lib/context/customizer-context"
import { useRouter } from "next/router"
import { Customer } from "types/medusa"
import { medusaClient } from "../../../../lib/config"
import { useMeCustomer } from "medusa-react"


type FormValues = {
  title: string
}

type RegisterFormValues = {
  email: string,
  password: string,
}

type SaveCustomizerProps = {
  customer?: Customer
}

const SaveModal: React.FC<SaveCustomizerProps> = () => {
  const { refetch, customer, isLoading } = useMeCustomer()
  const { state, open, close } = useToggleState(false)
  const [submitting, setSubmitting] = useState(false)
  const { query } = useRouter()
  const {
    current,
    saveOrUpdate
  } = useCustomizer();
  const { state: registered, toggle } = useToggleState(true);

  if (isLoading) <div>

  </div>

  const {
    register,
    handleSubmit,
    formState: { errors: saveErrors },
  } = useForm<FormValues>({
    defaultValues: {
      title: current.title,
    },
  })

  const {
    handleSubmit: submitRegister,
    formState: { errors },
    register: registerr,
    setError,
  } = useForm<RegisterFormValues>()

  useEffect(() => {
    if (!customer) {
      toggle()
    }
  }, [customer])

  const registerUser = submitRegister(async (data) => {
    setSubmitting(true);
    try {

      var { customer } = await medusaClient.customers.create({
        email: data.email,
        password: data.password,
        first_name: '',
        last_name: '',
      })
      if (customer) {
        await medusaClient.auth.authenticate({ email: data.email, password: data.password })
        refetch();
      }
      setSubmitting(false);
    } catch (error: any) {
      if (error.response.status === 422) {
        setError('email', { message: "An account with this email already exists!" });
      }
    }
    setSubmitting(false);
  })

  const submit = handleSubmit(async (data: FormValues) => {
    setSubmitting(true)
    await saveOrUpdate(query.id as string, (query?.customer_id as string | undefined) ?? customer?.id, data.title);
    setSubmitting(false);
    close()
  })

  return (
    <>
      <div>
        <div className="flex items-center gap-x-4">
          <button onClick={() => {
            open();
          }}
            className="h-24 small:h-12 w-full min-w-[90px] text-xs small:text-base bg-green-500 rounded text-center text-white">
            Save
          </button>
        </div>
      </div>

      <Modal isOpen={state} close={close} size="xsmall">
        <Modal.Body>
          <div className="grid grid-cols-1 gap-y-2 py-4">
            <Input
              label="Enter Title"
              {...register("title", {
                required: "Title is required",
                minLength: 4,
              })}
              required
              errors={saveErrors}
              autoComplete="given-title"
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" className="rounded" onClick={close}>
            Cancel
          </Button>
          <Button onClick={submit} className="rounded" disabled={submitting}>
            {submitting ? <Spinner /> : "Save"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default SaveModal
