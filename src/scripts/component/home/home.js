import React, {Component} from 'react';


import Navbar from '../navbar/navbar';
import Cportfolio from '../currentportfolio/cp';
import Trendingnews from '../trendingnews/trendingnews';
import Livemarketfeed from '../livemarketfeed/livemarketfeed';
import apiobj from '../../../utils/api';

class Homepage extends Component{
    constructor(props){
        super(props);
        this.state = {
            isloadingHeadlines: false,
            isloadinglivefeed: false,
            newsdata:"",
            newsArray: {},
            newsheadlines: {}
        }
    };

    loppForapi(){
        var count = 0;
        this.interval = setInterval(() => {
            console.log("Number for loop:",count++)
        }, 10000);
    }

    componentWillMount(){
        this.loppForapi();

        this.setState({isloadingHeadlines:false, isloadinglivefeed:false});
        apiobj.fetchStockData()
            .then(function (response) {
                //console.log("promise news Data: ", response);
                this.setState({newsdata : response[0]["title"], isloadingHeadlines: true, newsArray: response});

                apiobj.fetchlivefeedData()
                    .then(function (response) {
                        console.log("promise feed Data: ", response.updates);
                        this.setState({livefeed : response.updates, isloadinglivefeed: true, livefeedArray: response.updates});
                    }.bind(this));

            }.bind(this));
            
    }
    render(){

            return(
                <div className="topbar">
                    <div className="appLogo-holder">
                        <Navbar />
                    </div>
                    <div className="stockAnalytics-holder">
                        <Cportfolio />
                        <div className="mainBody">
                            <div className="mainBodyleft">
                                main graph
                            </div>
                            <div className="mainBodyright">
                                <Livemarketfeed livefeedNews={this.state}/>
                                <Trendingnews trendingnews={this.state}/>

                            </div>
                        </div>
                    </div>


                </div>
            )
        }



}

export default Homepage;

/*
*  apiobj.fetchlivefeedData()
            .then(function(reponsefeed){
                console.log("promise live feed data: ",reponsefeed.updates);
                this.setState({liveFeed : reponsefeed.updates[0]["title"], isloadinglivefeed: true, liveFeedArray: reponsefeed});
            }.bind(this));
            */