
var DribbbleView = require('./components/DribbbleViewV2.react');
var React = require('react');
var ReactDOM = require('react-dom');
var Stats = require('stats.js');

ReactDOM.render(<DribbbleView/>, document.getElementById('app'))


/// Render Stats
var stats = new Stats();
stats.setMode( 0 ); // 0: fps, 1: ms, 2: mb

// align top-left
stats.domElement.style.position = 'fixed';
stats.domElement.style.left = '0px';
stats.domElement.style.top = '0px';

document.body.appendChild( stats.domElement );

var update = function () {

    stats.begin();

    // monitored code goes here

    stats.end();

    requestAnimationFrame( update );

};

requestAnimationFrame( update );
