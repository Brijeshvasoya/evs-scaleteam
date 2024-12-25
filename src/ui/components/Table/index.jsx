import React, { Fragment } from "react";
import DataTable from "react-data-table-component";
import { AlignCenter, ChevronDown } from "react-feather";
import _ from "lodash";
import "./table.css";

const Table = ({ columns, data, editData, deleteData }) => {
  const customStyles = {
    rows: {
      style: {
        border: "1px solid #f3f2f7",
        backgroundColor: "transparent",
      },
    },
    headCells: {
      style: {
        minHeight: "40px",
        backgroundColor: '#f3f2f7'
      },
    },
    table: {
      style: {
        padding: "1rem 0" ,
        backgroundColor: "transparent",
      },
    },
    cells: {
      style: {
        textTransform: "capitalize",
        backgroundColor:"#f3f2f0"
      },
    },
  };
  return (
    <Fragment>
      <div className="react-dataTable" id="data-table">
        <DataTable
          className="react-dataTable"
          columns={_.filter(
            columns,
            (column) => column !== undefined && column !== null
          )}
          sortIcon={<ChevronDown size={10} />}
          data={
            data?.filter((item) => item !== undefined && item !== null) || []
          }
          customStyles={customStyles}
        />
      </div>
    </Fragment>
  );
};

export default Table;
