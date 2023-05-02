import React from 'react';
import axios from 'axios';
import MaterialReactTable from 'material-react-table';

const columns = [
  {
    accessorKey: 'daytotalsales',
    header: 'Total Sales since the beginning of the day',
  },
  {
    accessorKey: 'daytotalnumorders',
    header: 'Total number of orders since the beginning of the day',
  },
  {
    accessorKey: 'daysumm_timestamp',
    header: 'Timestamp',
  },
];

const config = {
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
  }
};

export default class ZReportTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          createNew: this.props.createZ,
          data : [],
        };
    }

    componentDidMount() {
      if(this.state.createNew){
        axios.get(`https://pern-project-3.onrender.com/inventoryLevelsEndDayCompleteDaySummary`, config)
        .then(res => {
        alert('The day summary/ Z report was created');
        })
        .catch((err) => {
          alert(err);
      });
      }
        axios.get(`https://pern-project-3.onrender.com/Zreport`, config)
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
