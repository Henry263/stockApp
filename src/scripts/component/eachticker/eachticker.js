import React, {Component} from 'react';
import Tickeranatomy from '../tickeranatomy/tickeranatomy';
import Modalcomp from '../modalcomponent/modalcomponent';
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
            newtickerportfolio: "",
            newtickerObj:"",
            overallPortfolioVal:"",
            tickerhtml:"",
            oldassetval:0
        };
    }
    handlechildtickerval = (newVal, newObj) => {
        console.log("from eachticker component: ",newVal + ", ", newObj);
        const tickerObjFromCache= localStorage.getItem('initialTickerObj');
        let formatedJson = JSON.parse(tickerObjFromCache);
        formatedJson = Object.assign(newObj, formatedJson);
        //formatedJson.push(newObj);
        localStorage.setItem('initialTickerObj', JSON.stringify(formatedJson));
        this.setState({newtickerportfolio: newVal, newtickerObj: formatedJson}, () => this.checknewtickervalue());
    };
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
                this.setState({responsequote : response, isquoteloaded: true, quoteArray: arry, tickerfrommodalflag:true},
                    () => this.formateachsymbolhtml(response));
                //console.log("after api call  will mount method", this.state.isquoteloaded);
                ///this.props.callbacktohome(response,arry);
            }.bind(this));
    }
    loppForquote(){

        var estTime = new Date(); // get local time to be calculated into EST
        estTime.setHours(estTime.getHours() + estTime.getTimezoneOffset()/60 - 4);
        //console.log("EST time: ",estTime.getHours());
        var estHours = estTime.getHours();
        var timeInterval;
        if(estHours >6 && estHours < 16)
            timeInterval = 10000;
        else
            timeInterval = 15000;

        this.interval = setInterval(() => {
            //console.log("Number for loop from quote ticker:",count++);
            this.fetchquote(this.state.quoteFromuser);
        }, timeInterval);
    }

    componentWillMount() {
        //console.log("Fonts:", FontAwesome);
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
    /**
     * @purpose: to check everytime new stock ticker and make api call.
     */
    checknewtickervalue = () => {
        console.log("state newtickerportfolio: ",this.state.newtickerportfolio);
        console.log("state defaulttickerfrommodal: ",this.state.defaulttickerfrommodal);
        if(this.state.newtickerportfolio !== this.state.defaulttickerfrommodal){

            const existingTickersString = this.state.quoteFromuser+","+this.state.newtickerportfolio;
            localStorage.setItem('initialTickerString', existingTickersString);
            this.setState(
                {
                    quoteFromuser: existingTickersString,
                    defaulttickerfrommodal:this.state.newtickerportfolio,
                    ticekrObj:this.state.newtickerObj

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

    };

    /**
     * @purpose: To calculate per stock gain/loss in percentage.
     * @param tickername
     * @param tickerprice
     */
    totalGain = (tickername, tickerprice) => {
        var gaininPercent;
        const gaincalculation = tickerprice - this.state.ticekrObj[tickername]["Purchasedat"];
        const totalgain = this.floorFigure((gaincalculation/this.state.ticekrObj[tickername]["Purchasedat"])*100, 2);

        gaininPercent = totalgain;
        return gaininPercent;
    };

    /**
     * @purpose: To calculate per stock total amount.
     * @param tname
     * @param tprice
     */
    totalPerstock = (tname, tprice) => {
        var totalperstock;
        const totalcalculation = tprice * this.state.ticekrObj[tname]["Qty"];
        var totalperstocknumber = this.floorFigure(totalcalculation,2);

        totalperstock = totalperstocknumber;
        return totalperstock;
    };

    /**
     * @purpose: To calculate per stock gain/loss in $ amount.
     * @param tickername
     * @param tickerprice
     * @returns {*}
     */
    totalInvest = (tickername, tickerprice) => {
        var investAmount;

        const qt = this.state.ticekrObj[tickername]["Qty"];
        const marketprice = qt*tickerprice;

        const investedamt = qt*this.state.ticekrObj[tickername]["Purchasedat"];
        const finalamount = marketprice - investedamt;
        investAmount = this.floorFigure(finalamount,2);

        return investAmount;

    };
    getcolorcode = (checkPositiveNegative) => {
        if(checkPositiveNegative > 0)
            return "positivecolorcode";
        else
            return "negativecolorcode";
    };

    removeticker = (symboltoremove) => {
        var geteachString= localStorage.getItem('initialTickerString');
        geteachString = geteachString.replace(","+symboltoremove,"");
        //localStorage.setItem('each ticker string: ', geteachString);
        console.log("After removal of symbol string val : ", symboltoremove);
        localStorage.setItem('initialTickerString', geteachString);

        let getlocalstorageObj= localStorage.getItem('initialTickerObj');
        let getlocalstorageObjparsed = JSON.parse(getlocalstorageObj);
        getlocalstorageObj = JSON.parse(getlocalstorageObj);
        delete getlocalstorageObj[symboltoremove];
        console.log("After removal of symbol obj val : ", getlocalstorageObj);
        console.log("After removal of symbol obj val stringify: ", JSON.stringify(getlocalstorageObj));

        localStorage.setItem('initialTickerObj', JSON.stringify(getlocalstorageObj));

        this.setState(
            {
                quoteFromuser: geteachString,
                ticekrObj:getlocalstorageObjparsed

            });
        this.fetchquote(geteachString);
    };
    formateachsymbolhtml = (responseobj) => {
        var tickerObj = responseobj;
        var tickerArray = [];
        Object.keys(tickerObj).forEach(function(key) {
            tickerArray.push(tickerObj[key]);
        });
        var overAllInvest = 0;
        const eachtickerDiv = tickerArray.map((key, i) => {
            var recalculatePercent = key.quote.changePercent*100;

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

            // Gain/loss per stock
            const investamt = this.totalInvest(key.quote.symbol, key.quote.latestPrice);
            const totalgainVal = this.totalGain(key.quote.symbol, key.quote.latestPrice);
            // Total perstock
            var getperstockTotal = this.totalPerstock(key.quote.symbol, key.quote.latestPrice);

            overAllInvest = overAllInvest + parseFloat(getperstockTotal);

            var num = 1;
            //console.log("Gettling latest values: ",key.quote.latestPrice);
            return(
                <div className="eachtickerblock" value={key.quote.symbol} >
                    <div className="eachticker-header">
                        {symbolElem}
                        <div class="remove-holder">
                            <div id="remove-ticker" className="remove-ticker-style" onClick={() => this.removeticker(key.quote.symbol)}>
                                <div id="icon-delete" className="" >
                                    <FontAwesome.FaMinusCircle size={20} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div onClick={()=>this.handleOnTickerClick(key.quote.symbol)}>
                        <div className="tickerprice"><span className="dsign">$</span><span>{key.quote.latestPrice}</span></div>
                        <div className="change-container-div">
                            <div className="bracket-open">
                                (
                            </div>
                            {percentageComponent}
                            <div className="bracket-close">
                                )
                            </div>
                        </div>
                        <div className="totalVal-div">

                            <div className="span-lbl-gain">Gain: </div>
                            <div className="values-div">
                                <div id="totalValpercent" className={this.getcolorcode(investamt)}>( % {totalgainVal} ,</div>
                                <div id="totalVal" className={this.getcolorcode(investamt)}>$ {investamt} )</div>
                            </div>
                            <div className="span-lbl-gain">Value: </div>
                            <div className="values-div">
                                <div id="totalVal">( ${getperstockTotal} )</div>
                            </div>

                        </div>
                    </div>


                </div>
            );

        });

        const asstObj = {};
        asstObj.newassetval = overAllInvest;
        asstObj.oldassetval = this.state.oldassetval;
        this.setState({tickerhtml:eachtickerDiv, oldassetval:overAllInvest}, this.props.getvaluefromchild(asstObj));

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
            return(

                <div>

                    <div style={ shown } className="ticker-container">
                        <div>
                            <div className="eachtickerblock addstock-div">
                                <div className="addstock-label">Add Stock</div>
                                <div className="addstock-icon"><Modalcomp handlerFrommodaltohome={this.handlechildtickerval}/></div>
                            </div>
                            {this.state.tickerhtml}
                            </div>

                    </div>

                    <div style={ hidden } className="ticker-anatomy">
                        <div>{this.gettickeranatomydiv()}</div>

                    </div>

                </div>

            )
        }

        else {
            //console.log("Still loading data"); {eachtickerDiv}
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