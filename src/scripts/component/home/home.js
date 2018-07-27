import React, {Component} from 'react';


import Navbar from '../navbar/navbar';
import Cportfolio from '../currentportfolio/cp';

import Eachticker from '../eachticker/eachticker';
import Topgainsers from '../topgainers/topgainers';
import Toploosers from '../toploosers/toploosers';

class Homepage extends Component{

    render(){

            return(
                <div className="topbar">
                    <div className="appLogo-holder">
                        <Navbar />
                    </div>
                    <div className="stockAnalytics-holder">
                        <Cportfolio />
                        <div className="mainBody">
                            <div className="mainBodyleft">
                                <div className="eachTicker-container">
                                    <Eachticker />
                                </div>
                            </div>
                            <div className="mainBodyright">
                                <Topgainsers gainersQuotes={this.state}/>
                                <Toploosers loosersQuotes={this.state}/>
                            </div>
                        </div>
                    </div>


                </div>
            )
        }



}

export default Homepage;

