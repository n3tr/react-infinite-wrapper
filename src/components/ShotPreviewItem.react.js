var React = require('react');
var PropTypes = React.PropTypes;

var ShotPreviewItem = React.createClass({

  render: function() {
    return (
      <div className='shot-preview'>
        <div className='shot-preview--content'>
          <div className='shot-preview--image'>
            <img src='https://d13yacurqjgara.cloudfront.net/users/417531/screenshots/2339037/day2_small_1x.png'/>
          </div>
          <h2 className='shot-preview--title'>Hello</h2>
        </div>

      </div>
    );
  }

});

module.exports = ShotPreviewItem;
