var axios = require('axios');
//import axios from 'axios';

module.exports = {
    fetchStockNewsData: function(){
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
        var quoteAPIurl = "https://api.iextrading.com/1.0/stock/market/batch?types=quote&symbols=";
        var quoteapiUrl = proxyAPI+quoteAPIurl+quotes;
        return axios.get(quoteAPIurl+quotes,
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

    watchlistQuote: function(quotes){

        //var quotes = "https://cors-anywhere.herokuapp.com/https://api.iextrading.com/1.0/stock/market/batch?symbols=aapl,fb,tsla&types=quote,news&range=1m&last=5";
        var proxyAPI = "https://cors-anywhere.herokuapp.com/";
        var wlquoteAPIurl = "https://api.iextrading.com/1.0/stock/market/batch?types=quote&symbols=";
        var wlquoteapiUrl = proxyAPI+wlquoteAPIurl+quotes;
        return axios.get(wlquoteAPIurl+quotes,
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
        return axios.get("https://api.iextrading.com/1.0/stock/market/list/gainers",
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
        return axios.get("https://api.iextrading.com/1.0/stock/market/list/losers",
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
    tickeranatomy: function(tickerVAl){
        var _toploosersurl = "https://cors-anywhere.herokuapp.com/https://api.iextrading.com/1.0/stock/"+tickerVAl+"/batch?types=quote,news,chart,stats&range=1m&last=15";
        return axios.get("https://api.iextrading.com/1.0/stock/"+tickerVAl+"/batch?types=quote,news,chart,stats&range=1m&last=15",
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
    eachNewsfeed: function(source){
    var eachnewsUrl = "https://cors-anywhere.herokuapp.com/https://newsapi.org/v2/top-headlines?sources="+source+"&apiKey=dd0675577c8744e7b7e39ace6fd37050";
    return axios.get("https://newsapi.org/v2/top-headlines?sources="+source+"&apiKey=dd0675577c8744e7b7e39ace6fd37050",
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

    getsymbolAutocomplete: function(autocompletewords){
        var autocompleteUrl = "https://cors-anywhere.herokuapp.com/http://d.yimg.com/aq/autoc?query="+autocompletewords+"&region=US&lang=en-US";
        return axios.get(autocompleteUrl,
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
}

//

