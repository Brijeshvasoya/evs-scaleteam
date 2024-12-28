import React, { Fragment } from "react";
import DataTable from "react-data-table-component";
import { ChevronDown, Eye, Trash,Edit } from "react-feather";
import "react-perfect-scrollbar/dist/css/styles.css";
import _ from "lodash";
import "./table.css";

const Table = ({ columns, data, editData, deleteData,viewData }) => {
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
      <div className="flex space-x-3 justify-center">
        {editData ? (
          <button
            onClick={() => editData(row)}
            className="text-blue-500 hover:text-blue-700"
          >
            <Edit size={16} />
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
        {viewData ? (
          <button
            onClick={() => viewData(row)}
            className="text-blue-500 hover:text-blue-700"
          >
            <Eye size={16} />
          </button>
        ) : null}
      </div>
    ),
  };
  return (
    <Fragment>
      <div className="react-dataTable w-auto" id="data-table">
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
            pagination
            fixedHeader
          />
      </div>
    </Fragment>
  );
};

export default Table;
