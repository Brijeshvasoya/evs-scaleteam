import React, { Fragment } from "react";
import { Modal, ModalBody, ModalHeader, Button, Badge } from "reactstrap";
import { X } from "react-feather";

const CardModal = (props) => {
  return (
    <Fragment>
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 ${
          props.modalOpen ? "backdrop-blur-sm" : "hidden"
        }`}
        style={{ zIndex: props.modalOpen ? 999 : -1 }}
      ></div>
      <Modal
        isOpen={props.modalOpen}
        toggle={props.toggleModal}
        className="fixed inset-0 z-0 bg-inherit flex justify-center items-center h-screen w-screen m-0"
      >
        <ModalHeader className="relative bg-white border-b-0">
          <Button
            className="bg-white absolute  -right-2 -top-3 p-0 cursor-pointer"
            onClick={props.toggleModal}
          >
            <Badge>
              <X />
            </Badge>
          </Button>
        </ModalHeader>

        <ModalBody className="w-full bg-white  rounded-lg shadow-lg overflow-y-auto flex justify-center items-center h-[calc(100%-50px)]">
          {props?.children}
        </ModalBody>
      </Modal>
    </Fragment>
  );
};

export default CardModal;
