import React, { Fragment } from "react";
import DataTable from "react-data-table-component";
import { ChevronDown } from "react-feather";
import _ from 'lodash';
import "./table.css";

const Table = ({ columns, data, editData, deleteData }) => {
    console.log(data,"data")
  return (
    <Fragment>
      <div className="react-dataTable" id="data-table">
        <DataTable
          className="react-dataTable"
          columns={_.filter(columns, (column) => column !== undefined && column !== null)}  
          sortIcon={<ChevronDown size={10} />} 
          data={data?.filter((item) => item !== undefined && item !== null) || []}  
        />
      </div>
    </Fragment>
  );
};

export default Table;
