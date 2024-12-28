import React from "react";
import { Card, CardBody, CardTitle, CardText } from "reactstrap";
import moment from "moment";

const CardComponent = ({ item }) => {
  console.log(item, "item");

  return (
    <div className="event-card flex-1 min-w-[280px] max-w-[350px] mb-6">
      <Card className="shadow-sm rounded">
        <CardBody>
          <CardTitle tag="h5" className="font-bold">
            {item.ename} - {item.hname}
          </CardTitle>
          <CardText>
            <strong>Date:</strong>{" "}
            {moment(item.eventdate, "DD MMM YYYY").format("MMMM Do YYYY")}
          </CardText>
          <CardText>
            <strong>Hall Number:</strong> {item.hno}
          </CardText>
          <CardText>
            <strong>Address:</strong> {item.address}
          </CardText>
          <CardText>
            <strong>VIP Ticket:</strong> {item.vipticket}
          </CardText>
          <CardText>
            <strong>VVIP Ticket:</strong> {item.vvipticket}
          </CardText>
          <CardText>
            <strong>Gold Ticket:</strong> {item.goldticket}
          </CardText>
        </CardBody>
      </Card>
    </div>
  );
};

export default CardComponent;
