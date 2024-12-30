import React, { Fragment } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader, Badge } from "reactstrap";
import { Button } from "reactstrap";
import { X } from "react-feather";
import "./model.css";

const index = (props) => {
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
        className="fixed rounded-lg shadow-lg inset-0 z-50 flex justify-center items-center"
      >
        <ModalHeader
          className="relative "
          style={{ backgroundColor: "#f3f2f0" }}
        >
          <h1 className="relative top-6 p-5 text-2xl font-semibold right-0">
            {props.title}
          </h1>
          <Button
            className="bg-white absolute top-6  right-0 p-0 cursor-pointer"
            onClick={props.toggleModal}
          >
            <Badge className="" onClick={props.toggleModal}>
              <X />
            </Badge>
          </Button>
        </ModalHeader>

        <ModalBody
          className=" w-full max-w-7xl"
          style={{ backgroundColor: "#f3f2f0" }}
        >
          {props?.children}
        </ModalBody>
      </Modal>
    </Fragment>
  );
};

export default index;
