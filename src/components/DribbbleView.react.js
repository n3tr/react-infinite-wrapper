var React = require('react');
var PropTypes = React.PropTypes;

var InfiniteWrapper = require('./InfiniteWrapper.react');
var ShotPreviewItem = require('./ShotPreviewItem.react');

var DribbbleView = React.createClass({

  render: function() {
    var shotPreviews = [];
    for (var i = 0; i < 1000; i++) {
      shotPreviews.push(<ShotPreviewItem key={i} />);
    }

    return (
      <div className='wrapper'>
        <h1>
          DribbbleView
        </h1>
        <InfiniteWrapper>
          {shotPreviews}
        </InfiniteWrapper>
      </div>
    );
  }

});

module.exports = DribbbleView;
