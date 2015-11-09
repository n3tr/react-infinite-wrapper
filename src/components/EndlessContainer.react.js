var React = require('react');
var PropTypes = React.PropTypes;

var EndlessContainer = React.createClass({

  firstLoad: true,
  getInitialState: function() {
    return {
      firstIndex: 0,
      lastIndex: this.props.itemCount < 24 ? this.props.itemCount : 24,
      paddingTop: 0,
      paddingBottom: 0,
      itemWidth: this.props.itemWidth,
      itemHeight: this.props.itemHeight,
      itemCount: this.props.itemCount,
      itemPerRow: this.props.itemPerRow
    };
  },

  recalculateViewport: function(){

    var firstIndex;
    var lastIndex;
    var paddingTop;
    var paddingBottom;

    var numberOfRow = Math.ceil(this.state.itemCount /  this.state.itemPerRow);

    var containner = this.refs['endless-containner'];
    var itemWidth = this.state.itemWidth;
    var itemHeight = this.state.itemHeight;
    var itemCount = this.state.itemCount;
    var itemPerRow = this.state.itemPerRow;

    // Calculate first index by container's top offsest
    var containerRect = containner.getBoundingClientRect();
    var offsetTop = containerRect.top;
    offsetTop = -Math.round(offsetTop);
    if (offsetTop < 0) {
      firstIndex = 0;
      paddingTop = 0;
    }else{
      var topRowToHide = Math.floor(offsetTop / itemHeight) - 1;
      topRowToHide = topRowToHide >= 0 ? topRowToHide : 0;
      paddingTop = topRowToHide * itemHeight;
      firstIndex = topRowToHide * itemPerRow;
    }

    var viewportHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0)

    if (this.firstLoad){
      this.firstLoad = false;
      var numRowCanBeFill = Math.ceil(viewportHeight / itemHeight);
      lastIndex = firstIndex + (numRowCanBeFill * itemPerRow);
      lastIndex = lastIndex < itemCount ? lastIndex : itemCount;
      paddingBottom = ((itemCount - lastIndex) / itemPerRow) * itemHeight;

    }else{
      // Calculate lastIndex
      var bottomOffset = containerRect.bottom - viewportHeight;
      bottomOffset = bottomOffset >= 0 ? Math.round(bottomOffset) : 0;

      var bottomRowToHide = Math.floor(bottomOffset / itemHeight) -1
      bottomRowToHide = bottomRowToHide >= 0 ? bottomRowToHide : 0;

      lastIndex = itemCount - (itemPerRow * bottomRowToHide);
      paddingBottom = bottomRowToHide * itemHeight;
    }

    return {
      firstIndex: firstIndex,
      lastIndex: lastIndex,
      paddingTop: paddingTop,
      paddingBottom: paddingBottom
    };


  },

  handleScroll: function(){
    var containner = this.refs['endless-containner'];
    var containerRect = containner.getBoundingClientRect();
    var viewportHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
    var bottomOffset = containerRect.bottom - viewportHeight;
    if (bottomOffset < this.state.itemHeight * 2) {
      this.props.onScrollToBottom()
    }

    this.setState(this.recalculateViewport());
  },

  componentDidMount: function() {
    window.addEventListener('scroll',this.handleScroll);
    window.addEventListener('resize', this.handleScroll);
    this.recalculateViewport();
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

    this.setState({
      lastIndex: this.state.lastIndex !== 0 ? this.state.lastIndex : nextProps.itemCount,
      itemWidth: nextProps.itemWidth,
      itemHeight: nextProps.itemHeight,
      itemCount: nextProps.itemCount,
      itemPerRow: nextProps.itemPerRow
    });
    // this.recalculateViewport();
  },

  render: function() {

    var count = this.state.itemCount;
    var firstIndex = this.state.firstIndex;
    var lastIndex = this.state.lastIndex;

    var el = [];
    for (var i = firstIndex; i < lastIndex; i++) {
      var item = this.props.elementAtIndex(i);
      el.push(item);
    }

    var style = {
      paddingTop: this.state.paddingTop,
      paddingBottom: this.state.paddingBottom
    }


    // console.log(el.length);

    return (
      <div className='cf endless-containner' ref='endless-containner' style={style}>
        {el}
      </div>
    );
  }

});

module.exports = EndlessContainer;
