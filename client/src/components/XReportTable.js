import React from 'react';
import axios from 'axios';
import MaterialReactTable from 'material-react-table';

const columns = [
  {
    accessorKey: 'totalSales',
    header: 'Total Sales since the last Z Report',
  },
  {
    accessorKey: 'numOrders',
    header: 'Total number of orders since the last Z Report',
  },
  {
    accessorKey: 'datetime',
    header: 'Timestamp',
  },
];

const config = {
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
  }
};

export default class XReportTable extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data :[],
        };
    }

    componentDidMount() {
        axios.get(`https://pern-project-3.onrender.com/XReport`, config)
        .then(res => {
          const reportData  = res.data;
            this.setState({ data: reportData});
        })
        .catch((err) => {
            console.error(err);
        });
    
    };

    render() {
      console.log(this.state.data.at(0));
      return <MaterialReactTable columns={columns} data={this.state.data} />;
    }

};
