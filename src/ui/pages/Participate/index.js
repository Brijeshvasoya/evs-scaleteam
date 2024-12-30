import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import moment from "moment";
import Select from "react-select";
import { Label, Button } from "reactstrap";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";

const Index = () => {
  const { id } = useParams();
  const { activeUser } = useSelector((state) => state.user);
  const { eventData } = useSelector((state) => state.user);
  const { participate } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [fetchData, setFetchData] = useState(null);
  const [ticketType, setTicketType] = useState(null);
  const [options, setOptions] = useState();
  const [ticketQuantity, setTicketQuantity] = useState(null);

  useEffect(() => {
    if (eventData) {
      const event = eventData.find((item) => item.id === id);
      setFetchData(event);
    }
  }, [id, eventData]);

  const onParticipate = () => {
    if (!ticketType || !ticketQuantity) {
      toast.error("Please provide valid ticket information.", {
        autoClose: 2000,
      });
      return;
    }
    const input = {
      id: activeUser?.id,
      fname: activeUser?.fname,
      lname: activeUser?.lname,
      event: [
        {
          eid: fetchData?.id,
          ename: fetchData?.ename,
          hname: fetchData?.hname,
          eventdate: fetchData?.eventdate,
          hno: fetchData?.hno,
          address: fetchData?.address,
          tickettype: options,
          ticketQuantity: ticketQuantity,
          totalamount: ticketType * ticketQuantity,
        },
      ],
    };
    const eventDate = moment(input?.event[0]?.eventdate);
    if (eventDate.isSameOrAfter(moment(), "day")) {
      const existingParticipation =
        participate?.find((item) => item?.id === activeUser?.id) || null;

      if (existingParticipation) {
        const isEventAlreadyParticipating = existingParticipation?.event?.some(
          (event) => event?.eid === fetchData?.id
        );

        if (!isEventAlreadyParticipating) {
          const updatedParticipation = {
            ...existingParticipation,
            event: [...existingParticipation?.event, ...input?.event],
          };
          dispatch({type: "ADD_PARTICIPATE",payload: { data: updatedParticipation }});
          toast.success("You have successfully participated in the event(s)!", {
            autoClose: 2000,
          });
        } else {
          toast.info("You have already participated in this event.", {
            autoClose: 2000,
          });
        }
      } else {
        dispatch({type: "ADD_PARTICIPATE",payload: { data: input }});
        toast.success("You have successfully participated in the event(s)!", {
          autoClose: 2000,
        });
      }
    } else {
      toast.info(`Selected Event is Complete at ${moment(eventDate).format("Do MMM YYYY")} `);
    }

    navigate("/dashboard");
  };

  const ticketOptions = [
    { value: fetchData?.vipticket, label: "VIP Ticket" },
    { value: fetchData?.vvipticket, label: "VVIP Ticket" },
    { value: fetchData?.goldticket, label: "Gold Ticket" },
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

  return (
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
              onChange={(selectedOption) => (
                setOptions(selectedOption.label),
                setTicketType(selectedOption.value)
              )}
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
  );
};

export default Index;
