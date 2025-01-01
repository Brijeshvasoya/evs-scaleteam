import React, { useState, useEffect } from 'react';
import { Button, Input } from 'reactstrap';
import Select from 'react-select';
import Table from '../../components/Table';
import AddEvent from '../AddEvent';
import Modal from '../../components/Modal';
import { eventTable } from '../../components/Constant';
import ConfirmationModal from '../../components/Alert';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';


const Index = () => {
  const dispatch = useDispatch();
  const { eventData } = useSelector((state) => state.user);
  const [modalOpen, setModalOpen] = useState(false);
  const [editEvent, setEditEvent] = useState(null);
  const [data, setData] = useState(eventData);
  const [sort, setSort] = useState('ename');

  useEffect(() => {
    setData(eventData);
  }, [eventData]);

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  const handleSortChange = (selectedOption) => {
    setSort(selectedOption.value);
  };

  const handleSearch = (e) => {
    const filteredData = eventData.filter((event) =>
      event[sort]?.toLowerCase().includes(e.target.value?.toLowerCase())
    );
    setData(filteredData);
  };

  const editData =(event)=>{
    setEditEvent(event);
    toggleModal();
  }

  const deleteEvent = (event) => {
    ConfirmationModal(
      'warning',
      'Are you sure?',
      'You won\'t be able to revert this!',
      'Yes, delete it!',
      true
    ).then((result) => {
      if (result.isConfirmed) {
        dispatch({ type: 'DELETE_EVENT', payload: event });
        toast.success('Event deleted successfully');
      } else {
        toast.error('Event not deleted');
      }
    });
  };

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

  const options = [
    { value: 'ename', label: 'Event Name' },
    { value: 'hname', label: 'Host Name' },
    { value: 'vipticket', label: 'VIP Ticket' },
    { value: 'vvipticket', label: 'VVIP Ticket' },
    { value: 'goldticket', label: 'Gold Ticket' },
  ];

  return (
    <>
      <div className="flex justify-between mt-4 space-x-4">
        <Input
          type="text"
          placeholder="Search Event"
          onChange={handleSearch}
          className="p-3 w-full h-12 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <Select
          className="w-64 h-12 focus:ring-2 focus:ring-indigo-500"
          styles={customStyles}
          value={options.find((option) => option.value === sort)}
          onChange={handleSortChange}
          options={options}
        />
        <Button
          type="button"
          color="primary"
          onClick={toggleModal}
          className="w-64 h-12 text-white font-medium rounded-lg bg-slate-800 hover:bg-slate-600"
        >
          Add Event
        </Button>
      </div>
      <div className="my-5">
        <Table
          columns={eventTable}
          data={data}
          // editData={(event) => {
          //   setEditEvent(event);
          //   toggleModal();
          // }}
          editData={editData}
          deleteData={deleteEvent}
        />
      </div>

      {modalOpen && (
        <Modal
          modalOpen={modalOpen}
          toggleModal={toggleModal}
          title={editEvent ? 'Edit Event' : 'Add Event'}
        >
          <AddEvent
            toggleModal={toggleModal}
            editEvent={editEvent}
            setEditEvent={setEditEvent}
          />
        </Modal>
      )}
    </>
  );
};


export default Index
