var axios = require('axios');
//import axios from 'axios';

module.exports = {
    fetchStockData: function(){
        //var apiUrl = "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=MSFT&interval=1min&apikey=demo";
        var marketHeadlinesAPI = "https://cors-anywhere.herokuapp.com/https://seekingalpha.com/news/trending_news";
        return axios.get(marketHeadlinesAPI,
            {
                headers: ""
            },
            { mode: 'no-cors' },
            {
                xhrFields: {
                    withCredentials: true
                }
            })
            .then(function(response){
                    return response.data;
            })
    }
    ,
    fetchlivefeedData: function(){
        //var apiUrl = "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=MSFT&interval=1min&apikey=demo";
        var liveFeedAPI = "https://cors-anywhere.herokuapp.com/https://seekingalpha.com/news/updates?exclude_feed=true";
        return axios.get(liveFeedAPI,
            {
                headers: ""
            },
            { mode: 'no-cors' },
            {
                xhrFields: {
                    withCredentials: true
                }
            })
            .then(function(response){
                return response.data;
            })
    }
}


