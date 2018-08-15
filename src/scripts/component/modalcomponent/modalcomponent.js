import React, {Component} from 'react';
import Modal from 'react-modal';
import * as FontAwesome from 'react-icons/lib/fa';
import './modalcmoponent.css';

class Modalcomp extends Component{
    constructor(){
      super();
      this.state = {
          showmodal: false,
          newtickerVal: "",
          tickerQty:"",
          tickerprice:"",
          tickertotal:""
      }
    };
    clsoemodal = () => {
        this.setState({showmodal: false});
    };
    openmodal = () => {
        this.setState({showmodal: true});
    };
    clsoemodalnpasstickerval = () => {
        console.log("printing state values: ",this.state.newtickerVal+", "+this.state.tickerQty, +", "+this.state.tickertotal);
        const tickerObj = {};
        tickerObj["Ticker"] = this.state.newtickerVal;
        tickerObj["Qty"] = this.state.tickerQty;
        tickerObj["Purchasedat"] = this.state.tickerprice;
        this.props.handlerFrommodaltohome(this.state.newtickerVal, tickerObj);


        this.setState({showmodal: false, newtickerVal:"", tickerQty:"", tickerprice:""});
    };
    changenewtickerval = (e) => {
        this.setState({newtickerVal: e.target.value});
    };
    changenewtickerqty = (e) => {
        this.setState({tickerQty: e.target.value});
    };
    changenewtickerprice = (e) => {
        this.setState({tickerprice: e.target.value});
    };
    changenewtickertotal = (e) => {
        this.setState({tickertotal: e.target.value});
    };
    validationForm = (tickerName, tickerQty, tickerPrice) => {
        /*
        console.log("Ticker Name: ", tickerName);
        console.log("Ticker Quantity: ", tickerQty);
        console.log("Ticker price: ", tickerPrice);
        */
        var checkdecimal = /^\d*$/;
        var checkPrice = /^\d*\.\d*/;
        var checkTickerName = /^[a-zA-Z]+$/;

        if (checkPrice.test(tickerPrice) && tickerPrice) {
            console.log("Correct qty: ",tickerPrice);
        }
        if (checkdecimal.test(tickerQty) && tickerQty) {
            console.log("Correct qty: ",tickerQty);
        }
        if (checkTickerName.test(tickerName) && tickerName) {
            console.log("Correct qty: ",tickerName);
        }
        return{
            tickerName: true,
            tickerQty: false,
            tickerPrice: true,
        }
    };
    render(){
        const checkErros = this.validationForm(this.state.newtickerVal,
                                            this.state.tickerQty,
                                            this.state.tickerprice);
        console.log(checkErros);
        return(
            <div >

                <div className="container-plus-icon" onClick={this.openmodal}>
                    <div id="icon-add" className="icon-add-cp" style={{color: '#5af527'}}>
                        <FontAwesome.FaPlusCircle size={26} />
                    </div>
                    <div>Add Stock</div>
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
                                       onChange={this.changenewtickerval}
                                       value={this.state.newtickerVal}
                                />
                            </div>
                        </div>
                        <div className="tickerqty-div modal-ip-margin">
                            <div className="modal-label-style">
                                <span className="tickerqtyiplabel">Quantity</span>
                            </div>
                            <div className="modal-input-style">
                                <input type="text"
                                       className="modal-back-color"
                                       id="tickerinput"
                                       pattern="^[1-9]\d*$"
                                       onChange={this.changenewtickerqty}
                                       value={this.state.tickerQty}
                                />
                            </div>
                        </div>
                        <div className="tickerprice-div modal-ip-margin">
                            <div className="modal-label-style">
                                <span className="tickerqtyiplabel">Price</span>
                            </div>
                            <div className="modal-input-style">
                                <input type="text"
                                       className="modal-back-color"
                                       id="tickerprice"
                                       pattern="^[1-9]\d*(\.\d+)?$"
                                       onChange={this.changenewtickerprice}
                                       value={this.state.tickerprice}
                                />
                            </div>
                        </div>
                        <div className="tickertotal-div modal-ip-margin">
                            <div className="modal-label-style">
                                <span className="tickertotaliplabel">Investment</span>
                            </div>
                            <div className="modal-input-style">
                                <input type="text"
                                       className="modal-back-color"
                                       id="tickertotal"
                                       onChange={this.changenewtickertotal}
                                       value={this.state.tickertotal}
                                />
                            </div>
                        </div>
                        <div className="modal-buttons-div">
                            <button id="modal-add-button" className="modal-button-style" onClick={() => this.clsoemodalnpasstickerval()}>Add To Portfolio</button>
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