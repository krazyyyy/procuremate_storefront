import Modal from "@modules/common/components/modal"
import Button from "@modules/common/components/button"
import React from "react"
import TextEditorV2 from "../text-editor-v2";
import { useTextCanvas } from "lib/context/text-canvas-modal-context";

const TextCanvasModal: React.FC<{ visible: boolean }> = ({
  visible,
}) => {
  const { closeModal } = useTextCanvas()

  return (
    <Modal size="large" isOpen={visible} close={closeModal}>
      <Modal.Title>NAME STYLES</Modal.Title>
      <Modal.Body>
        <TextEditorV2 />
      </Modal.Body>
      <Modal.Footer>
        <Button
          className="!bg-gray-200 font-semibold !text-gray-900 !border-gray-200 rounded min-h-0"
          onClick={closeModal}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};


export default TextCanvasModal