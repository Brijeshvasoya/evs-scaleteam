export const eventTable = [
    {
      selector: (row) => row?.ename, // Event Name
      name: "Event Name",
      sortField: "ename",
      sortable: true,
      minWidth: "150px",
    },
    {
      selector: (row) => row?.hname, // Host Name
      name: "Host Name",
      sortField: "hname",
      sortable: true,
      minWidth: "150px",
    },
    {
      selector: (row) => row?.eventdate, // Event Date
      name: "Event Date",
      sortField: "eventdate",
      sortable: true,
      minWidth: "150px",
    },
    {
      selector: (row) => row?.hno, // Address 1
      name: "Address 1",
      sortField: "hno",
      sortable: true,
      minWidth: "150px",
    },
    {
      selector: (row) => row?.address, // Address 2
      name: "Address 2",
      sortField: "address",
      sortable: true,
      minWidth: "150px",
    },
    {
      selector: (row) => row?.vipticket, // VIP Ticket
      name: "VIP Ticket",
      sortField: "vipticket",
      sortable: true,
      minWidth: "150px",
    },
    {
      selector: (row) => row?.vvipticket, // VVIP Ticket
      name: "VVIP Ticket",
      sortField: "vvipticket",
      sortable: true,
      minWidth: "150px",
    },
    {
      selector: (row) => row?.goldticket, // Gold Ticket
      name: "Gold Ticket",
      sortField: "goldticket",
      sortable: true,
      minWidth: "150px",
    },
  ];
  