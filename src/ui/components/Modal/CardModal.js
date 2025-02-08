import React, { Fragment } from "react";
import { Modal, ModalBody, ModalHeader, Badge } from "reactstrap";
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
        className="fixed inset-0 z-50 flex justify-center items-center"
        fade={false}
      >
        <div className="bg-white rounded-lg shadow-2xl w-auto max-w-4xl min-w-[250px] min-h-[200px] max-h-[90vh] flex">
          <div 
            className="w-1/3 bg-slate-800 text-white p-6 flex flex-col justify-center items-center space-y-4 rounded-l-lg relative"
          >
            <div className="text-center">
              <h2 className="text-2xl font-bold text-white mb-3">
                {props.title || "Event Details"}
              </h2>
              <p className="text-gray-300 text-base leading-relaxed">
                Detailed information about the selected {(props.title || "event").toLowerCase()}
              </p>
            </div>
            <div className="absolute bottom-6 left-0 right-0 text-center">
              <div className="inline-block bg-slate-700 text-white px-3 py-1 rounded-full text-xs font-semibold">
                View Mode
              </div>
            </div>
          </div>
          
          <div className="relative w-2/3 bg-white rounded-r-lg">
            <ModalHeader 
              className="relative flex items-center justify-between p-3 border-b border-gray-200 rounded-t-lg"
              style={{ backgroundColor: "#f3f2f0" }}
            >
              <h1 className="text-xl font-semibold mx-auto">{props.title || "Event Details"}</h1>
              <Badge
                className="bg-[#f3f2f0] hover:bg-gray-100 absolute -right-2 -top-2 p-1 rounded-full cursor-pointer"
                onClick={props.toggleModal}
              >
                <X className="text-gray-600 w-5 h-5" />
              </Badge>
            </ModalHeader>

            <ModalBody
              className="p-3 rounded-b-lg"
              style={{ backgroundColor: "#f3f2f0" }}
            >
              {props?.children}
            </ModalBody>
          </div>
        </div>
      </Modal>
    </Fragment>
  );
};

export default CardModal;
