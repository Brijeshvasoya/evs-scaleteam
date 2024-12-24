import React, { Fragment } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { Button } from "reactstrap";
import { X } from "react-feather";

const index = (props) => {
  return (
    <Fragment>
      <Modal
        isOpen={props.modalOpen}
        toggle={props.toggleModal}
        className="flex justify-center"
      >
        <div className="fixed  bg-black bg-opacity-50 " />

        <ModalHeader className="relative w-auto py-3">
          <div className="text-xl font-semibold">Create Event</div>
          <div
            className="absolute top-0 right-0 p-2 cursor-pointer"
            onClick={props.toggleModal}
          >
            <X />
          </div>
        </ModalHeader>

        <ModalBody className="p-4">{props?.children}</ModalBody>

        <ModalFooter className="flex justify-between mt-4 space-x-4">
          <Button
            color="secondary"
            onClick={props.toggleModal}
            className="w-40 py-3 text-white font-medium rounded-lg bg-slate-800 hover:bg-slate-600"
          >
            Cancel
          </Button>
          <Button
            color="primary"
            onClick={props.addEvent}
            className="w-40 py-3 text-white font-medium rounded-lg bg-slate-800 hover:bg-slate-600"
          >
            Create Event
          </Button>
        </ModalFooter>
      </Modal>
    </Fragment>
  );
};

export default index;
