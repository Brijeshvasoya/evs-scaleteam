import React, { Fragment } from "react";
import moment from "moment";
import { Button } from "reactstrap";
import { useNavigate } from "react-router-dom";

const CardComponent = ({ item }) => {
  const navigate = useNavigate();
  return (
    <Fragment>
      <div className="bg-[#f3f2f0] w-[550px] h-auto rounded-lg shadow-lg p-6 flex flex-col">
        <div className="space-y-6">
          <div className="text-xl font-bold text-center text-gray-800">
            Event Details
          </div>
          <div className="flex items-center space-x-4">
            <div className="w-1/2">
              <div className="text-sm text-gray-700">
                <span>{item?.ename}</span>
              </div>
            </div>
            <div className="w-1/2">
              <div className="text-sm text-gray-700">
                <span>{item?.hname}</span>
              </div>
            </div>
          </div>
          <div>
            <div className="text-sm text-gray-700">
              <span>
                {item?.eventdate &&
                moment(Number(item?.eventdate)).isValid()
                  ? moment(Number(item?.eventdate)).format(
                      "MMMM Do YYYY"
                    )
                  : "N/A"}
              </span>
            </div>
          </div>
          <div>
            <div className="text-sm text-gray-700">
              <span>{item?.hno}</span>
            </div>
          </div>
          <div>
            <div className="text-sm text-gray-700">
              <span>{item?.address}</span>
            </div>
          </div>
          <div className="text-xl font-bold  text-center text-gray-800 mt-6">
            Price Details
          </div>
          <div className="flex w-auto justify-between space-x-4">
            <div className="w-1/3">
              <div className="text-sm text-gray-700">
                <span className="font-bold">VIP Ticket: </span>
                <span>{item?.ticket?.vipticket}</span>
              </div>
            </div>
            <div className="w-1/3">
              <div className="text-sm text-gray-700">
                <span className="font-bold">VVIP Ticket: </span>
                <span>{item?.ticket?.vvipticket}</span>
              </div>
            </div>
            <div className="w-1/3">
              <div className="text-sm text-gray-700">
                <span className="font-bold">Gold Ticket: </span>
                <span>{item?.ticket?.goldticket}</span>
              </div>
            </div>
          </div>
          <div className="flex justify-end space-x-3 mt-4">
            <Button
              type="button"
              color="primary"
              block
              onClick={() => navigate(`/participate/${item?._id}`)}
              className="w-32 py-0 h-12 text-white font-medium rounded-lg bg-slate-800 hover:bg-slate-700 focus:outline-none"
            >
              Participate
            </Button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default CardComponent;
