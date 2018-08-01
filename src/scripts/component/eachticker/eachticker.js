import React, {Component} from 'react';
import Tickeranatomy from '../tickeranatomy/tickeranatomy';
import './eachticker.css';
import * as FontAwesome from 'react-icons/lib/fa';
import apiobj from '../../../utils/api';



class Eachticker extends Component{
    constructor(props){
        super(props);
        this.state = {
            quoteFromuser:"AAPL,FB,GBT,AMZN,VTVT,EBIO,TSLA",
            isquoteloaded: false,
            responsequote: "",
            quoteArray: [],
            shown: true,
        };
    }

    toggle() {
        this.setState({
            shown: !this.state.shown
        });

        console.log("State after function call: ",this.state.shown);
    }
    toggleclose(){
        this.setState({
            shown: !this.state.shown
        });
    }

    fetchquote(){

        apiobj.stockquote(this.state.quoteFromuser)
            .then(function (response) {
                var arry = this.state.quoteFromuser.split(",");
                console.log("promise quote Data: ", arry);
                this.setState({responsequote : response, isquoteloaded: true, quoteArray: arry});
            }.bind(this));
    }
    loppForquote(){
        var count = 0;
        this.interval = setInterval(() => {
            console.log("Number for loop from quote ticker:",count++);
            this.fetchquote();
        }, 10000);
    }

    componentWillMount() {
        console.log("component will mount method");
        this.setState({isquoteloaded:false});
        this.loppForquote();
        this.fetchquote();
    }
    positiveTicker(symbolStyle){
        return(
            <div className="tickername"  style={{color: '#7eff10'}}>{symbolStyle}</div>
        )
    }
    negativeTicker(symbolStyle){
        return(
            <div className="tickername" style={{color: '#ff5d28'}}>{symbolStyle}</div>
        )
    }

    positiveVal(valueinpercentage){
        return(
            <div className="up-down-icon-each">
                <div id="icon-up-down" className="up-down-icon-each" style={{color: '#7eff10'}}>
                    <FontAwesome.FaCaretUp size={40} />
                </div>
                <div className="up-down-percent up-color">{valueinpercentage}%</div>
            </div>
        );
    }

    negativeVal(minusvalueinpercentage){
        return(
            <div className="up-down-icon-each">
                <div id="icon-up-down" className="up-down-icon-each" style={{color: '#ff5d28'}}>
                    <FontAwesome.FaCaretDown size={40} />
                </div>
                <div className="up-down-percent down-color">{minusvalueinpercentage}%</div>
            </div>
        );
    }
    floorFigure(figure, decimals){
        if (!decimals) decimals = 2;
        var d = Math.pow(10,decimals);
        return (parseInt(figure*d)/d).toFixed(decimals);
    };

    handleOnTickerClick(param){
        //const nextValue = e.target.value;
        console.log("State before function call: ",this.state.shown);
        this.toggle();
        console.log("From function: ", param);
    };


    render(){
        var shown = {
            display: this.state.shown ? "block" : "none"
        };

        var hidden = {
            display: this.state.shown ? "none" : "block"
        }
        var counter = 0;
        if(this.state.isquoteloaded)
        {
            //console.log("Data loaded: ", this.state.responsequote);
            console.log("Data loaded: ", counter++);
            var tickerObj = this.state.responsequote;
            var tickerArray = [];
            Object.keys(tickerObj).forEach(function(key) {
                tickerArray.push(tickerObj[key]);
            });

            const eachtickerDiv = tickerArray.map((key, i) => {
                var recalculatePercent = key.quote.changePercent*100;
                //console.log("From render function: ", key.quote.latestPrice);
                var percentVal = this.floorFigure(recalculatePercent, 2);
                var percentageComponent;
                var symbolElem;
                if(percentVal >= 0)
                {
                    percentageComponent = this.positiveVal(percentVal);
                    symbolElem = this.positiveTicker(key.quote.symbol);
                }
                else
                {
                    percentageComponent = this.negativeVal(percentVal);
                    symbolElem = this.negativeTicker(key.quote.symbol);
                }
                var num = 1;
                console.log("Gettling latest values: ",key.quote.latestPrice);
                return(
                    <div className="eachtickerblock" value={key.quote.symbol} onClick={()=>this.handleOnTickerClick(key.quote.symbol)}>
                        {symbolElem}
                        <div className="tickerprice"><span className="dsign">$</span><span>{key.quote.latestPrice}</span></div>
                        <div className="bracket-open">
                            (
                        </div>
                        {percentageComponent}
                        <div className="bracket-close">
                            )
                        </div>
                    </div>
                );

            });
            return(

                <div >
                    <div style={ shown } className="ticker-container">
                        {eachtickerDiv}
                    </div>

                    <div style={ hidden } className="ticker-anatomy">
                        <div className="anatomy-boundry">
                            <div className="left-anatomy-div"></div>
                            <div className="close-btn" onClick={()=> this.toggle()}>
                                <FontAwesome.FaClose size={40} />
                            </div>
                            <div className="anatomy-data">
                                <Tickeranatomy/>
                            </div>

                        </div>

                    </div>
                </div>
            )
        }
        else {
            //console.log("Still loading data");
            return(

                <div>Data still loading</div>
            )
        }

    }
}

export default Eachticker;

/*
* <h2>this.state.shown = true</h2>
                        <h2>this.state.shown = false</h2>
* */