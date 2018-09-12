import React, {Component} from 'react';
import './livemarketfeed.css';
import apiobj from '../../../utils/api';

class Livemarketfeed extends Component{
    constructor(props){
        super(props);
        this.state = {
            isloadinglivefeed: false,
            newsdata:"",
            newsArray: {},
            newsheadlines: {}
        }
    };

    fetchNews_FeedData(){
        apiobj.fetchlivefeedData()
            .then(function (response) {
                console.log("promise feed Data: ", response.updates);
                this.setState({livefeed : response.updates, isloadinglivefeed: true, livefeedArray: response.updates});
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
        this.setState({isloadinglivefeed:false});
        this.fetchNews_FeedData();

    }
    render(){
        if(this.state.isloadinglivefeed && this.state.livefeed > 0){
            //console.log("Inside the trending news component: ",this.props.trendingnews.newsArray);
            const newsHeadlines = this.state.livefeedArray.map((key, i) => {
                return (
                    <div className="eachnews-div">
                        <a className="eachNewsHeadline" href={'https://seekingalpha.com/'+key.uri}>{key.title}</a>
                    </div>
                );
            });
            return(
                <div>
                    <div className="trendingnews-div">
                        <div className="headline-header">
                            Top Market Livefeeds
                        </div>
                        <div> {newsHeadlines}</div>
                    </div>
                </div>
            );
        }
        else{
            return(

                <p></p>
            );
        }
    }
}

export default Livemarketfeed;