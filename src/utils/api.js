var axios = require('axios');
//import axios from 'axios';

module.exports = {
    fetchStockData: function(){
        var apiUrl = "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=MSFT&interval=1min&apikey=demo";

        /*
        const options = {
            method: 'GET',
            headers: { },
            apiUrl,
        };
        */
        return axios.get(apiUrl,
            {
                headers: ""
            },
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


