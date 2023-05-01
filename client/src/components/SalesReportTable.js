import React from 'react';
import MaterialReactTable from 'material-react-table';
import axios from 'axios';
import Moment from 'react-moment';
import moment from 'moment/moment.js';
/** This is a description of the foo function. */
const columns = [
    {
        accessorKey: 'id',
        header: 'ID',
    },
    {
        accessorKey: 'order_key',
        header: 'Order Key',
    },
    {
        accessorKey: 'menuitem_key',
        header: 'Menu Item Key',
    },
    {
        accessorKey: 'quantity',
        header: 'Quantity',
    },
];
/** This is a description of the foo function. */
const config = {
    headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
    }
};
/** This is a description of the foo function. */
export default class SalesReportTable extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            start: this.props.startVal,
            end: this.props.endVal,
            data : [],
        };
    }
    /** This is a description of the foo function. */
    componentDidMount() {
        var t = new Date(this.state.start);
        var t2 = new Date(this.state.end);
        var format = moment(t).format("YYYY-MM-DD hh:mm:ss"); 
        var format2 = moment(t2).format("YYYY-MM-DD hh:mm:ss");
        var str = `http://localhost:3001/getSalesReport?start=`+format+`&end=`+format2;
        axios.get(str, config)
            .then(res => {
                const reportData = res.data;
                this.setState({data: reportData});
            })
            .catch((err) => {
                console.error(err);
            });
    };
    /** This is a description of the foo function. */
    render(){
        console.log(this.state.data.at(0));
        return <MaterialReactTable columns={columns} data={this.state.data} />;
    }
};