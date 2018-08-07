import React, {Component} from 'react';
import './tickeranatomy.css';
import * as FontAwesome from 'react-icons/lib/fa';
import apiobj from '../../../utils/api';

class Tickeranatomy extends Component{

    constructor(props){
        super(props);
        this.state = {
            isAnatomyLoaded: false,
            responseAnatomyData: "",
            shown: true,
        };

    }

    callservice(tickervalue){

        apiobj.tickeranatomy(tickervalue)
            .then(function (response) {
                //console.log("promise anatomy Data: ", response);
                console.log("Getting value from function: ",tickervalue);
                this.setState({isAnatomyLoaded: true, responseAnatomyData: response});
            }.bind(this));

    }

    componentDidMount(){
        console.log("From function componentDidMount for ticker value onchild:", this.props.tickervalue);
    }

    roundupNumber = (val) => {
        const roundupVal = Math.round(val*10000)/100 +"%";
        return roundupVal;
    };

    currencyformat = (num) =>
    {
        return new Intl.NumberFormat().format(Math.round(num*10)/10);
    }
    convertTocurrencyStandard = (num) =>
    {
        if(num >= 1000000000)
            return this.currencyformat(num/1000000000)+'B';
        if(num >= 1000000)
            return this.currencyformat(num/1000000)+'M';
        if(num >= 1000)
            return this.currencyformat(num/1000)+'k';
        return this.currencyformat(num);
    }

    render(){

        const{ tickervalue } = this.props;
        console.log("From child function ticker anatomy:",tickervalue);
        if(this.state.isAnatomyLoaded)
        {
            console.log("Inside render function child");
            var getAnatomyObj = this.state.responseAnatomyData.stats;

            const tickernews = this.state.responseAnatomyData.news;
            const tickernewseach = tickernews.map((key, i) => {
                if(i<5) {
                    console.log("EAch news hedline: ", key.headline);
                    console.log("EAch news hedline: ", key.url);

                    return (
                        <div className="eachnews-div">
                            <a className="eachNewsHeadline" href={key.url}>{key.headline}</a>
                        </div>
                    );
                }
                else {
                    return true;
                }

            });
            return(
                <div className="_tanatomy_div">

                    <div className="keystats">
                        <div className="tickerName-div">
                            <div className="tickerheader inline-style">{getAnatomyObj.companyName}</div>
                            <div className="ticker-symbol inline_style"><span>( </span>{getAnatomyObj.symbol}<span> )</span></div>
                        </div>
                        <div className="stats-div">
                            <div className="stats-overview inline-style stats-div-width">
                                <div>
                                    <div className="st-left-val">52 Week High:</div>
                                    <div className="st-right-val">${getAnatomyObj.week52high}</div>
                                </div>
                                <hr></hr>
                                <div>
                                    <div className="st-left-val">52 Week Low:</div>
                                    <div className="st-right-val">${getAnatomyObj.week52low}</div>
                                </div>
                                <hr></hr>
                                <div>
                                    <div className="st-left-val">20 Days moving average:</div>
                                    <div className="st-right-val">${getAnatomyObj.day200MovingAvg}</div>
                                </div>
                                <hr></hr>
                                <div>
                                    <div className="st-left-val">Market cap:</div>
                                    <div className="st-right-val">${this.convertTocurrencyStandard(getAnatomyObj.marketcap)}</div>
                                </div>
                                <hr></hr>
                                <div>
                                    <div className="st-left-val">DIV/YIELD:</div>
                                    <div className="st-right-val">${getAnatomyObj.dividendYield}</div>
                                </div>
                                <hr></hr>
                                <div>
                                    <div className="st-left-val">DIV Rate:</div>
                                    <div className="st-right-val">${getAnatomyObj.dividendRate}</div>
                                </div>
                                <hr></hr>
                            </div>
                            <div className="movingaverage-percent inline-style movingavg-div">
                                <div>
                                    <div className="st-left-val">Last 5 days change:</div>
                                    <div className="st-right-val">{this.roundupNumber(getAnatomyObj.day5ChangePercent)}</div>
                                </div>
                                <hr></hr>
                                <div>
                                    <div className="st-left-val">Last 1 month change:</div>
                                    <div className="st-right-val">{this.roundupNumber(getAnatomyObj.month1ChangePercent)}</div>
                                </div>
                                <hr></hr>
                                <div>
                                    <div className="st-left-val">Last 3 months change:</div>
                                    <div className="st-right-val">{this.roundupNumber(getAnatomyObj.month3ChangePercent)}</div>
                                </div>
                                <hr></hr>
                                <div>
                                    <div className="st-left-val">Last 6 months change:</div>
                                    <div className="st-right-val">{this.roundupNumber(getAnatomyObj.month6ChangePercent)}</div>
                                </div>
                                <hr></hr>
                                <div>
                                    <div className="st-left-val">Last 1 year change:</div>
                                    <div className="st-right-val">{this.roundupNumber(getAnatomyObj.year1ChangePercent)}</div>
                                </div>
                                <hr></hr>
                                <div>
                                    <div className="st-left-val">Last 5 years change:</div>
                                    <div className="st-right-val">{this.roundupNumber(getAnatomyObj.year5ChangePercent)}</div>
                                </div>
                                <hr></hr>
                            </div>
                        </div>
                    </div>
                    <div className="ticker-news-div">
                        <div className="anatomy-news-header">
                            Trending News for {getAnatomyObj.companyName}
                        </div>
                        <hr className="custom-hrline"></hr>
                        <hr className="margin-hrline"></hr>
                        {tickernewseach}
                    </div>
                </div>
            )
        }
        else {
            console.log("Calling the call service from child ");
            return(

                <div className="loader-div">
                     <div className="loader">{this.callservice(this.props.tickervalue)}</div>
                </div>
                )

        }

    }
}

export default Tickeranatomy;

/*
    componentDidMount() {
        this.setState({isAnatomyLoaded:false});
        console.log("component will mount method");

        //this.fetchTickerDetails();
    }


    */