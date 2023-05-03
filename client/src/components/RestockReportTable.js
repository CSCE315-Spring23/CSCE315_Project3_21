import React, { useMemo } from 'react';
import MaterialReactTable from 'material-react-table';
import axios from 'axios';

const columns = [
  {
    accessorKey: 'itemname',
    header: 'Item Name',
  },
  {
    accessorKey: 'currentquantity',
    header: 'Current Quantity',
  },
  {
    accessorKey: 'minquantity',
    header: 'Minimum Recommended Quantity',
  },
];

const config = {
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
  }
};
/**
     * The Restock Report Table function builds the table used in the restock report and queries the database for the report.
     */
export default class RestockReportTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data : [],
    };
  }

  componentDidMount() {
    axios.get(`https://pern-project-3.onrender.com/RestockReport`, config)
      .then(res => {
        const reportData = res.data;
        this.setState({ data: reportData });
      })
      .catch((err) => {
        console.error(err);
      });
    
  }

  render() {
    console.log(this.state.data.at(0));
    return <MaterialReactTable columns={columns} data={this.state.data} />;
  }

};
