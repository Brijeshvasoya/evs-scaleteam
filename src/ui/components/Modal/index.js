import React, { Fragment } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader, Badge } from "reactstrap";
import { Button } from "reactstrap";
import { X } from "react-feather";
import "./model.css";

const index = (props) => {
  return (
    <Fragment>
      <Modal
        isOpen={props.modalOpen}
        toggle={props.toggleModal}
        className="fixed rounded-lg shadow-lg inset-0 z-50 flex justify-center items-center"
      >
        <ModalHeader className="relative "style={{ backgroundColor: "#f3f2f0" }}>
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
