var React = require('react');
var PropTypes = React.PropTypes;

var InfiniteWrapper = React.createClass({

  getInitialState: function() {
    return {
      startIndex: 0,
      topSpacing: 0,
      lastIndexOffset: 0,
      bottomSpacing: 0
    };
  },

  topRowToHide: function(topOffset, nodeHeight){
    var wrapper = this.refs['infiniteWrapper'];

    var offsetTop = -Math.round(topOffset);

    if (offsetTop < 0 ) {
      return 0;
    }
    var node = wrapper.childNodes[0];
    var nodeHeight = node.offsetHeight;
    var topRowToHide = Math.floor(offsetTop / nodeHeight);
    return topRowToHide;
  },

  calculateRenderState: function(){

    var wrapper = this.refs['infiniteWrapper'];
    var wrapperWidth = wrapper.offsetWidth;
    var wrapperHeight = wrapper.offsetWidth;
    var rect = wrapper.getBoundingClientRect();

    if( wrapper.childNodes.length === 0){
      return {
        startIndex: 0,
        topSpacing: 0,
        lastIndexOffset: 0,
        bottomSpacing: 0
      };
    }

    // Get First node to calculate
    var nodeCount = wrapper.childNodes.length;
    var node = wrapper.childNodes[0];

    var nodeWidth = node.offsetWidth;
    var nodeHeight = node.offsetHeight;

    // Get number of row to hide
    var topRowToHide = this.topRowToHide(rect.top, nodeWidth);

    // Number of node per row
    var nodePerRow = Math.floor(wrapperWidth / nodeWidth);

    // Checkpoint 1 :
    // - First Index to display and PaddingTop
    var startIndex = topRowToHide * nodePerRow;
    var paddingTop = topRowToHide * nodeHeight;


    // Calculate Bottom off screen content
    // = viewport height - offsetHeight
    var viewportHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
    var offScreenBottom = rect.bottom - viewportHeight;
    offScreenBottom = offScreenBottom >= 0 ? Math.round(offScreenBottom) : 0;

    var bottomRowToHide = Math.floor(offScreenBottom / nodeHeight) - 1;
    bottomRowToHide = bottomRowToHide >= 0 ? bottomRowToHide : 0;

    // Checkpoint 2 :
    // - bottom index offset to hide and paddingBottom
    var paddingBottom = bottomRowToHide * nodeHeight;
    var bottomItemToHide = nodePerRow * bottomRowToHide;

    // console.log('================================');
    // console.log('startIndex', startIndex);
    // console.log('paddingTop', paddingTop);
    // console.log('nodePerRow',nodePerRow);
    // console.log('offScreenBottom',offScreenBottom);
    // console.log('bottomRowToHide',bottomRowToHide)
    // console.log('paddingBottom',paddingBottom);
    // console.log('bottomItemToHide',bottomItemToHide);

    return {
      startIndex: startIndex,
      topSpacing: paddingTop,
      lastIndexOffset: bottomItemToHide,
      bottomSpacing: paddingBottom
    };
  },

  handleScroll: function(e){
    var state = this.calculateRenderState();
    this.setState(state)
  },

  handleResize: function(e){
    var viewportHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
    this.setState(this.calculateRenderState);
  },

  componentDidMount: function() {
    window.addEventListener('scroll',this.handleScroll);
    window.addEventListener('resize', this.handleResize);
    var state = this.calculateRenderState();
    this.setState(state)
  },

  componentWillUnmount: function() {
    window.removeEventListener('scroll', this.handleScroll)
    window.removeEventListener('resize', this.handleResize);
  },

  shouldComponentUpdate: function(nextProps, nextState) {
    if (JSON.stringify(nextState) === JSON.stringify(this.state)){
      return false;
    }

    return true;
  },

  render: function() {

    var children = this.props.children || [];
    var lastIndex = children.length - this.state.lastIndexOffset;
    var inScreenChilden = children.slice(this.state.startIndex, lastIndex);

    var style = {
      paddingTop:this.state.topSpacing,
      paddingBottom: this.state.bottomSpacing
    }

    return (
      <div className='cf' ref='infiniteWrapper' style={style}>
        {inScreenChilden}
      </div>
    );
  }

});

module.exports = InfiniteWrapper;
