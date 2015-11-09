var React = require('react');
var PropTypes = React.PropTypes;

var ShotPreviewItem = React.createClass({

  componentDidMount: function() {
    // var imageEl = this.refs['img-thumb'];
    // var imageSrc = imageEl.getAttribute("data-src");
    // imageEl.src = imageSrc;
  },

  render: function() {

    var shotUrl = this.props.shot.images.normal;
    return (
      <div className='shot-preview'>
        <div className='shot-preview--content'>
          <div className='shot-preview--image'>
            <img src={shotUrl} ref='img-thumb'></img>
          </div>
          <h2 className='shot-preview--title'>{this.props.shot.title}</h2>
        </div>

      </div>
    );
  }

});

module.exports = ShotPreviewItem;
