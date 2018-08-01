import React, {Component} from 'react';
import './cp.css';
import * as FontAwesome from 'react-icons/lib/fa';

class Cportfolio extends Component{
    constructor(props){
        super(props);
        this.state = {
            netval: "$"+"4000"
        };
    }
    onNetValChange(){
        console.log("Props Val: ",this.state.netval);
    }
    render(){

        return(
            <div className="cp-div">
                <div id="cp-label" className="cmn-style">
                    Current Portfolio status
                </div>
                <div id="ac-value" className="cmn-style ac-value" onChange={this.onNetValChange}>
                    {this.state.netval}
                </div>
                <div className="roundbracket">(</div>
                <div id="ac-perventage-icon" className="cmn-style ac-perventage-icon">
                    <div id="icon-up-down" className="icon-up-down-cp" style={{color: '#5af527'}}>
                        <FontAwesome.FaCaretUp size={36} />
                    </div>
                </div>
                <div id="ac-perventage-val" className="cmn-style ac-perventage-val">
                    20%
                </div>
                <div className="roundbracket">)</div>
                <div className="container-plus-icon">
                    <div id="icon-add" className="icon-add-cp" style={{color: '#5af527'}}>
                        <FontAwesome.FaPlusCircle size={46} />
                    </div>
                    <div>Add Stock</div>
                </div>
            </div>
        )
    }
}

//FaCaretUp, FaCaretDown
export default Cportfolio;