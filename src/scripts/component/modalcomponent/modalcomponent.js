import React, {Component} from 'react';
import Modal from 'react-modal';

import './modalcmoponent.css';

class Modalcomp extends Component{
    constructor(){
      super();
      this.state = {
          showmodal: false
      }
    };

    openmodal = () => {
        this.setState({showmodal: true});
    };
    clsoemodal = () => {
        this.setState({showmodal: false});
    };
    render(){
        return(
            <div>
                <button onClick={this.openmodal}>Trigger Modal</button>
                <Modal
                    isOpen={this.state.showmodal}
                    contentLabel="onRequestClose Example"
                    onRequestClose={this.clsoemodal}
                    className="Modal"
                    overlayClassName="Overlay">
                    <p>Modal text!</p>
                    <button onClick={this.clsoemodal}>Close Modal</button>
                </Modal>
            </div>
        )

    }
}

export default Modalcomp;