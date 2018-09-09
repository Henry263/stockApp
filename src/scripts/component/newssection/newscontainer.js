import React, {Component} from 'react';
import './newscontainer.css';
import Livemarketfeed from '../livemarketfeed/livemarketfeed';
import Trendingnews from '../trendingnews/trendingnews';
import apiobj from '../../../utils/api';


// fortune 500
class Newscontainer extends Component{
    constructor(props){
        super(props);
        this.state = {
            eachnewsLoaded: false,
            eachNewsSource:""
        }
    }
    eachNews_FeedData =(newsSource) => {
        apiobj.eachNewsfeed(newsSource)
            .then(function (response) {
                console.log("promise CNBC news Data: ", response);
                this.setState({eachnewsLoaded: true, eachNewsSource: response});
            }.bind(this));
    }
    geteachnews = () => {
        this.eachNews_FeedData("cnbc");
        this.setState({eachnewsLoaded: true});
    }
    render(){
        this.geteachnews();
        if(this.state.eachnewsLoaded)
        {
            return(
                <div className="newcontainer-style">
                    <div className="news-category-div">
                        <div className="trendingNews-div inline-display-news">Trending News</div>
                        <div className="cnbc-news-div inline-display-news">CNBC</div>
                        <div className="bloomberg-news-div inline-display-news">Bloomberg</div>
                        <div className="wallstreet-news-div inline-display-news">Wall Street</div>
                        <div className="ft-news-div inline-display-news">Financial Times</div>
                        <div className="techCrunch-news-div inline-display-news">TechCrunch</div>
                        <div className="fortune-news-div inline-display-news">Fortune 500</div>
                        <div className="economist-news-div inline-display-news">The Economist</div>
                    </div>
                    <div className="default-news-div">
                        <Livemarketfeed/>
                        <Trendingnews/>
                    </div>
                    <div className="cnbc-div"></div>
                    <div className="bloomberg-div"></div>
                    <div className="wallstreet-div"></div>
                    <div className="ft-div"></div>
                    <div className="tc-div"></div>
                    <div className="f500-div"></div>
                    <div className="et-div"></div>

                </div>
            )
        }

    }
}

export default Newscontainer;