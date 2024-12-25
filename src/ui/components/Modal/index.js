import React, { Fragment } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { Button } from "reactstrap";
import { X } from "react-feather";
import "./model.css"

const index = (props) => {
  return (
    <Fragment>
      <Modal
        isOpen={props.modalOpen}
        toggle={props.toggleModal}
        className="modal-container"
      >
        <ModalHeader className="relative">
            <h1 className="relative top-8 text-2xl font-semibold right-0 p-0">{props.title}</h1>
          <Button
            className="absolute top-8 right-0 p-0 cursor-pointer"
            onClick={props.toggleModal}
          >
            <X />
          </Button>
        </ModalHeader>

        <ModalBody className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl">
          {props?.children}
        </ModalBody>

        {/* <ModalFooter className="mt-4 flex justify-between space-x-4">
          <Button
            color="secondary"
            onClick={props.toggleModal}
            className="w-40 py-3 text-white font-medium rounded-lg bg-slate-800 hover:bg-slate-600"
          >
            Cancel
          </Button>
          {props.type === "submit" ? (
            <Button
              color="primary"
              onClick={props.addEvent}
              className="w-40 py-3 text-white font-medium rounded-lg bg-slate-800 hover:bg-slate-600"
            >
              Create Event
            </Button>
          ) : (
            <Button
              color="primary"
              onClick={props.addEvent}
              className="w-40 py-3 text-white font-medium rounded-lg bg-slate-800 hover:bg-slate-600"
            >
              Update Event
            </Button>
          )}
        </ModalFooter> */}
      </Modal>
    </Fragment>
  );
};

export default index;
