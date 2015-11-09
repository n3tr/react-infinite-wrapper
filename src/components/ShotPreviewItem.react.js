var React = require('react');
var PropTypes = React.PropTypes;

var ShotPreviewItem = React.createClass({

  render: function() {
    return (
      <div className='shot-preview'>
        <div className='shot-preview--content'>
          <div className='shot-preview--image'>
            <img src={this.props.shot.images.normal}></img>
          </div>
          <h2 className='shot-preview--title'>{this.props.shot.title}</h2>
        </div>

      </div>
    );
  }

});

module.exports = ShotPreviewItem;
