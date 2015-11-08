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

  calculateRenderState: function(){
    var firstIndex = 0;
    var wrapper = this.refs['infiniteWrapper'];
    var rect = wrapper.getBoundingClientRect();
    var offsetTop = -Math.round(rect.top);



    if (offsetTop < 0 || wrapper.childNodes.length === 0) {
      return {
        startIndex: 0,
        topSpacing: 0
      }
    }

    var wrapperWidth = wrapper.offsetWidth;
    var firstNode = wrapper.childNodes[0];
    var nodeWidth = firstNode.offsetWidth;
    var nodeHeight = firstNode.offsetHeight;

    // Compute row height
    var rowToHide = Math.floor(offsetTop / nodeHeight);
    var nodePerRow = wrapperWidth / nodeWidth;

    // First Index to display
    var firstIndex = nodePerRow * rowToHide;


    // Offset Screen Bottom Height
    // = viewport height - offsetHeight
    var viewportHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
    var contentOffsetBottom = rect.bottom - viewportHeight;
    contentOffsetBottom = contentOffsetBottom > 0 ? Math.round(contentOffsetBottom) : 0;

    var bottomRowToHide = Math.floor(contentOffsetBottom / nodeHeight);
    var lastIndexOffset = nodePerRow * bottomRowToHide;



    return {
      startIndex: firstIndex,
      topSpacing: rowToHide * nodeHeight,
      lastIndexOffset: lastIndexOffset,
      bottomSpacing: bottomRowToHide * nodeHeight
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
    window.addEventListener('scroll',this.handleScroll)
    window.addEventListener('resize', this.handleResize);
  },

  componentWillUnmount: function() {
    window.removeEventListener('scroll', this.handleScroll)
    window.removeEventListener('resize', this.handleResize);
  },

  componentDidUpdate: function(prevProps, prevState) {
  },

  shouldComponentUpdate: function(nextProps, nextState) {
    if (JSON.stringify(nextState) === JSON.stringify(this.state)){
      return false;
    }

    return true;

  },


  render: function() {

    var children = this.props.children || [];
    // console.log(children.h);
    var inScreenChilden = children.slice(this.state.startIndex, children.length - this.state.lastIndexOffset);

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
