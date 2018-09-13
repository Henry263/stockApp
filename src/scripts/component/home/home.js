import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom';

import Navbar from '../navbar/navbar';
import Cportfolio from '../currentportfolio/cp';

import Eachticker from '../eachticker/eachticker';
import Topgainsers from '../topgainers/topgainers';
import Toploosers from '../toploosers/toploosers';
import Newscontainer from '../newssection/newscontainer';
import Modalcomp from '../modalcomponent/modalcomponent';

import Contactus from '../contactus/contact';
import Settingscomp from '../settings/settings';
import Valutcomp from '../valut/valut';
import Watchlistcomp from '../watchlist/watchlist';

import Livemarketfeed from '../livemarketfeed/livemarketfeed';
import Trendingnews from '../trendingnews/trendingnews';



class Homepage extends Component{

    constructor(props){
        super(props);
        this.getinvestmentvalue = this.getinvestmentvalue.bind(this);
        this.state = {
            newtickerportfolio: "",
            newtickerObj:"",
            totalinvest:""
        }
    }
    /*
    handlechildtickerval = (newVal, newObj) => {
        //console.log("from home component: ",this.props);
        const tickerObjFromCache= localStorage.getItem('initialTickerObj');
        const formatedJson = JSON.parse(tickerObjFromCache);
        formatedJson.push(newObj);
        localStorage.setItem('initialTickerObj', JSON.stringify(formatedJson));
        this.setState({newtickerportfolio: newVal, newtickerObj: formatedJson});
    };
    */
    getinvestmentvalue = (getvalueformchild) =>{
        ///console.log("Object fron child: ",getvalueformchild);
        this.setState({totalinvest:getvalueformchild});
    };
    componentWillMount(){


        const defaultTickers = {
            "AAPL": {
                "Qty": "15",
                "Purchasedat": "97.08"
            },
            "TSLA": {
                "Qty": "15",
                "Purchasedat": "252.78"
            }
        };

        const tickerStringFromCache= localStorage.getItem('initialTickerString');
        const tickerStringWatchlist= localStorage.getItem('watchlistTickers');

        if(!tickerStringWatchlist)
        {
            localStorage.setItem('watchlistTickers', "AAPL,TSLA");
        }
        if(!tickerStringFromCache)
        {
            localStorage.setItem('initialTickerString', "AAPL,TSLA");
            localStorage.setItem('initialTickerObj', JSON.stringify(defaultTickers));
        }

    }
    render(){
        //console.log("From home funcction",this.props);
            return(

                <Router>
                    <div className="topbar">
                        <div className="appLogo-holder">
                            <Navbar />
                        </div>
                        <div className="stockAnalytics-holder">
                            <div className="_cp_container">
                                <Cportfolio assetval={this.state.totalinvest}/>
                            </div>

                            <div className="mainBody">
                                <div className="mainBodyleft">
                                    <div className="main-container">
                                        <Switch>
                                            <Route path="/" exact render={() => <Eachticker getvaluefromchild={(obj) => this.getinvestmentvalue(obj)}  />}/>
                                            <Route path="/watchlist" component={Watchlistcomp}/>
                                            <Route path="/valut" component={Valutcomp}/>
                                            <Route path="/settings" component={Settingscomp}/>
                                            <Route path="/contact" component={Contactus}/>
                                        </Switch>
                                    </div>
                                </div>
                                <div className="mainBodyright">
                                    <Topgainsers gainersQuotes={this.state}/>
                                    <Toploosers loosersQuotes={this.state}/>
                                    <Livemarketfeed/>
                                    <Trendingnews/>
                                </div>

                            </div>
                        </div>


                    </div>
                </Router>

            )
        }



}

export default Homepage;

/*
* <Route path="/news" component={Newscontainer}/>
* <div className="modal-div">
                                <Modalcomp handlerFrommodaltohome={this.handlechildtickerval}/>
                            </div>

* */

