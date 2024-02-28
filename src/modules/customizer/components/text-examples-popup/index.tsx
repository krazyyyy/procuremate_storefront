import Modal from "@modules/common/components/modal"
import Button from "@modules/common/components/button"
import React from "react"
import ThumbnailImage from "@modules/products/components/thumbnail-image"

const TextExamplesPopup: React.FC<{ visible: boolean, onClose: () => void }> = ({
  onClose,
  visible,
}) => {

  const styles = [
    '/name-styles/1.jpg',
    '/name-styles/2.jpg',
    '/name-styles/3.jpg',
    '/name-styles/4.jpg',
    '/name-styles/5.jpg',
  ];

  return (
    <Modal size="large" isOpen={visible} close={onClose}>
      <Modal.Title>NAME STYLES</Modal.Title>
      <Modal.Body>
        <div className="grid my-2 grid-cols-1 text-sm gap-4">
          {styles.map((s, i) => {
            return <ThumbnailImage
              key={i}
              src={s}
              alt={s}
              objectFit="contain"
              className="rounded bg-gray-100"
              height={300}
              width={300} />
          })}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button
          className="!bg-gray-200 font-semibold !text-gray-900 !border-gray-200 rounded min-h-0"
          onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};


export default TextExamplesPopup