import React, {Component} from 'react';
import Navbar from '../navbar/navbar';
import Cportfolio from '../currentportfolio/cp';

class Homepage extends Component{
    render(){
        return(
            <div className="topbar">
                <div className="appLogo-holder">
                    <Navbar />
                </div>
                <div className="stockAnalytics-holder">
                    <Cportfolio />
                </div>
            </div>
            )
    }
}

export default Homepage;