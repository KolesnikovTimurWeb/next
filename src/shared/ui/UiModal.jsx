import React from "react";
import { Modal } from "antd";

const UiModal = ({children, handleOk, handleCancel, isModalOpen, nameModal}) => {
  return (
    <Modal
      title={nameModal}
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      {children}
    </Modal>
  );
};

export default UiModal;
