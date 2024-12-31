import React, { useState } from 'react';
import { Button } from 'reactstrap';
import Table from '../../components/Table';
import { participateEventTable,eventTable } from '../../components/Constant';
import { useSelector } from 'react-redux';
import CardModal from '../../components/Modal/CardModal';
import Ticket from '../../components/Ticket';
import Card from '../../components/Card';

const Index = () => {
  const { eventData, participate,activeUser } = useSelector((state) => state.user);
  const [data, setData] = useState(eventData);
  const [showTicket, setShowTicket] = useState(false);
  const [viewEvent, setViewEvent] = useState(null);

  const allEvent = () => {
    setData(eventData);
    setShowTicket(false);
  };

  const upComingEvent = () => {
    const upcomingEvents = eventData.filter((event) => {
      const eventDate = new Date(event.eventdate);
      const today = new Date();
      return eventDate >= today;
    });
    setData(upcomingEvents);
    setShowTicket(false);
  };

  const participatedEvent = () => {
    const userParticipatedEvents = participate
      .filter((item) => item.id === activeUser.id)
      .flatMap((item) => item.event);
    setData(userParticipatedEvents);
    setShowTicket(true);
  };

  const viewEventData = (event) => {
    setViewEvent(event);
    setShowTicket(false);
  };

  const viewTicketData = (event) => {
    setViewEvent(event);
    setShowTicket(true);
  };

  return (
    <>
      <div className="flex justify-between mt-4 space-x-4">
        <Button
          type="button"
          color="primary"
          className="w-full py-3 text-white font-medium rounded-lg bg-slate-800 hover:bg-slate-600"
          onClick={allEvent}
        >
          All Events
        </Button>
        <Button
          type="button"
          color="primary"
          className="w-full py-3 text-white font-medium rounded-lg bg-slate-800 hover:bg-slate-600"
          onClick={upComingEvent}
        >
          Upcoming Events
        </Button>
        <Button
          type="button"
          color="primary"
          className="w-full py-3 text-white font-medium rounded-lg bg-slate-800 hover:bg-slate-600"
          onClick={participatedEvent}
        >
          Participated Events
        </Button>
      </div>
      <div className="my-5">
        <Table
          columns={participateEventTable}
          data={data}
          viewData={showTicket ? viewTicketData : viewEventData}
        />
      </div>

      {showTicket && viewEvent && (
        <CardModal modalOpen={showTicket} toggleModal={() => setShowTicket(false)}>
          <Ticket item={viewEvent} toggleModal={() => setShowTicket(false)} />
        </CardModal>
      )}

      {!showTicket && viewEvent && (
        <CardModal modalOpen={!showTicket} toggleModal={() => setViewEvent(null)}>
          <Card item={viewEvent} toggleModal={() => setViewEvent(null)} />
        </CardModal>
      )}
    </>
  );
};

export default Index;
