import React, {Component} from 'react';
import * as FontAwesome from 'react-icons/lib/fa';
import './toploosers.css';
import apiobj from '../../../utils/api';

class Toploosers extends Component{
    constructor(props){
        super(props);
        this.state = {
            isloadingToploosers: false,
            loosersData:""
        }
    };

    fetchloosersData(){
        apiobj.toploosers()
            .then(function (response){
                console.log("from top Loosers: ",response);
                this.setState({loosersData: response, isloadingToploosers:true});
            }.bind(this));
    }

    loppForapi(){
        var count = 0;
        this.interval = setInterval(() => {
            this.fetchloosersData();
        }, 50000);
    }

    componentWillMount(){
        this.setState({isloadingToploosers:false});
        this.fetchloosersData();
        this.loppForapi();
    }
    floorFigure(figure, decimals){
        if (!decimals) decimals = 2;
        var d = Math.pow(10,decimals);
        return (parseInt(figure*d)/d).toFixed(decimals);
    };
    render(){
        if(this.state.isloadingToploosers)
        {
            const _tg_arrays = this.state.loosersData;
            const looping_tg_data = _tg_arrays.map((key,i) => {

                if(i<5)
                {
                    console.log("each gainsers data symbol:", key.symbol);
                    console.log("each gainsers data latest ptice:", key.latestPrice);


                    var recalculatePercent = key.changePercent*100;
                    //console.log("From render function: ", key.quote.latestPrice);
                    var percentVal = this.floorFigure(recalculatePercent, 2);
                    console.log("each gainsers data change in percent:", percentVal);
                    return(
                        <div className="_tg_details">
                            <div className="_tg_symbol _tg_labels">{key.symbol}</div>
                            <div className="_tg_percentchange _tg_labels right-space">
                                <div className="_tg_icon inline_style" style={{color: '#ff5d28'}}>
                                    <FontAwesome.FaCaretDown size={40} />
                                </div>
                                <div className="_tg_changeval inline_style" style={{color: '#ff5d28'}}>{percentVal}%</div>
                            </div>
                            <div className="_tg_price _tg_labels">${key.latestPrice}</div>
                            <hr className="_tg_hr_line"></hr>
                        </div>
                    )
                }
                else
                {
                    return true;
                }
            });
            return(
                <div className="topgainsers-div lossers-style">
                    <div className="_tg_heading" style={{color: '#ff5d28'}}>Top 5 Loosers</div>
                    {looping_tg_data}
                </div>

            )

        }
        else {
            console.log("Loading the gainsers data");
            return(
                <div>Still loading the data</div>
            )
        }
    }
}

export default Toploosers;