import React, {Component} from 'react';
import './contact.css';

class Contactus extends Component{
    render(){
        return(
            <div>
                <div className="contact-component"><div>Connect with us if you have more questions.</div></div>
                <div className="contact-form">
                    <div className="name-div common-div-row">
                        <div className="lbl-name">Name</div>
                        <div className="inputField"><input type="text" id="_ct_name" className="ipStyle"/></div>
                    </div>
                    <div className="phone-div common-div-row">
                        <div className="lbl-name">Contact</div>
                        <div className="inputField"><input type="text" id="_ct_phone" className="ipStyle"/></div>
                    </div>
                    <div className="email-div common-div-row">
                        <div className="lbl-name">Email</div>
                        <div className="inputField"><input type="email" id="_ct_email" className="ipStyle"/></div>
                    </div>
                    <div className="comments-div common-div-row">
                        <div className="lbl-name">Comments/Questions</div>
                        <div className="inputField"><textarea rows="6" className="txtarea"></textarea></div>
                    </div>
                </div>
            </div>

        )
    }
}

export default Contactus;