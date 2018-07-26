import React, {Component} from 'react';
import './trendingnews.css'

class Trendingnews extends Component{
    render(){
        if(this.props.trendingnews.isloadingHeadlines){
            //console.log("Inside the trending news component: ",this.props.trendingnews.newsArray);
            const newsHeadlines = this.props.trendingnews.newsArray.map((key, i) => {
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