import Modal from "@modules/common/components/modal"
import Button from "@modules/common/components/button"
import Input from "@modules/common/components/input"
import { useForm } from "react-hook-form"
import { medusaClient } from "@lib/config"
import React from "react"
import { useMeCustomer } from "medusa-react"

type FormValues = {
  email: string,
  password: string,
}

const ConfirmationPopup: React.FC<{
  onConfirm: () => void;
  onCancel: () => void,
  visible: boolean,
  setVisible: (value: boolean) => void,
}> = ({
  onConfirm,
  onCancel,
  visible,
  setVisible,
}) => {
    const { refetch } = useMeCustomer()
    const {
      handleSubmit,
      formState: { errors, },
      register,
      setError
    } = useForm<FormValues>()
    // Function to handle the user's confirmation
    const submit = handleSubmit(async (data) => {
      try {

        var { customer, response } = await medusaClient.customers.create({
          email: data.email,
          password: data.password,
          first_name: '',
          last_name: '',
        })
        console.warn(response);
        if (customer) {
          await medusaClient.auth.authenticate({ email: data.email, password: data.password })
          refetch();
        }
        handleConfirm();
      } catch (error: any) {
        setError('email', { message: error?.message });
      }
    })


    const handleConfirm = () => {
      setVisible(false);
      onConfirm();
    };

    // Function to handle the user's cancellation
    const handleCancel = () => {
      setVisible(false);
      onCancel();
    };

    return (
      <Modal size="small" isOpen={visible} close={() => setVisible(false)}>
        <Modal.Title>Stay Connected and Save Your Design! </Modal.Title>
        <Modal.Body>
          <div className="grid my-2 grid-cols-1 text-sm gap-y-2">
            <span>
              Wow, you{"'"}ve created something truly unique! Before you go, enter your email address below to save your design
            </span>
            <Input
              {...register('email', {
                required: "Email is reqiured",
              })}
              required
              errors={errors}
              label="Email"
            />
            <Input
              {...register('password', {
                required: "Password is requried",
                minLength: 8
              })}
              type="password"
              required
              errors={errors}
              label="Password"
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="!bg-gray-200 font-semibold !text-gray-900 !border-gray-200 rounded min-h-0"
            onClick={handleCancel}>
            Cancel
          </Button>
          <Button onClick={submit} className="min-h-0 whitespace-nowrap font-semibold rounded">
            Register & Save Design
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };


export default ConfirmationPopup