import React, {Component} from 'react';

class HomepageTopBar extends Component{
    render(){
        return(
            <div className="topbar">
                <div className="appLogo-holder">
                    Logo here
                </div>
                <div className="stockAnalytics-holder">
                    Overall stck balance Data
                </div>
            </div>
            )
    }
}

export default HomepageTopBar;