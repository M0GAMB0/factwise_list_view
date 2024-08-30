import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import closeLogo from "../assets/images/close.svg";
import CustomButton from "./CustomButton";

interface AlertModalProps {
  visibility: boolean;
  text: string;
  onClose: () => void;
  acceptFunction: () => void;
}

const AlertModal: React.FC<AlertModalProps> = ({
  visibility,
  text,
  onClose,
  acceptFunction,
}) => {
  const [show, setShow] = useState<boolean>(visibility);

  useEffect(() => {
    setShow(visibility);
  }, [visibility]);

  return (
    <>
      <Modal show={show} onHide={onClose}>
        <Modal.Body>
          <div className="d-flex justify-content-between">
            <p className="mt-1">{text}</p>
            <div onClick={onClose}>
              <img src={closeLogo} alt="closeLogo" className="toolIcon" />
            </div>
          </div>
          <div className="d-flex justify-content-end mt-5">
            <CustomButton onClick={onClose} background="#fff" color="#000">
              Cancel
            </CustomButton>
            <div className="ms-3">
              <CustomButton
                onClick={acceptFunction}
                background="#ff3500"
                color="#fff"
              >
                Delete
              </CustomButton>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AlertModal;
