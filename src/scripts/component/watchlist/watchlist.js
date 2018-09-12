import React, {Component} from 'react';
import apiobj from '../../../utils/api';
import * as FontAwesome from 'react-icons/lib/fa';
import './watchlist.css';

class Watchlistcomp extends Component{
    constructor(props){
        super(props);
        const { router, params, location, routes } = this.props;
        this.state = {
            testing: "",
            searchticker:"",
            iswlloaded:false,
            wlsymbolresponse:"",
            autocompleteSymbol:"",
            shownSymbol: true
        };
    }
    formatMarketCap = (labelValue) => {

        // 12 Zeroes for Billions
        return Math.abs(Number(labelValue)) >= 1.0e+12

            ? Math.abs(Number(labelValue)) / 1.0e+12 + "T"

            : Math.abs(Number(labelValue)) >= 1.0e+9

            ? Math.abs(Number(labelValue)) / 1.0e+9 + "B"
            // Six Zeroes for Millions
            : Math.abs(Number(labelValue)) >= 1.0e+6

                ? Math.abs(Number(labelValue)) / 1.0e+6 + "M"
                // Three Zeroes for Thousands
                : Math.abs(Number(labelValue)) >= 1.0e+3

                    ? Math.abs(Number(labelValue)) / 1.0e+3 + "K"

                    : Math.abs(Number(labelValue));

    }

    formatVolume = (formattedMarketCap) => {
        var lastChar = formattedMarketCap.substr(formattedMarketCap.length - 1);

        var formatNumbertotwo = formattedMarketCap.substring(0, formattedMarketCap.length - 1);
        formatNumbertotwo= parseFloat(formatNumbertotwo);

        formattedMarketCap= formatNumbertotwo.toFixed(2);
        formattedMarketCap = "$"+formattedMarketCap+" "+lastChar;

        return formattedMarketCap;
    }

    formatAllnumber = (unformatNumber) => {
        var formattedMarketCap = this.formatMarketCap(unformatNumber);
        var formatVolume = this.formatVolume(formattedMarketCap);
        return formatVolume;
    }
    removeTicker = (symbolToRemove) => {
        var getWatchlistString= localStorage.getItem('watchlistTickers');
        getWatchlistString = getWatchlistString.replace(","+symbolToRemove,"");
        console.log("After removal of symbol: ", getWatchlistString);
        localStorage.setItem('watchlistTickers', getWatchlistString);
        this.fetchwlquote(getWatchlistString);

    }
    calculateChangePercent = (changeVal) => {
        var percentangeChange = changeVal.toFixed(2);
        return percentangeChange;
    }
    formatWlHtml = (response) => {
        console.log("Response from watchlist callback: ", response);
        var tickerwlObj = response;
        var tickerwlArray = [];

        Object.keys(tickerwlObj).forEach(function(key) {
            tickerwlArray.push(tickerwlObj[key]);
        });
        var counter = 0;
        const eachtickerDiv = tickerwlArray.map((key, i) => {
            console.log("each symbol: ",key);

            return(
                <div className="each-watclist">
                    <div className="w-ticker-name inline-class-wl w-ticker-adjust">{key.quote.symbol}</div>
                    <div className="w-ticker-price inline-class-wl w-ticker-adjust">${key.quote.latestPrice}</div>
                    <div className="w-ticker-change-p inline-class-wl w-ticker-adjust">%({this.calculateChangePercent(key.quote.changePercent)})</div>
                    <div className="w-ticker-change-m inline-class-wl w-ticker-adjust">$({key.quote.change})</div>
                    <div className="w-ticker-volume inline-class-wl w-ticker-adjust">{this.formatAllnumber(key.quote.latestVolume)}</div>
                    <div className="w-ticker-mcap inline-class-wl w-ticker-adjust">{this.formatAllnumber(key.quote.marketCap)}</div>
                    <div className="w-ticker-delete inline-class-wl w-ticker-adjust" onClick={() => this.removeTicker(key.quote.symbol)} >
                        <div id="icon-delete" className="icon-delete-cp" style={{color: 'rgb(255, 93, 40)'}}>
                            <FontAwesome.FaMinusCircle size={35} />
                        </div>
                    </div>
                </div>

            );

        });
        var testHTML = <div>testing div</div>;

        this.setState({testing:eachtickerDiv});
    }
    fetchwlquote(tickersString){
        console.log("watchlist string: ",tickersString);
        apiobj.watchlistQuote(tickersString)
            .then(function (response) {
                var arry = tickersString.split(",");
                //console.log("promise quote Data: ", arry);
                this.setState({wlsymbolresponse : response,
                                iswlloaded: true,
                                quoteArray: arry},
                                () => {this.formatWlHtml(response)});
                console.log("after watchlist api call", response);

            }.bind(this));
    }
    copySymbolName = (symbolName) => {
        this.setState({searchticker: symbolName, shownSymbol:true});
    }
    formatAutoSymbol = (symbolsList) => {
        const eachsymbolDiv = symbolsList.map((key, i) => {

            if(key.exchDisp === "NASDAQ" || key.exchDisp === "NYSE")
            {
                console.log("each symbol: ",key.symbol);
                console.log("each symbol: ",key.name);
                return(<li className="each-symbol-found" onClick={() => this.copySymbolName(key.symbol)}>
                    <div className="each-symbol typeOfdisplay">{key.symbol}</div>
                    <div className="each-symbol-name typeOfdisplay">{key.name}</div>
                    </li>
                );
            }
        });
        this.setState({autocompleteSymbol:eachsymbolDiv});
    }
    getAutocompleteSymbols = (symbolChar) => {

        apiobj.getsymbolAutocomplete(symbolChar)
            .then(function (response) {
                this.formatAutoSymbol(response.ResultSet.Result);
            }.bind(this));
    }
    changewltickerval = () => event => {

        this.setState({shownSymbol: false});
        if (event.target.value.toUpperCase().match(/^[a-zA-Z]+$/))
        {
            console.log('Only alphabets are allowed for watchlist: ', event.target.value);
            this.getAutocompleteSymbols(event.target.value);
            this.setState({searchticker: event.target.value.toUpperCase()});
            return false;
        }
        this.getAutocompleteSymbols(event.target.value);
        if(this.state.searchticker.length == 1)
        {
            console.log("out of loop watchlist: ", this.state.searchticker);
            this.setState({searchticker: "", shownSymbol:true});
        }
    };

    componentWillMount() {
        console.log("watchlist component loaded");
        const wlsymbols= localStorage.getItem('watchlistTickers');

       this.fetchwlquote(wlsymbols);
    }

    onClickWatchlist = () => {
        console.log();
        const tickersForWatchlist= localStorage.getItem('watchlistTickers');
        var updatedWLTickerString = tickersForWatchlist+","+this.state.searchticker;
        console.log("From updated string: ",updatedWLTickerString);
        localStorage.setItem('watchlistTickers', updatedWLTickerString);
        this.setState({searchticker: ""});
        this.fetchwlquote(updatedWLTickerString);
    }
    render(){
        console.log("re-render");
        var hidden = {
            display: this.state.shownSymbol ? "none" : "block"
        }
        if(this.state.iswlloaded)
        {
            return(
                <div>
                    <div className="search-ticker">
                        <input type="text"
                               className=""
                               id="watchlist-input"
                               value={this.state.searchticker}
                               onChange={this.changewltickerval()}
                        />
                        <div class="symbol-autocomplete" style={ hidden } >
                            <div>{this.state.autocompleteSymbol}</div>
                        </div>
                        <div className="button-watchlist-style">
                            <button className="buttom-watchlist" onClick={() => this.onClickWatchlist()} >Add Stock to watchlist </button>
                        </div>
                    </div>
                    <div className="each-watclist-header">
                        <div className="w-header-name inline-class-wl w-header-adjust"><span>Ticker</span></div>
                        <div className="w-header-price inline-class-wl w-header-adjust"><span>Price</span></div>
                        <div className="w-header-change-p inline-class-wl w-header-adjust"><span>Change(%)</span></div>
                        <div className="w-header-change-m inline-class-wl w-header-adjust"><span>Change($)</span></div>
                        <div className="w-header-volume inline-class-wl w-header-adjust"><span>Volume</span></div>
                        <div className="w-header-volume inline-class-wl w-header-adjust"><span>Market Cap</span></div>
                    </div>
                    <div>{this.state.testing}</div>

                </div>
            )
        }
        else{
            //console.log("Still loading data");
            return(

                <div>Data still loading</div>
            )
        }

    }
}

export default Watchlistcomp;

/*
<div>{this.props.location.pathname}</div>
 */