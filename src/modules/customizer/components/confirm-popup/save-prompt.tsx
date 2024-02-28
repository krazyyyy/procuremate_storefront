import Modal from "@modules/common/components/modal"
import Button from "@modules/common/components/button"
import React from "react"

const ConfirmSavePopup: React.FC<{
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

    return (
      <Modal size='xsmall' isOpen={visible} close={() => setVisible(false)}>
        <Modal.Title>Save Your Design! </Modal.Title>
        <Modal.Body>
          <div className="grid grid-cols-1 text-sm gap-y-2">
            <span>
              Are you sure to leave this page? unsaved data will be lost.
            </span>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="!bg-gray-200 font-semibold !text-gray-900 !border-gray-200 rounded min-h-0"
            onClick={onCancel}>
            Cancel
          </Button>
          <Button onClick={onConfirm} className="min-h-0 whitespace-nowrap font-semibold rounded">
            Save Design
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };


export default ConfirmSavePopup