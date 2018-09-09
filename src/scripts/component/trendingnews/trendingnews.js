import React, {Component} from 'react';
import './trendingnews.css'
import apiobj from '../../../utils/api';

class Trendingnews extends Component{
    constructor(props){
        super(props);
        this.state = {
            isloadingHeadlines: false,
            newsdata:"",
            newsArray: {},
            newsheadlines: {}
        }
    };

    fetchNews_FeedData(){
        apiobj.fetchStockNewsData()
            .then(function (response) {
                console.log("promise news Data: ", response);
                this.setState({newsdata : response[0]["title"], isloadingHeadlines: true, newsArray: response});
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
        this.setState({isloadingHeadlines:false});
        this.fetchNews_FeedData();

    }
    render(){
        if(this.state.isloadingHeadlines){
            //console.log("Inside the trending news component: ",this.props.trendingnews.newsArray);
            const newsHeadlines = this.state.newsArray.map((key, i) => {
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
                            Top Market Headlines
                        </div>
                        <div> {newsHeadlines}</div>
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
};

export default Trendingnews;