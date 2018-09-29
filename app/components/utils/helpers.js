var axios = require('axios');

// api request
var articleQuery = function(topic, beginYear, endYear){

  var authKey = "b9f91d369ff59547cd47b931d8cbc56b:0:74623931";

  var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" + authKey + "&q=" +
                  topic + "&begin_date=" + beginYear + "0101" + "&end_date=" + endYear + "1231";


  // promise
  return new Promise(function (fulfill, reject){
    // request
    axios.get(queryURL).then(function(response) {

      var result = [];

      // return 5 articles
      if (response.data.response.docs[0]) {

        for(var i=0; i<response.data.response.docs.length; i++){
          // break loop
          if(i==5){
            break;
          }
          else {
            result.push(response.data.response.docs[i]);
          }
        }

        // return array
        fulfill(result);
        
      }
      else{
        reject("");
      }
      
    });
  });

}


// api post
var apiSave = function(articleObj){

  // work for both local host and heroku
  var apiURL = window.location.origin + '/api/saved';

  return new Promise(function (fulfill, reject){

    var params = new URLSearchParams();
    params.append("title", articleObj.title);
    params.append("date", articleObj.date);
    params.append("url", articleObj.url);
    axios.post(apiURL, params).then(function(response){

      if(response){
        fulfill(response);
      }
      else{
        reject("");
      }
      
    })

  });
  
}


// api request
var apiGet = function(){

  var apiURL = window.location.origin + '/api/saved';
  return new Promise(function (fulfill, reject){

    axios.get(apiURL).then(function(response) {

      if(response){
        fulfill(response);
      }
      else{
        reject("");
      }

    });
    
  });
  
}


var apiDelete = function(deleteArticleId){

  var apiURL = window.location.origin + '/api/delete/' + deleteArticleId;
  return new Promise(function (fulfill, reject){

    // delete mongo id
    axios.post(apiURL).then(function(response) {

      if(response){
        fulfill(response);
      }
      else{
        reject("");
      }

    });

  });

}


module.exports = {
 articleQuery,
 apiSave,
 apiGet,
 apiDelete
}
