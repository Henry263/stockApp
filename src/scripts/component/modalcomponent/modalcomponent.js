import React, {Component} from 'react';
import Modal from 'react-modal';
import apiobj from '../../../utils/api';
import { Redirect, withRouter } from 'react-router-dom';

import * as FontAwesome from 'react-icons/lib/fa';
import './modalcmoponent.css';

class Modalcomp extends Component{
    constructor(props){
      super(props);

          this.state = {
              showmodal: false,
              newtickerVal: "",
              tickerQty:"",
              tickerprice:"",
              tickertotal:props.tickertotal,
              errorPrice: false,
              errorQty: false,
              erriconDisplay: false,
              submitdisabled: true,
              autocompleteSymboladdstock:"",
              shownSymbolnewticker:true
          };

    };
    clsoemodal = () => {
        this.setState({showmodal: false});
        this.setState({newtickerVal: ""});
    };
    openmodal = () => {
        this.setState({showmodal: true});
    };
    clsoemodalnpasstickerval = () => {
       // console.log("printing state values: ",this.props.location.pathname );
        const tickerObj = {};
        tickerObj["Ticker"] = this.state.newtickerVal;
        tickerObj["Qty"] = this.state.tickerQty;
        tickerObj["Purchasedat"] = this.state.tickerprice;
        this.props.handlerFrommodaltohome(this.state.newtickerVal, tickerObj);

        this.setState({showmodal: false, newtickerVal:"", tickerQty:"", tickerprice:""});
    };
    validateInvestment = (totalinvestvar) => {
        //console.log("How much invested: ", totalinvestvar);
        if(totalinvestvar)
        {
            this.setState({submitdisabled: false});
        }
        else {
            this.setState({submitdisabled: true});
        }
    }
    changenewtickerval = () => event => {
        this.setState({shownSymbolnewticker: false});
        //console.log("ticker values: ",event.target.value);
        var validateTickerName = /^[A-Za-z]+$/;
            //
        if (event.target.value.toUpperCase().match(/^[a-zA-Z]+$/))
        {
            console.log('Only alphabets are allowed: ', event.target.value);
            this.getAutocompleteSymbols(event.target.value);
            this.setState({newtickerVal: event.target.value.toUpperCase()}, () => {this.validateInvestment(this.state.tickertotal)});
            return false;
        }
        this.getAutocompleteSymbols(event.target.value);
        if(this.state.newtickerVal.length == 1)
        {
            console.log("out of loop: ", this.state.newtickerVal);
            this.setState({newtickerVal: "",shownSymbolnewticker:true}, () => {this.validateInvestment(this.state.tickertotal)});
        }
    };
    copySymbolName = (symbolName) => {
        this.setState({newtickerVal: symbolName, shownSymbolnewticker:true});
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
        this.setState({autocompleteSymboladdstock:eachsymbolDiv});
    }
    getAutocompleteSymbols = (symbolChar) => {

        apiobj.getsymbolAutocomplete(symbolChar)
            .then(function (response) {
                this.formatAutoSymbol(response.ResultSet.Result);
            }.bind(this));
    }

    changenewtickerqty = (e) => {
    var tickerQty = /^[\d]+$/;
        if(e.target.value.match(tickerQty))
            this.setState({errorQty: false});
        else
            this.setState({errorQty: true});

        this.setState({tickerQty: e.target.value}, () => {this.validateInvestment(this.state.tickertotal)});
        // Above validateInvestment function call is called called back.
        // this is reference : https://medium.com/@voonminghann/when-to-use-callback-function-of-setstate-in-react-37fff67e5a6c
    };
    changenewtickerprice = (e, qty) => {
        var checkFloatNDecimal = /(?<=^| )\d+(\.\d+)?(?=$| )|(?<=^| )\.\d+(?=$| )/;
        if(e.target.value.match(checkFloatNDecimal))
        {
            //console.log("valid value", qty);
            var investment="";
            if(qty)
            {
                investment = qty*e.target.value;
                //console.log("Type of investment obj: ", typeof investment)
            }
            this.setState({errorPrice: false,tickertotal:investment.toFixed(2)}, () => {this.validateInvestment(this.state.tickertotal)});
        }
        else
        {
            this.setState({errorPrice: true, tickertotal:""}, () => {this.validateInvestment(this.state.tickertotal)});
        }
        this.setState({tickerprice: e.target.value});

    };


    render(){

        var hidden = {
            display: this.state.shownSymbolnewticker ? "none" : "block"
        }
        return(
            <div >

                <div className="container-plus-icon" onClick={this.openmodal}>
                    <div id="icon-add" className="icon-add-cp" style={{color: '#5af527'}}>
                        <FontAwesome.FaPlusCircle size={60} />
                    </div>
                </div>
                <Modal
                    isOpen={this.state.showmodal}
                    contentLabel="onRequestClose Example"
                    onRequestClose={this.clsoemodal}
                    className="Modal"
                    overlayClassName="Overlay">
                    <div className="addticker-div">
                        <div className="modal-label">
                            <span>Add Ticker to portfolio</span>
                        </div>
                        <div className="tickerInput-div modal-ip-margin">
                            <div className="modal-label-style">
                                <span className="tickeriplabel">Ticker </span>
                            </div>
                            <div className="modal-input-style">
                                <input type="text"
                                       className="modal-back-color"
                                       id="tickerinput"
                                       onChange={this.changenewtickerval()}
                                       value={this.state.newtickerVal}
                                />
                                <div class="symbol-autocomplete-newticker" style={ hidden } >
                                    <div>{this.state.autocompleteSymboladdstock}</div>
                                </div>
                            </div>
                            <div className={` error-input-icon ${this.state.erriconDisplay ? '' : 'hidden-err-icon'}`} ><FontAwesome.FaExclamationTriangle size={20}/></div>
                        </div>
                        <div className="tickerqty-div modal-ip-margin">
                            <div className="modal-label-style">
                                <span className="tickerqtyiplabel">Quantity</span>
                            </div>
                            <div className="modal-input-style">
                                <input type="text"
                                       className={`modal-back-color ${this.state.errorQty ? 'input-valid-color' : ''}`}
                                       id="tickerinput"
                                       pattern="^[1-9]\d*$"
                                       onChange={this.changenewtickerqty}
                                       value={this.state.tickerQty}
                                />
                            </div>
                            <div className={` error-input-icon ${this.state.errorQty ? '' : 'hidden-err-icon'}`} ><FontAwesome.FaExclamationTriangle size={20}/></div>
                        </div>
                        <div className="tickerprice-div modal-ip-margin">
                            <div className="modal-label-style">
                                <span className="tickerqtyiplabel">Price</span>
                            </div>
                            <div className="modal-input-style">
                                <input type="text"
                                       className={`modal-back-color ${this.state.errorPrice ? 'input-valid-color' : ''}`}
                                       id="tickerprice"
                                       onChange={(evt) => this.changenewtickerprice(evt,this.state.tickerQty)}
                                       value={this.state.tickerprice}
                                />
                            </div>
                            <div className={` error-input-icon ${this.state.errorPrice ? '' : 'hidden-err-icon'}`} ><FontAwesome.FaExclamationTriangle size={20}/></div>
                        </div>
                        <div className="tickertotal-div modal-ip-margin">
                            <div className="modal-label-style">
                                <span className="tickertotaliplabel">Investment</span>
                            </div>
                            <div className="modal-input-style">
                                <input type="text"
                                       className="modal-back-color"
                                       id="tickertotal"
                                       value={this.state.tickertotal}
                                />
                            </div>
                            <div className={` error-input-icon ${this.state.erriconDisplay ? '' : 'hidden-err-icon'}`} ><FontAwesome.FaExclamationTriangle size={20}/></div>
                        </div>
                        <div className="modal-buttons-div">
                            <button id="modal-add-button" className="modal-button-style" onClick={() => this.clsoemodalnpasstickerval()} disabled={this.state.submitdisabled}>Add To Portfolio</button>
                            <button id="modal-close-button" className="modal-button-style" onClick={() => this.clsoemodal()}>Close Modal</button>
                        </div>
                    </div>


                </Modal>
            </div>
        )

    }
}

export default Modalcomp;

/*
<button >Trigger Modal</button>
 */