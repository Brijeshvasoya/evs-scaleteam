import React, { Fragment } from "react";
import moment from "moment";
import { Label, Button } from "reactstrap";
import { useNavigate } from "react-router-dom";

const CardComponent = ({ item }) => {
  const navigate = useNavigate();
  return (
    <Fragment>
      <div className="bg-[#f3f2f0] w-[550px] h-auto rounded-lg shadow-lg p-6 flex flex-col justify-between">
        <div className="space-y-4">
          <div className="flex items-center space-x-4 w-full">
            <div className="w-1/2">
              <Label className="block text-sm font-medium text-gray-700">
                Event Name:
              </Label>
              <div className="mt-1 p-3 w-full bg-gray-100 rounded-lg border border-gray-300">
                {item?.ename}
              </div>
            </div>

            <div className="w-1/2">
              <Label className="block text-sm font-medium text-gray-700">
                Host Name:
              </Label>
              <div className="mt-1 p-3 w-full bg-gray-100 rounded-lg border border-gray-300">
                {item?.hname}
              </div>
            </div>
          </div>

          <div>
            <Label className="block text-sm font-medium text-gray-700">
              Event Date:
            </Label>
            <div className="mt-1 p-3 w-full bg-gray-100 rounded-lg border border-gray-300">
              {item?.eventdate
                ? moment(item?.eventdate).format("MMMM Do YYYY")
                : "N/A"}
            </div>
          </div>

          <div>
            <Label className="block text-sm font-medium text-gray-700">
              House/Flat/Office No/Floor No:
            </Label>
            <div className="mt-1 p-3 w-full bg-gray-100 rounded-lg border border-gray-300">
              {item?.hno}
            </div>
          </div>

          <div>
            <Label className="block text-sm font-medium text-gray-700">
              Address:
            </Label>
            <div className="mt-1 p-3 w-full bg-gray-100 rounded-lg border border-gray-300">
              {item?.address}
            </div>
          </div>

          <div className="flex w-auto justify-between space-x-4">
            <div className="w-1/3">
              <Label className="block text-sm font-medium text-gray-700">
                VIP Ticket:
              </Label>
              <div className="mt-1 p-3 w-full bg-gray-100 rounded-lg border border-gray-300">
                {item?.vipticket}
              </div>
            </div>
            <div className="w-1/3">
              <Label className="block text-sm font-medium text-gray-700">
                VVIP Ticket:
              </Label>
              <div className="mt-1 p-3 w-full bg-gray-100 rounded-lg border border-gray-300">
                {item?.vvipticket}
              </div>
            </div>
            <div className="w-1/3">
              <Label className="block text-sm font-medium text-gray-700">
                Gold Ticket:
              </Label>
              <div className="mt-1 p-3 w-full bg-gray-100 rounded-lg border border-gray-300">
                {item?.goldticket}
              </div>
            </div>
          </div>
          <div className="flex space-x-3">
            <Button
              type="submit"
              color="primary"
              block
              onClick={() => navigate(`/participate/${item?.id}`)}
              className="w-full py-0 h-12 text-white font-medium rounded-lg bg-slate-800 hover:bg-sl focus:outline-none"
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
