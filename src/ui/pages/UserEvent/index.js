import React, { Fragment, useEffect, useState } from "react";
import { Input } from "reactstrap";
import Select from "react-select";
import { useSelector, useDispatch } from "react-redux";
import Table from "../../components/Table";
import { userParticipateEventTable } from "../../components/Constant";
import CardModal from "../../components/Modal/CardModal";
import UserEvent from "../../components/UserEventCard"

const Index = () => {
  const { participate } = useSelector((state) => state.user);
  const { userData } = useSelector((state) => state.user);
  const [options, setOptions] = useState();
  const [sort, setSort] = useState("fname");
  const [data, setData] = useState();
  const [sortData, setSortData] = useState();
  const [viewUserEvent, setViewUserEvent] = useState();
  const [view,setView]=useState(false);

  useEffect(() => {
    const user = userData?.filter((row) => row?.role !== "Admin");
    if (user) {
      const eventOption = user.map((user) => ({
        value: user.fname,
        label: `${user.fname} ${user.lname}`,
      }));
      setOptions(eventOption);
    }
  }, [userData]);

  useEffect(() => {
    const updatedData = participate?.flatMap((row) =>
      row?.event?.map((event) => ({
        fname: row?.fname,
        lname: row?.lname,
        ename: event?.ename,
        eventdate: event?.eventdate,
        hname: event?.hname,
        hno: event?.hno,
        address: event?.address,
        tickettype: event?.tickettype,
        ticketQuantity: event?.ticketQuantity,
        totalamount: event?.totalamount,
      }))
    );
    setData(updatedData);
    setSortData(updatedData);
  }, [participate]);

  const handleChange = (e) => {
    const newData = sortData?.filter((row) => {
      return row["ename"]
        ?.toLowerCase()
        .includes(e.target.value?.toLowerCase());
    });
    setData(newData);
  };
  const handleSelectChange = (e) => {
    console.log(e.value);
    setSort(e?.target?.value);
    const newData = sortData?.filter((row) => {
      return row["fname"]?.toLowerCase().includes(e?.value?.toLowerCase());
    });
    setData(newData);
  };
  const toggleModal =()=>{
    setView(false);
  }
  const viewData = (row) => {
    setViewUserEvent(row);
    setView(true);
  };

  console.log(data, sort);
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
    <Fragment>
      <div className="flex justify-between mt-4 space-x-4">
        <Input
          type="text"
          placeholder="Search Event"
          onChange={handleChange}
          className=" p-3 w-full h-12 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <Select
          className="w-64 h-12 focus:ring-2 focus:ring-indigo-500"
          styles={customStyles}
          value={options?.find((option) => option?.value === sort)}
          onChange={handleSelectChange}
          options={options}
        />
      </div>
      <div className="my-5">
        <Table
          columns={userParticipateEventTable}
          data={data || []}
          viewData={viewData}
        />
      </div>
      {view && (
        <CardModal modalOpen={view} toggleModal={toggleModal}>
          <UserEvent item={viewUserEvent} toggleModal={toggleModal} />
        </CardModal>
      )}
    </Fragment>
  );
};

export default Index;
