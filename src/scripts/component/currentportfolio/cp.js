import React, {Component} from 'react';
import './cp.css';
import * as FontAwesome from 'react-icons/lib/fa'

class Cportfolio extends Component{
    render(){
        return(
            <div className="cp-div">
                <div id="cp-label" className="cmn-style">
                    Current Portfolio status
                </div>
                <div id="ac-value" className="cmn-style ac-value">
                    $4000
                </div>
                <div className="roundbracket">(</div>
                <div id="ac-perventage-icon" className="cmn-style ac-perventage-icon">
                    <div id="icon-up-down" style={{color: '#5af527'}}>
                        <FontAwesome.FaCaretUp size={36} />
                    </div>

                </div>
                <div id="ac-perventage-val" className="cmn-style ac-perventage-val">
                    20%
                </div>
                <div className="roundbracket">)</div>
            </div>
        )
    }
}

//FaCaretUp, FaCaretDown
export default Cportfolio;