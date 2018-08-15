import React, {Component} from 'react';
import './newscontainer.css';
import Trendingnews from '../trendingnews/trendingnews';
import Livemarketfeed from '../livemarketfeed/livemarketfeed';


// fortune 500
class Newscontainer extends Component{

    render(){
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
                <Livemarketfeed/>
                <Trendingnews/>
            </div>
        )
    }
}

export default Newscontainer;