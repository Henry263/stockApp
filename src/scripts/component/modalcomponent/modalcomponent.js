import React, {Component} from 'react';
import Modal from 'react-modal';
import * as FontAwesome from 'react-icons/lib/fa';
import './modalcmoponent.css';

class Modalcomp extends Component{
    constructor(){
      super();
      this.state = {
          showmodal: false,
          newtickerVal: ""
      }
    };

    openmodal = () => {
        this.setState({showmodal: true});
    };
    clsoemodalnpasstickerval = () => {

        this.props.handlerFrommodaltohome(this.state.newtickerVal);
        this.setState({showmodal: false, newtickerVal:""});
    };
    changenewtickerval = (e) => {
        this.setState({newtickerVal: e.target.value});
    }
    render(){
        return(
            <div>

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
                    <div>
                        <div className="tickerInput-div">
                            <input type="text"
                                   id="tickerinput"
                                   onChange={this.changenewtickerval}
                                   value={this.state.newtickerVal}
                            />
                        </div>
                    </div>
                    <button onClick={() => this.clsoemodalnpasstickerval()}>Add To Portfolio</button>
                </Modal>
            </div>
        )

    }
}

export default Modalcomp;

/*
<button >Trigger Modal</button>
 */