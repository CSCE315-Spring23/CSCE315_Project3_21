import React, { useMemo } from 'react';
import MaterialReactTable from 'material-react-table';
import axios from 'axios';

const columns = [
  {
    accessorKey: 'id',
    header: 'ID',
  },
  {
    accessorKey: 'created',
    header: 'Created',
  },

];

const config = {
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
  }
};

export default class PendingRestockTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data : [],
    };
  }

  componentDidMount() {
    axios.get(`http://localhost:3001/PendingRestock`, config)
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
