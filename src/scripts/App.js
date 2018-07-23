import React, { Component } from 'react';
import '../app.scss'

import '../style/App.css';
import '../scripts/component/home/hompage.css';
import Homepage from '../scripts/component/home/home';

class App extends Component {
  render() {
    return (
      <div className="sampleClass">

        <div className="hompageStyle">
            <Homepage />
        </div>

      </div>
    );
  }
}

export default App;

