import React, { useMemo } from 'react';
import MaterialReactTable from 'material-react-table';
import axios from 'axios';

const columns = [
    {
        accessorKey: 'name',
        header: 'Item Name',
    },
    {
        accessorKey: 'valueUsed',
        header: 'Number of product units used since the given time',
    },
];

const config = {
    headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
    }
};

//customer page 
export default class ExcessReportTable extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            start:this.start,
            data : [],
        };
    }

    componentDidMount() {
        axios.get(`http://localhost:3001/ExcessReport?start=`+this.state.start, config)
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
