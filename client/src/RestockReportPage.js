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

export default class RestockReportTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data : [],
    };
  }

  componentDidMount() {
    axios.get(`http://localhost:3001/RestockReport`, config)
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
