import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './hompage.css';
import HomepageTopBar from './home';

class App extends Component {
  render() {
    return (
      <div className="">
        <div className="topbar">
            <HomepageTopBar />
        </div>
          <div className="stockDetails">
              <div className="stockChartColumn"></div>
              <div className="stockChartData"></div>
          </div>
      </div>
    );
  }
}

export default App;
