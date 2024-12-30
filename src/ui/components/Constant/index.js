export const eventTable = [
    {
      selector: (row) => row?.ename, 
      name: "Event Name",
      sortField: "ename",
      sortable: true,
      minWidth: "auto",
    },
    {
      selector: (row) => row?.hname, 
      name: "Host Name",
      sortField: "hname",
      sortable: true,
      minWidth: "auto",
    },
    {
      selector: (row) => row?.eventdate, 
      name: "Event Date",
      sortField: "eventdate",
      sortable: true,
      minWidth: "auto",
    },
    {
      selector: (row) => row?.hno, 
      name: "Address 1",
      sortField: "hno",
      sortable: true,
      minWidth: "auto",
    },
    {
      selector: (row) => row?.address, 
      name: "Address 2",
      sortField: "address",
      sortable: true,
      minWidth: "auto",
    },
    {
      selector: (row) => row?.vipticket, 
      name: "VIP Ticket",
      sortField: "vipticket",
      sortable: true,
      minWidth: "auto",
    },
    {
      selector: (row) => row?.vvipticket, 
      name: "VVIP Ticket",
      sortField: "vvipticket",
      sortable: true,
      minWidth: "auto",
    },
    {
      selector: (row) => row?.goldticket, 
      name: "Gold Ticket",
      sortField: "goldticket",
      sortable: true,
      minWidth: "auto",
    },
  ];

  export const participateEventTable = [
    {
      selector: (row) => row?.ename, 
      name: "Event Name",
      sortField: "ename",
      sortable: true,
      minWidth: "auto",
    },
    {
      selector: (row) => row?.hname, 
      name: "Host Name",
      sortField: "hname",
      sortable: true,
      minWidth: "auto",
    },
    {
      selector: (row) => row?.eventdate, 
      name: "Event Date",
      sortField: "eventdate",
      sortable: true,
      minWidth: "auto",
    },
    {
      selector: (row) => row?.hno, 
      name: "Address 1",
      sortField: "hno",
      sortable: true,
      minWidth: "auto",
    },
    {
      selector: (row) => row?.address, 
      name: "Address 2",
      sortField: "address",
      sortable: true,
      minWidth: "auto",
    },
    {
      selector: (row) => row?.tickettype, 
      name: "Ticket Type",
      sortField: "tickettype",
      sortable: true,
      minWidth: "auto",
    },
    {
      selector: (row) => row?.ticketQuantity, 
      name: "Total Ticket",
      sortField: "ticketQuantity",
      sortable: true,
      minWidth: "auto",
    },
    {
      selector: (row) => row?.totalamount, 
      name: "Total Amount",
      sortField: "totalamount",
      sortable: true,
      minWidth: "auto",
    },
  ];

  export const userTable=[
    {
        selector:(row)=>row?.fname,
        name:"First Name",
        sortField:"fname",
        sortable:true,
        minWidth:"auto",
    },
    {
        selector:(row)=>row?.lname,
        name:"Last Name",
        sortField:"lname",
        sortable:true,
        minWidth:"auto",
    },
    {
        selector:(row)=>row?.email,
        name:"Email",
        sortField:"email",
        sortable:true,
        minWidth:"auto",
    },
    {
        selector:(row)=>row?.age,
        name:"Age",
        sortField:"age",
        sortable:true,
        minWidth:"auto",
    },
    {
        selector:(row)=>row?.dob,
        name:"Birth Date",
        sortField:"dob",
        sortable:true,
        minWidth:"auto",
    },
    {
        selector:(row)=>row?.role,
        name:"Role",
        sortField:"role",
        sortable:true,
        minWidth:"auto",
    }
  ]
  