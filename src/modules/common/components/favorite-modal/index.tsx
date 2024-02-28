import Modal from "@modules/common/components/modal"
import Button from "@modules/common/components/button"
import React from "react"
import { useRouter } from "next/router";

const FavoriteModal: React.FC<{
  onConfirm: () => void;
  onCancel: () => void,
  visible: boolean,
}> = ({
  onConfirm,
  onCancel,
  visible,
}) => {
    const router = useRouter();
    const handleConfirm = () => {
      router.push({ pathname: '/account/login', hash: 'register' })
      onConfirm();
    };

    // Function to handle the user's cancellation
    const handleCancel = () => {
      onCancel();
    };

    return (
      <Modal size="small" isOpen={visible} close={handleCancel}>
        <Modal.Title>Stay Connected and Save Your Products! </Modal.Title>
        <Modal.Body>
          <div className="grid my-2 grid-cols-1 text-sm gap-y-2">
            <span>
              Create an account to save add to favorite an item
            </span>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="!bg-gray-200 font-semibold !text-gray-900 !border-gray-200 rounded min-h-0"
            onClick={handleCancel}>
            Cancel
          </Button>
          <Button onClick={handleConfirm} className="min-h-0 whitespace-nowrap font-semibold rounded">
            Register now
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };


export default FavoriteModal