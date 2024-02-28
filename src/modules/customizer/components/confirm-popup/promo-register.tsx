import Modal from "@modules/common/components/modal"
import Button from "@modules/common/components/button"
import React from "react"
import Image from "next/image";

const PromoRegisterPopup: React.FC<{
  onConfirm: () => void;
  onCancel: () => void,
  visible: boolean,
}> = ({
  onConfirm,
  onCancel,
  visible,
}) => {

    return (
      <Modal size='large' isOpen={visible} close={onCancel}>
        <Modal.Body>
          <div>
            <Image className="rounded" src="/voucher.png" height={380} width={800} alt="voucher" />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="!bg-gray-200 font-semibold !text-gray-900 !border-gray-200 rounded min-h-0"
            onClick={onCancel}>
            Cancel
          </Button>
          <Button onClick={onConfirm} className="min-h-0 whitespace-nowrap font-semibold rounded">
            Register
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };


export default PromoRegisterPopup