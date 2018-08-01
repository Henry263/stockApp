import React, {Component} from 'react';
import './tickeranatomy.css';
import * as FontAwesome from 'react-icons/lib/fa';
import apiobj from '../../../utils/api';

class Tickeranatomy extends Component{
    fetchTickerDetails(){
        
    }
    componentWillMount() {
        console.log("component will mount method");
        this.fetchTickerDetails();
    }
    render(){
        return(
            <div className="_tanatomy_div">
                Ticker anatomy div
            </div>
        )
    }
}

export default Tickeranatomy;