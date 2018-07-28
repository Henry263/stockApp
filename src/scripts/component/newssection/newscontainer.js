import React, {Component} from 'react';
import Trendingnews from '../trendingnews/trendingnews';
import Livemarketfeed from '../livemarketfeed/livemarketfeed';
import apiobj from '../../../utils/api';


class Newscontainer extends Component{
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

    fetchNews_FeedData(){
        apiobj.fetchStockData()
            .then(function (response) {
                //console.log("promise news Data: ", response);
                this.setState({newsdata : response[0]["title"], isloadingHeadlines: true, newsArray: response});

                apiobj.fetchlivefeedData()
                    .then(function (response) {
                        //console.log("promise feed Data: ", response.updates);
                        this.setState({livefeed : response.updates, isloadinglivefeed: true, livefeedArray: response.updates});
                    }.bind(this));

            }.bind(this));
    }

    loppForapi(){
        var count = 0;
        this.interval = setInterval(() => {
            this.fetchNews_FeedData();

        }, 50000);
    }

    componentWillMount(){
        this.loppForapi();
        this.setState({isloadingHeadlines:false, isloadinglivefeed:false});
        this.fetchNews_FeedData();

    }
    render(){
        return(
            <div className="newcontainer-style">
                <Trendingnews trendingnews={this.state}/>
                <Livemarketfeed livefeedNews={this.state}/>
            </div>
        )
    }
}

export default Newscontainer;