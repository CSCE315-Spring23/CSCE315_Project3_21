import React from 'react';
import MaterialReactTable from 'material-react-table';
import axios from 'axios';
import Moment from 'react-moment';
import moment from 'moment/moment.js';

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

const config = {
    headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
    }
};
/** 
 * SalesReportTable class sets up the table of the sales report page. 
 * This class also queries the database with the values from the date time pickers on the web page.
 * It also displays the data.
 */
export default class SalesReportTable extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            start: this.props.startVal,
            end: this.props.endVal,
            data : [],
        };
    }
    componentDidMount() {
        var t = new Date(this.state.start);
        var t2 = new Date(this.state.end);
        var format = moment(t).format("YYYY-MM-DD hh:mm:ss"); 
        var format2 = moment(t2).format("YYYY-MM-DD hh:mm:ss");
        var str = `http://https://pern-project-3.onrender.com/getSalesReport?start=`+format+`&end=`+format2;
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