import React, {Component} from 'react';
import './navbar.css';
import avtar from '../../../graphics/img_avatar.png';
import * as FontAwesome from 'react-icons/lib/fa'


class Navbar extends Component{
    render(){
        console.log(FontAwesome);
        return(
            <div className="navbardiv">
                <div className="avtarholder">
                    <img className="avtarStyle" src={avtar} alt="avtar name"/>
                </div>
                <div className="portfolio-icon-div icon-div">
                    <div id="icon-setting">
                        <FontAwesome.FaLineChart size={46} />
                    </div>
                    <div id="iconName">Portfolio</div>
                </div>

                <div className="watchlist-icon-div icon-div">
                    <div id="icon-setting">
                        <FontAwesome.FaBinoculars size={46} />
                    </div>
                    <div id="iconName">Watchlist</div>
                </div>

                <div className="watchlist-icon-div icon-div">
                    <div id="icon-setting">
                        <FontAwesome.FaNewspaperO size={46} />
                    </div>
                    <div id="iconName">News</div>
                </div>
                <div className="watchlist-icon-div icon-div">
                    <div id="icon-setting">
                        <FontAwesome.FaBank size={46} />
                    </div>
                    <div id="iconName">Valut</div>
                </div>
                <div className="setting-icon-div icon-div">
                    <div id="icon-setting">
                        <FontAwesome.FaCog size={46} />
                    </div>
                    <div id="iconName">Settings</div>
                </div>
                <div className="contact-icon-div icon-div">
                    <div id="icon-setting">
                        <FontAwesome.FaPhoneSquare size={46} />
                    </div>
                    <div id="iconName">Contact Us</div>
                </div>
            </div>
        )
    }
}


export default Navbar;