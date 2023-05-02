import React from 'react';
import MaterialReactTable from 'material-react-table';
import axios from 'axios';
import Moment from 'react-moment';
import moment from 'moment/moment.js';

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

export default class ExcessReportTable extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            start: this.props.startVal,
            data : [],
        };
    }
    
    componentDidMount() {
        var t = new Date(this.state.start);
        var format = moment(t).format("YYYY-MM-DD hh:mm:ss"); 
        var str = `http://https://pern-project-3.onrender.com/ExcessReport?start= `+format;
        axios.get(str, config)
            .then(res => {
                const reportData = res.data;
                this.setState({data: reportData});
            })
            .catch((err) => {
                console.error(err);
            });
    };
    render(){
        console.log(this.state.data.at(0));
        return <MaterialReactTable columns={columns} data={this.state.data} />;
    }
};