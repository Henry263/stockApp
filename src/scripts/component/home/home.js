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


class Homepage extends Component{

    constructor(props){
        super(props);
        this.state = {
            newtickerportfolio: "",
            newtickerObj:""
        }
    }
    handlechildtickerval = (newVal, newObj) => {

        const tickerObjFromCache= localStorage.getItem('initialTickerObj');
        const formatedJson = JSON.parse(tickerObjFromCache);
        formatedJson.push(newObj);
        localStorage.setItem('initialTickerObj', JSON.stringify(formatedJson));
        this.setState({newtickerportfolio: newVal, newtickerObj: formatedJson});
    }
    componentWillMount(){
        const defaultTickerObj = [
            {
                "Ticker":"AAPL",
                "Qty": "15",
                "Purchasedat": "97"
            },
            {
                "Ticker":"TSLA",
                "Qty": "15",
                "Purchasedat": "252"
            }
        ];

        const tickerStringFromCache= localStorage.getItem('initialTickerString');

        if(!tickerStringFromCache)
        {
            localStorage.setItem('initialTickerString', "AAPL,TSLA");
            localStorage.setItem('initialTickerObj', JSON.stringify(defaultTickerObj));
        }

    }
    render(){
            return(
                <Router>
                    <div className="topbar">
                        <div className="appLogo-holder">
                            <Navbar />
                        </div>
                        <div className="stockAnalytics-holder">
                            <div className="_cp_container">
                                <Cportfolio />
                            </div>
                            <div className="modal-div">
                                <Modalcomp handlerFrommodaltohome={this.handlechildtickerval}/>
                            </div>

                            <div className="mainBody">
                                <div className="mainBodyleft">
                                    <div className="main-container">
                                        <Switch>
                                            <Route path="/" exact render={props => <Eachticker newtickervalforportfolio={this.state}  />}/>
                                            <Route path="/news" component={Newscontainer}/>
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
                                </div>
                            </div>
                        </div>


                    </div>
                </Router>

            )
        }



}

export default Homepage;

