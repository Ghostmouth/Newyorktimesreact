var React = require("react");
var Query = require("./Query.jsx");
var Search = require("./Search.jsx");
var Saved = require("./Saved.jsx");
var helpers = require("../utils/helpers.js");
var Main = React.createClass({

  // set state
  getInitialState: function() {
    return {
      apiResults: [],
      mongoResults: [],
      searchTerms: ["","",""]
    };
  },

  // allows child to update parent
  _setSearchFeilds: function(topic, start, end) {
    this.setState({ searchTerms: [topic, start, end] });
  },

  // child update mongo
  _resetMongoResults: function(newData){
    this.setState({ mongoResults: newData} );
  },

  // collect saved article
  componentDidMount: function() {

    // hits API
    helpers.apiGet().then(function(query){
      this.setState({mongoResults: query.data});
    }.bind(this));
  },


  // update changes
  componentDidUpdate: function(prevProps, prevState) {
    if(this.state.searchTerms != prevState.searchTerms){
      helpers.articleQuery(this.state.searchTerms[0], this.state.searchTerms[1], this.state.searchTerms[2]).then(function(data) {
        this.setState({ apiResults: data });
      }.bind(this));
    }

  },


  // render function
  render: function() {
    return (

      <div className="container" style={ {backgroundColor: "white", borderStyle: "solid", borderWidth: "1px"} }>

        <div className="page-header">
          <h1 className="text-center"><img style={ {width: "70%"} } src="img/nyt-header.svg" alt="The New York Times"/></h1>
          <h2 className="text-center" style={ {marginTop: "-12px"} }><b><i>A React Rendition</i></b></h2>
          <h4 className="text-center">Search for and annotate articles of interest. Click on headlines to learn more.</h4>
        </div>

        <Query _setSearchFeilds={this._setSearchFeilds} />
        <Search apiResults={this.state.apiResults} _resetMongoResults={this._resetMongoResults} />
        <Saved mongoResults={this.state.mongoResults} _resetMongoResults={this._resetMongoResults} />

      </div>

    );
  }
});

module.exports = Main;