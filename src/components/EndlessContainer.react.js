var React = require('react');
var PropTypes = React.PropTypes;

var EndlessContainer = React.createClass({

  firstLoad: true,
  getInitialState: function() {
    return {
      startIndex: 0,
      itemInViewport: this.props.itemCount < 20 ? this.props.itemCount : 20,
      paddingTop: 0,
      paddingBottom: 0,
      containerHeight: Math.ceil(this.props.itemCount / this.props.itemPerRow) * this.props.itemHeight,
      itemWidth: this.props.itemWidth,
      itemHeight: this.props.itemHeight,
      itemCount: this.props.itemCount,
      itemPerRow: this.props.itemPerRow
    };
  },

  recalculateViewport: function(state){
    
    var startIndex;
    var itemInViewport;
    var containerHeight
    var paddingTop;
    var paddingBottom;

    var container = this.refs['endless-containner'];
    var containerRect = container.getBoundingClientRect();
    var containnerWidth = container.offsetWidth;
    var sampleNode = container.childNodes[0];
    var itemCount = state.itemCount;

    var itemWidth = sampleNode ? sampleNode.offsetWidth : state.itemHeight;
    var itemHeight = sampleNode ? sampleNode.offsetHeight : state.itemWidth;

    var itemPerRow = Math.floor(containnerWidth / itemWidth);
    var totalRow = Math.ceil(itemCount / itemPerRow);

    // Calculate first index by container's top offsest
    var offsetTop = -containerRect.top;
    var topRowToHide;
    if (offsetTop > 0) {
      topRowToHide = Math.floor(offsetTop / itemHeight) - 1;
      topRowToHide = topRowToHide >= 0 ? topRowToHide : 0;
      paddingTop = topRowToHide * itemHeight;
      startIndex = topRowToHide * itemPerRow;
    }else{
      topRowToHide = 0;
      startIndex = 0;
      paddingTop = 0;
    }


    // Calcualte lastIndex to be display
    var viewportHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    var rowInViewPort = Math.ceil(viewportHeight / itemHeight) + 2; // Always add bottom row

    var itemInViewport = rowInViewPort * itemPerRow;
    var bottomRowToHide = totalRow - (topRowToHide + rowInViewPort);
    var paddingBottom = bottomRowToHide * itemWidth;
    paddingBottom = paddingBottom >= 0 ? paddingBottom : 0;

    var newState =  {
      startIndex: startIndex,
      itemInViewport: itemInViewport,
      paddingTop: paddingTop,
      paddingBottom: paddingBottom,
      containerHeight: totalRow * itemHeight,
      itemWidth: state.itemWidth,
      itemHeight: state.itemHeight,
      itemCount: state.itemCount,
      itemPerRow: state.itemPerRow
    }

    return newState;

  },

  handleScroll: function(){

    var containner = this.refs['endless-containner'];
    var containerRect = containner.getBoundingClientRect();

    var viewportHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
    var bottomOffset = containerRect.bottom - viewportHeight;
    if (bottomOffset < this.state.itemHeight * 2) {
      this.props.onScrollToBottom()
    }

    this.setState(this.recalculateViewport(this.state));
  },

  componentDidMount: function() {
    window.addEventListener('scroll',this.handleScroll);
    window.addEventListener('resize', this.handleScroll);
      this.setState(this.recalculateViewport(this.state));
  },

  // componentDidUpdate: function(prevProps, prevState) {
  //   this.recalculateViewport();
  // },

  shouldComponentUpdate: function(nextProps, nextState) {
    //
    // if (JSON.stringify(nextProps) !== JSON.stringify(this.props)){
    //   // console.log(nextProps);
    //   return true;
    // }

    if (JSON.stringify(nextState) === JSON.stringify(this.state)){

      return false;
    }

    return true;
  },

  componentWillReceiveProps: function(nextProps) {
    this.setState(this.recalculateViewport(nextProps));
  },



  render: function() {

    var itemCount = this.state.itemCount;
    var startIndex = this.state.startIndex;


    var el = [];
    for (var i = startIndex; i < startIndex + this.state.itemInViewport && i < itemCount; i++) {
      var item = this.props.elementAtIndex(i);
      el.push(item);
    }

    var style = {
      paddingTop: this.state.paddingTop,
      paddingBottom: this.state.paddingBottom,
      height:this.state.containerHeight,
      boxSizing: 'border-box'
    }

    console.log(this.state);

    return (
      <div className='cf endless-containner' ref='endless-containner' style={style}>
        {el}
      </div>
    );
  }

});

module.exports = EndlessContainer;
