import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './hompage.css';
import HomepageTopBar from './home';
import StockOverall from './stockChartdata';

class App extends Component {
  render() {
    return (
      <div className="">
        <div className="topbar">
            <HomepageTopBar />
        </div>
          <div className="stockDetails">
            <StockOverall profival={400} profilename="Harshil"/>
          </div>
      </div>
    );
  }
}

export default App;
