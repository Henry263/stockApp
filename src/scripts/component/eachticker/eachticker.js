import React, {Component} from 'react';
import Tickeranatomy from '../tickeranatomy/tickeranatomy';
import './eachticker.css';
import * as FontAwesome from 'react-icons/lib/fa';
import apiobj from '../../../utils/api';



class Eachticker extends Component{
    constructor(props){
        super(props);
        this.state = {
            quoteFromuser:"",
            isquoteloaded: false,
            responsequote: "",
            quoteArray: [],
            shown: true,
            tickerclicksymbol:"",
            initialAnatomyComp: true,
            defaulttickerfrommodal: "",
            tickerfrommodalflag: true,
            ticekrObj:"",
        };
    }

    toggle() {

        this.setState({
            shown: !this.state.shown,
            initialAnatomyComp: !this.state.initialAnatomyComp
        });

        //console.log("State initialAnatomyComp after function call: ",this.state.initialAnatomyComp);
    }

    fetchquote(tickersString){

        apiobj.stockquote(tickersString)
            .then(function (response) {
                var arry = tickersString.split(",");
                //console.log("promise quote Data: ", arry);
                this.setState({responsequote : response, isquoteloaded: true, quoteArray: arry, tickerfrommodalflag:true});
                //console.log("after api call  will mount method", this.state.isquoteloaded);
                console.log("fetchquote: 7");
            }.bind(this));
    }
    loppForquote(){

        var estTime = new Date(); // get local time to be calculated into EST
        estTime.setHours(estTime.getHours() + estTime.getTimezoneOffset()/60 - 4);
        console.log("EST time: ",estTime.getHours());
        var estHours = estTime.getHours();
        var timeInterval;
        if(estHours >6 && estHours < 16)
            timeInterval = 10000;
        else
            timeInterval = 1500000;

        this.interval = setInterval(() => {
            //console.log("Number for loop from quote ticker:",count++);
            this.fetchquote(this.state.quoteFromuser);
        }, timeInterval);
    }

    componentWillMount() {
        const tickerStringFromCache= localStorage.getItem('initialTickerString');
        const tickerObjFromCache= localStorage.getItem('initialTickerObj');
        this.setState({ticekrObj: JSON.parse(tickerObjFromCache)});

        if(tickerStringFromCache)
        {

            this.setState({isquoteloaded:false});
            this.loppForquote();
            this.setState(
                {
                    quoteFromuser: tickerStringFromCache,
                });
            this.fetchquote(tickerStringFromCache);
        }

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
                    <FontAwesome.FaArrowUp size={12} />
                </div>
                <div className="up-down-percent up-color">{valueinpercentage}%</div>
            </div>
        );
    }

    negativeVal(minusvalueinpercentage){
        return(
            <div className="up-down-icon-each">
                <div id="icon-up-down" className="up-down-icon-each" style={{color: '#ff5d28'}}>
                    <FontAwesome.FaArrowDown size={12} />
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


    handleOnTickerClick = param => {

        this.setState({tickerclicksymbol: param, initialAnatomyComp:false});
        this.getnewtickerdata();
        this.toggle();
    }

    getnewtickerdata = () => {
        this.setState({getnewtickerdata: this.state.tickerclicksymbol});
    }
    checknewtickervalue = (propsVAl) => {

        if(propsVAl.newtickervalforportfolio.newtickerportfolio !== this.state.defaulttickerfrommodal){

            const existingTickersString = this.state.quoteFromuser+","+propsVAl.newtickervalforportfolio.newtickerportfolio;
            localStorage.setItem('initialTickerString', existingTickersString);
            this.setState(
                {
                    quoteFromuser: existingTickersString,
                    defaulttickerfrommodal:propsVAl.newtickervalforportfolio.newtickerportfolio,
                    ticekrObj:propsVAl.newtickervalforportfolio.newtickerObj

                });
            this.fetchquote(existingTickersString);
        }
    }

    gettickeranatomydiv = () => {
        const isInitialanatomyload = this.state.initialAnatomyComp;

        if(!isInitialanatomyload)
        {
            return(

                <div className="anatomy-boundry">
                        <div className="left-anatomy-div">
                            <Tickeranatomy tickervalue={this.state.tickerclicksymbol} />
                        </div>

                    <div className="close-btn" onClick={()=> this.toggle()}>
                        <FontAwesome.FaClose size={40} />
                    </div>


                </div>
            );
            //console.log("Inside isInitialanatomyload condition True");
        }

    }

    totalGain = (tickername, tickerprice) => {
        const gaininPercent = this.state.ticekrObj.map((key, i) => {
            if(key.Ticker == tickername)
            {

                const gaincalculation = tickerprice - key.Purchasedat;
                const totalgain = this.floorFigure((gaincalculation/key.Purchasedat)*100, 2);

                return totalgain;
            }

        });
        return gaininPercent;
    }
    totalInvest = (tickername, tickerprice) => {
        const investVal = this.state.ticekrObj.map((key, i) => {

            if(key.Ticker == tickername)
            {
                const qt = key.Qty;
                const marketprice = qt*tickerprice;

                const investedamt = qt*key.Purchasedat;
                const finalamount = marketprice - investedamt;

                //this.gainupOrDown(tickerprice, key.Purchasedat);
                return this.floorFigure(finalamount,2);
            }
        });
        return investVal;
    }

    render(){

        this.checknewtickervalue(this.props);

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
            //console.log("Data loaded: ", counter++);
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

                const totalInvest = this.totalInvest(key.quote.symbol, key.quote.latestPrice);
                const totalgainVal = this.totalGain(key.quote.symbol, key.quote.latestPrice, totalInvest);

                var num = 1;
                //console.log("Gettling latest values: ",key.quote.latestPrice);
                return(
                    <div className="eachtickerblock" value={key.quote.symbol} onClick={()=>this.handleOnTickerClick(key.quote.symbol)}>
                        <div className="eachticker-header">
                            {symbolElem}
                            <div className="change-container-div">
                                <div className="bracket-open">
                                    (
                                </div>
                                {percentageComponent}
                                <div className="bracket-close">
                                    )
                                </div>
                            </div>
                        </div>
                        <div className="tickerprice"><span className="dsign">$</span><span>{key.quote.latestPrice}</span></div>

                        <div className="totalVal-div">

                            <div className="span-lbl-gain">Gain: </div>
                            <div className="values-div">
                                <div id="totalValpercent">% {totalgainVal}</div>
                                <div id="totalVal">$ {totalInvest}</div>
                            </div>

                        </div>
                    </div>
                );

            });
            return(

                <div>
                    <div style={ shown } className="ticker-container">
                        {eachtickerDiv}
                    </div>

                    <div style={ hidden } className="ticker-anatomy">
                        <div>{this.gettickeranatomydiv()}</div>

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
const isrerenderRequired = this.samplefunction(this.props);
        if(isrerenderRequired && this.state.isquoteloaded)
        {
            console.log("yes rerender required");
        }
        else {
            console.log("No rerender NOT required");
        }
 */