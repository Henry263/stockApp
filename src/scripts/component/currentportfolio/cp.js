import React, {Component} from 'react';

import './cp.css';
import * as FontAwesome from 'react-icons/lib/fa';



class Cportfolio extends Component{
    constructor(props){
        super(props);
        this.state = {
            netval: "",
            netvalUpdate: false,
            assetnumbers:"",
            oldassetvalue:""
        };
    }
    componentWillMount(){

    };
    getassetmarginval = (assetvalObj) => {
        console.log("asset val obj: ", assetvalObj);
        let percentagemargin = 0;
        let dollermargin = 0;
        let updownmargin = "gain-color cmn-style ac-perventage-val";
        if(assetvalObj.newassetval && assetvalObj.newassetval !== assetvalObj.oldassetval && assetvalObj.oldassetval !== 0)
        {
            console.log("proper value in state");
            let newassetVal = assetvalObj.newassetval - assetvalObj.oldassetval;
            if(newassetVal > 0)
            {
                updownmargin = "gain-color cmn-style ac-perventage-val";
            }
            else
            {
                updownmargin = "loss-color cmn-style ac-perventage-val";
            }
            let percentageGain = newassetVal/assetvalObj.newassetval;
            percentageGain = percentageGain * 100;
            dollermargin = newassetVal.toFixed(2);
            percentagemargin = percentageGain.toFixed(2);
        }
        else{
            console.log("zero value in state");
            dollermargin = "0";
            percentagemargin = "0";
        }
        console.log("old asset value: ", assetvalObj.newassetval);

        return(<div>(
            <div id="ac-perventage-val" className={ updownmargin }>
                {percentagemargin}%
            </div>
            <div className="cmn-style comma-spacing">,</div>
            <div id="ac-perventage-val" className={ updownmargin }>
                ${dollermargin}
            </div>
        )</div>);

        console.log("after return statement");
    };
    render(){
        const {propsfromparent} = this.props;
        console.log("props from child component :",this.props.assetval.newassetval);
        if(this.props.assetval.newassetval)
        {
            return(
                <div className="cp-div">

                    <div id="cp-label" className="cmn-style">
                        Virtual Portfolio
                    </div>
                    <div id="ac-value" className="cmn-style ac-value" >
                        ${this.props.assetval.newassetval}
                    </div>
                    <div className="roundbracket">{this.getassetmarginval(this.props.assetval)}</div>

                </div>
            )
        }
        else {
            return(
                <div>Still loading</div>
                )

        }

    }
}

//FaCaretUp, FaCaretDown
export default Cportfolio;

/*
<div className="container-plus-icon">
                    <div id="icon-add" className="icon-add-cp" style={{color: '#5af527'}}>
                        <FontAwesome.FaPlusCircle size={46} />
                    </div>
                    <div>Add Stock</div>
                </div>
 */