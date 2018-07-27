import React, {Component} from 'react';
import './livemarketfeed.css';

class Livemarketfeed extends Component{
    render(){
        if(this.props.livefeedNews.isloadinglivefeed){

            const livefeeds = this.props.livefeedNews.livefeedArray.map((key, i) => {
                return (
                    <div className="eachlivefeed-div">
                        <a className="eachlivefeed" href={'https://seekingalpha.com/'+key.uri}>{key.title}</a>
                    </div>
                );
            });
            //console.log("after loop livefeed:",livefeeds);
            return(
                <div>
                    <div className="livemarketfeed-div">
                        <div className="headline-header feedheading-position">
                            Live Feeds
                        </div>
                        <div className="feedcontainer"> {livefeeds} </div>
                    </div>
                </div>
            );
        }
        else{
            return(

                <p>Still loading the data</p>
            );
        }

    }
}

export default Livemarketfeed;