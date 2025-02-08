import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import moment from "moment";
import Select from "react-select";
import { Label, Button } from "reactstrap";
import { toast } from "react-toastify";
import { useQuery, useMutation } from "@apollo/client";
import { GET_EVENT } from "./query.js";
import { PARTICIPATE } from "./mutation";
import Spinner from "../../components/Spinner";

const Index = () => {
  const { id } = useParams();
  const { data, loading: eventLoading, error: eventError } = useQuery(GET_EVENT, { variables: { id } });
  const token = localStorage.getItem("token");

  const [ParticipateEvent, { loading: participateLoading, error: participateError }] = useMutation(
    PARTICIPATE,
    {
      context: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    }
  );
  const { activeUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [fetchData, setFetchData] = useState(null);
  const [ticketType, setTicketType] = useState(null);
  const [options, setOptions] = useState();
  const [ticketQuantity, setTicketQuantity] = useState(null);

  useEffect(() => {
    if (data) {
      setFetchData(data.event);
    }
  }, [id, data]);

  const onParticipate = () => {
    if (!ticketType || !ticketQuantity) {
      toast.error("Please provide valid ticket information.", {
        autoClose: 2000,
      });
      return;
    }

    if (!activeUser) {
      toast.error("Please login to continue", { autoClose: 2000 });
      return;
    }

    if (!fetchData) {
      toast.error("Please select a valid event", { autoClose: 2000 });
      return;
    }

    // Precise date validation for Unix timestamp
    const eventDate = new Date(parseInt(fetchData.eventdate));
    const today = new Date();
    today.setHours(0, 0, 0, 0);  // Reset time to start of day

    console.log("Parsed Event Date:", eventDate.toISOString());
    console.log("Today's Date:", today.toISOString());

    if (eventDate < today) {
      toast.error("You cannot participate in past events", {
        autoClose: 2000,
      });
      return;
    }

    if (participateLoading) {
      return;
    }

    const input = {
      eventId: fetchData?._id,
      ticketType: (options).toLowerCase().replace(/\s/g, ""),
      ticketQuantity: parseInt(ticketQuantity),
    };

    ParticipateEvent({ variables: { participateNew: input } })
      .then(({ data }) => {
        if (data?.createParticipate) {
          toast.success("You are Participate Successfully", {
            autoClose: 1000,
          });
          navigate(-1);
        } else {
          toast.error(participateError?.message, {
            autoClose: 2000,
          });
        }
      })
      .catch((error) => {
        toast.error(error?.message, { autoClose: 2000 });
      });
  };

  const ticketOptions = [
    { value: fetchData?.ticket?.vipticket, label: "VIP Ticket" },
    { value: fetchData?.ticket?.vvipticket, label: "VVIP Ticket" },
    { value: fetchData?.ticket?.goldticket, label: "Gold Ticket" },
  ];

  const quantityOptions = [
    { value: 1, label: "1" },
    { value: 2, label: "2" },
    { value: 3, label: "3" },
    { value: 4, label: "4" },
    { value: 5, label: "5" },
    { value: 6, label: "6" },
    { value: 7, label: "7" },
    { value: 8, label: "8" },
    { value: 9, label: "9" },
    { value: 10, label: "10" },
  ];

  const customStyles = {
    control: (base, state) => ({
      ...base,
      boxShadow: state.isFocused ? "0 0 0 2px #6366f1" : "none",
      minHeight: 48,
      height: 48,
    }),
    option: (base, state) => ({
      ...base,
      cursor: "pointer",
      backgroundColor: state.isFocused ? "#f3f2f0" : "",
      "&:hover": {
        backgroundColor: "#f3f2f0",
      },
    }),
  };

  if (eventLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner size={75} color="#6366f1" />
      </div>
    );
  }

  if (eventError) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong className="font-bold">Error: </strong>
        <span className="block sm:inline">{eventError.message}</span>
      </div>
    );
  }

  return (
    <>
      <div className="bg-[#f3f2f0] w-full h-auto rounded-lg shadow-lg p-6 flex flex-col justify-between">
        <div className="space-y-4">
          <div className="flex items-center space-x-4 w-full">
            <div className="w-1/2">
              <Label className="block text-sm font-medium text-gray-700">
                Event Name:
              </Label>
              <div className="mt-1 p-3 w-full bg-gray-100 rounded-lg border border-gray-300">
                {fetchData?.ename}
              </div>
            </div>

            <div className="w-1/2">
              <Label className="block text-sm font-medium text-gray-700">
                Host Name:
              </Label>
              <div className="mt-1 p-3 w-full bg-gray-100 rounded-lg border border-gray-300">
                {fetchData?.hname}
              </div>
            </div>
          </div>

          <div>
            <Label className="block text-sm font-medium text-gray-700">
              Event Date:
            </Label>
            <div className="mt-1 p-3 w-full bg-gray-100 rounded-lg border border-gray-300">
              {fetchData?.eventdate
                ? moment(fetchData?.eventdate).format("MMMM Do YYYY")
                : "N/A"}
            </div>
          </div>

          <div>
            <Label className="block text-sm font-medium text-gray-700">
              House/Flat/Office No/Floor No:
            </Label>
            <div className="mt-1 p-3 w-full bg-gray-100 rounded-lg border border-gray-300">
              {fetchData?.hno}
            </div>
          </div>

          <div>
            <Label className="block text-sm font-medium text-gray-700">
              Address:
            </Label>
            <div className="mt-1 p-3 w-full bg-gray-100 rounded-lg border border-gray-300">
              {fetchData?.address}
            </div>
          </div>

          <div className="flex w-auto justify-between space-x-4">
            <div className="w-1/2">
              <Label className="block mb-1 text-sm font-medium text-gray-700">
                Type Of Ticket:
              </Label>
              <Select
                className="focus:ring-2 focus:ring-indigo-500 w-full bg-gray-100 rounded-lg border border-gray-300"
                styles={customStyles}
                value={ticketOptions.find(
                  (option) => option.value === ticketType
                )}
                onChange={(selectedOption) => {
                  setOptions(selectedOption.label);
                  setTicketType(selectedOption.value);
                }}
                options={ticketOptions}
              />
            </div>
            <div className="w-1/2">
              <Label className="block mb-1 text-sm font-medium text-gray-700">
                Amount of one Ticket:
              </Label>
              <div className="mt-1 h-12 p-3 w-full bg-gray-100 rounded-lg border border-gray-300">
                {ticketType}
              </div>
            </div>
          </div>
          <div className="flex w-auto justify-between space-x-4">
            <div className="w-1/2">
              <Label className="block mb-1 text-sm font-medium text-gray-700">
                No. Of Ticket:
              </Label>
              <Select
                className="focus:ring-2 focus:ring-indigo-500 w-full bg-gray-100 rounded-lg border border-gray-300"
                styles={customStyles}
                value={quantityOptions.find(
                  (option) => option.value === ticketQuantity
                )}
                onChange={(selectedOption) =>
                  setTicketQuantity(selectedOption.value)
                }
                options={quantityOptions}
              />
            </div>
            <div className="w-1/2">
              <Label className="block mb-1 text-sm font-medium text-gray-700">
                Amount of one Ticket:
              </Label>
              <div className="mt-1 h-12 p-3 w-full bg-gray-100 rounded-lg border border-gray-300">
                {ticketType * ticketQuantity}
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-3">
            <Button
              type="submit"
              color="primary"
              block
              onClick={() => navigate("/events")}
              className="w-32 py-0 h-12 text-white font-medium rounded-lg bg-slate-800 hover:bg-slate-600 focus:outline-none"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              color="primary"
              block
              onClick={onParticipate}
              className="w-32 py-0 h-12 text-white font-medium rounded-lg bg-slate-800 hover:bg-sl focus:outline-none"
            >
              Participate
            </Button>
          </div>
        </div>
      </div>
      {participateLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <Spinner size={75} color="#ffffff" />
        </div>
      )}
    </>
  );
};

export default Index;
