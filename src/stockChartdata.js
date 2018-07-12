import React, {Component} from 'react';

class StockOverall extends Component{
    // constructor is new to echmascript 6
    // super is inherit the parent objct
    constructor(props){
        super(props);
        this.state = {
            city: "san jose",
            lastname: "patel"
        };
    }
    render(){
        console.log(this.props);
        var {profilename, profival} = this.props;
        var {city, lastname} = this.state;

        return(
            <div className="stockoaverallContainer">
                <div className="stockOverallData">
                    <div>Top menu bar</div>
                    <div>Live everyday profie and sales</div>
                </div>
                <div className="stockChartData">
                    <div className="profitStocks"> Profit making stocks</div>
                    <div className="lossStocks"> Loss making stocks </div>
                </div>
                <div>Name : {profilename}</div>
                <div>Last Name: {lastname}</div>
                <div>Profit val: {profival}</div>
                <div>City : {city}</div>
                <button onClick={this.custommethod.bind(this)}> show custom method </button>
            </div>
        );
    }

    /**
     * props: passing data to the component
     * state: Track the state of the component. If state change then render that portion again.
     * custom method
     */
    custommethod(){
        console.log("custom method: ",this.props.profival);
        this.setState({city: this.state.city+" Dublin"});
        if(this.props.profival >= 300)
        {
            console.log("Found it");
            this.setState({
                lastname: "Pat"
            });
            var newString = this.state.city;
            var uniqueList=newString.split(',').filter(function(allItems,i,a){
                return i==a.indexOf(allItems);
            }).join(',');
            this.setState({
                city: uniqueList
            });
        }


    }
}

export default StockOverall;