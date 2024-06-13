"use client";
import React, { useState } from "react";
import { Button, Modal } from "antd";

type Props = {
  open: boolean;
  confirmLoading: boolean;
  handleOk: () => void;
  handleCancel: () => void;
};

const ConfirmationModal = ({
  open = false,
  confirmLoading = false,
  handleCancel,
  handleOk,
}: Props) => {
  //   const [open, setOpen] = useState(false);
  //   const [confirmLoading, setConfirmLoading] = useState(false);

  //   const showModal = () => {
  //     setOpen(true);
  //   };

  //   const handleOk = () => {
  //     setConfirmLoading(true);
  //     setTimeout(() => {
  //       setOpen(false);
  //       setConfirmLoading(false);
  //     }, 2000);
  //   };

  //   const handleCancel = () => {
  //     console.log('Clicked cancel button');
  //     setOpen(false);
  //   };

  return (
    <>
      {/* <Button type="primary" onClick={showModal}>
        Open Modal with async logic
      </Button> */}
      <Modal
        title="Delete Product from cart"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <p>{"Are you sure to complete this action ?"}</p>
      </Modal>
    </>
  );
};

export default ConfirmationModal;
