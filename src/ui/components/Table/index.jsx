import React, { Fragment } from "react";
import DataTable from "react-data-table-component";
import { ChevronDown, Eye, Trash } from "react-feather";
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";
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
        backgroundColor: "#f3f2f7",
      },
    },
    table: {
      style: {
        // padding: "1rem 0",
        backgroundColor: "transparent",
      },
    },
    cells: {
      style: {
        textTransform: "capitalize",
        backgroundColor: "#f3f2f0",
      },
    },
  };
  const actionColumn = {
    name: "Actions",
    selector: "actions",
    cell: (row) => (
      <div className="flex space-x-8 justify-center">
        {editData ? (
          <button
            onClick={() => editData(row)}
            className="text-blue-500 hover:text-blue-700"
          >
            <Eye size={16} />
          </button>
        ) : null}
        {deleteData ? (
          <button
            onClick={() => deleteData(row)}
            className="text-red-500 hover:text-red-700"
          >
            <Trash size={16} />
          </button>
        ) : null}
      </div>
    ),
  };
  return (
    <Fragment>
      <div className="react-dataTable w-auto" id="data-table">
        <PerfectScrollbar>
          <DataTable
            className="react-dataTable"
            columns={_.filter(
              [...columns, actionColumn],
              (column) => column !== undefined && column !== null
            )}
            sortIcon={<ChevronDown size={10} />}
            data={
              data?.filter((item) => item !== undefined && item !== null) || []
            }
            customStyles={customStyles}
          />
        </PerfectScrollbar>
      </div>
    </Fragment>
  );
};

export default Table;
