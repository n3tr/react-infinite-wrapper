var React = require('react');
var PropTypes = React.PropTypes;

var EndlessContainer = require('./EndlessContainer.react');
var ShotPreviewItem = require('./ShotPreviewItem.react');
var request = require('superagent');

var DribbbleView = React.createClass({
  currentPage: 1,
  currentRequest: null,

  getInitialState: function() {
    return {
      shots: []
    };
  },

  componentDidMount: function() {
    this.fetchDataForPage(this.currentPage);

  },

  render: function() {
    // console.log(this.state);

    return (
      <div className='wrapper'>
        <h1>
          DribbbleView
        </h1>
        <EndlessContainer
          itemWidth={240}
          itemHeight={214}
          itemCount={this.state.shots.length}
          itemPerRow={4}
          elementAtIndex={this.elementAtIndex}
          onScrollToBottom={this.onScrollToBottom}/>
      </div>
    );
  },
  elementAtIndex: function(index){
    return <ShotPreviewItem shot={this.state.shots[index]} key={index} />
  },
  onScrollToBottom: function(){
    this.fetchDataForPage(this.currentPage);
  },
  fetchDataForPage: function(page){
    if (this.currentRequest) {
      return;
    }
    var url = 'https://api.dribbble.com/v1/shots?page=' + page + '&access_token=be3f0f2486a6ac9f88679c5514bf06a4c41287e8a4600f367e50390bbeb5f704'
    var self = this;

    this.currentRequest = request.get(url).end(function(err, res){
      self.setState({
        shots: self.state.shots.concat(res.body)
      });
      self.currentPage++;
      self.currentRequest = null;
    });
  }

});

module.exports = DribbbleView;
