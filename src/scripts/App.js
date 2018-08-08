import React, { Component } from 'react';
import Modal from 'react-modal';
import '../app.scss'

import '../style/App.css';
import '../scripts/component/home/hompage.css';
import Homepage from '../scripts/component/home/home';


class App extends Component {
    componentWillMount() {
        Modal.setAppElement("body");
    }
  render() {
    return (
      <div className="stockapp-root" id="modaldiv">

        <div className="hompageStyle">
            <Homepage />
        </div>

      </div>
    );
  }
}

export default App;

