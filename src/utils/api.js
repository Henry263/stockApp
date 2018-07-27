var axios = require('axios');
//import axios from 'axios';

module.exports = {
    fetchStockData: function(){
        //var apiUrl = "https://api.iextrading.com/1.0/stock/amzn/quote";
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
    },
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
    },
    stockquote: function(quotes){

        //var quotes = "https://cors-anywhere.herokuapp.com/https://api.iextrading.com/1.0/stock/market/batch?symbols=aapl,fb,tsla&types=quote,news&range=1m&last=5";
        var proxyAPI = "https://cors-anywhere.herokuapp.com/";
        var quoteAPIurl = "https://api.iextrading.com/1.0/stock/market/batch?types=quote,news&range=1m&last=5&symbols=";
        var quoteapiUrl = proxyAPI+quoteAPIurl+quotes;
        return axios.get(quoteapiUrl,
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
            }
        )
    },

    topgainers: function(){
        var _topgainersUrl = "https://cors-anywhere.herokuapp.com/https://api.iextrading.com/1.0/stock/market/list/gainers";
        return axios.get(_topgainersUrl,
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
            }
        )
    },
    toploosers: function(){
        var _toploosersurl = "https://cors-anywhere.herokuapp.com/https://api.iextrading.com/1.0/stock/market/list/losers";
        return axios.get(_toploosersurl,
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
            }
        )
    }
}


