import React, { Fragment } from "react";
import moment from "moment";

const index = ({ item, toggleModal }) => {
  return (
    <Fragment>
      <div className="bg-[#f3f2f0] w-[550px] h-auto rounded-lg shadow-lg p-6 flex flex-col">
        <div className="space-y-6">
          <div className="text-xl font-bold text-center text-gray-800">
            User Details
          </div>
          <div className="flex items-center space-x-4">
            <div className="">
              <div className="text-sm text-gray-700">
                <span>
                  {item?.userId?.fname} {item?.userId?.lname}
                </span>
              </div>
            </div>
          </div>
          <div className="text-xl font-bold text-center text-gray-800">
            Event Details
          </div>
          <div className="flex items-center space-x-4">
            <div className="w-1/2">
              <div className="text-sm text-gray-700">
                <span>{item?.eventId?.ename}</span>
              </div>
            </div>
            <div className="w-1/2">
              <div className="text-sm text-gray-700">
                <span>{item?.eventId?.hname}</span>
              </div>
            </div>
          </div>
          <div>
            <div className="text-sm text-gray-700">
              <span>{item?.eventId?.eventdate}</span>
            </div>
          </div>
          <div>
            <div className="text-sm text-gray-700">
              <span>{item?.eventId?.hno}</span>
            </div>
          </div>
          <div>
            <div className="text-sm text-gray-700">
              <span>{item?.eventId?.address}</span>
            </div>
          </div>
          <div className="text-xl font-bold  text-center text-gray-800 mt-6">
            Ticket Details
          </div>
          <div className="flex w-auto justify-between space-x-4">
            <div className="w-1/3">
              <div className="text-sm text-gray-700">
                <span className="font-bold">Ticket Type: </span>
                <span>{item?.ticketType}</span>
              </div>
            </div>
            <div className="w-1/3">
              <div className="text-sm text-gray-700">
                <span className="font-bold">Total Ticket: </span>
                <span>{item?.ticketQuantity}</span>
              </div>
            </div>
            <div className="w-1/3">
              <div className="text-sm text-gray-700">
                <span className="font-bold">Total Amount: </span>
                <span>{item?.totalamount}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default index;
