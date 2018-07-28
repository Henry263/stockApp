import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom';

import Navbar from '../navbar/navbar';
import Cportfolio from '../currentportfolio/cp';

import Eachticker from '../eachticker/eachticker';
import Topgainsers from '../topgainers/topgainers';
import Toploosers from '../toploosers/toploosers';
import Newscontainer from '../newssection/newscontainer';

class Homepage extends Component{

    render(){

            return(
                <Router>
                    <div className="topbar">
                        <div className="appLogo-holder">
                            <Navbar />
                        </div>
                        <div className="stockAnalytics-holder">
                            <Cportfolio />
                            <div className="mainBody">
                                <div className="mainBodyleft">
                                    <div className="eachTicker-container">
                                        <Switch>
                                            <Route path="/" component={Eachticker} exact/>
                                            <Route path="/news" component={Newscontainer}/>
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

