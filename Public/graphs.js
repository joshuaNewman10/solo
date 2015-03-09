/************************************
Data
*************************************/
var fakeData = [
  {county: 'San Francisco', year: 2000, waterUse: {agriculture: 0.27, people: 0.25, industry: 0.28}},
  {county: 'San Francisco', year: 2005, waterUse: {agriculture: 0.27, people: 0.25, industry: 0.28}},
  {county: 'Los Angeles', year: 2000, waterUse: {agriculture: 0.22, people: 0.32, industry: 0.44}},
  {county: 'Los Angeles', year: 2005, waterUse: {agriculture: 0.32, people: 0.32, industry: 0.44}},
  {county: 'Sacramento', year: 2000, waterUse: {agriculture: 0.20, people: 0.42, industry: 0.24}},
  {county: 'Sacramento', year: 2005, waterUse: {agriculture: 0.17, people: 0.42, industry: 0.34}}
];


/************************************
D3 Config
*************************************/
var config = {
  margin: {top: 20, right: 20, bottom:30, left: 40},
};
config.width = 960 - config.margin.left - config.margin.right,
config.height = 500 - config.margin.top - config.margin.bottom



var xValue; // data-->value
var xScale = d3.scale.linear().range([0, config.width]); //value-->display
var xMap = function(d) {return xScale(xValue(d))}; //data-->display
var xAxis = d3.svg.axis().scale(xScale).orient('bottom');

var yValue; // data-->value
var yScale = d3.scale.linear().range([0, config.width]); //value-->display
var yMap = function(d) {return yScale(yValue(d))}; //data-->display
var yAxis = d3.svg.axis().scale(xScale).orient('bottom');

var cValue = function(d) {return d.waterUse.agriculture;};
var color = d3.scaleCategory10();


/************************************
SVG Config
*************************************/
var svg = d3.select('.chart').append('svg')
            .attr('width', config.width + config.margin.left + config.margin.right)
            .attr('height', config.height + config.margin.top + config.margin.bottom)
            .append('g')
            .attr('transform', 'translate(' + config.margin.left + ',' + config.margin.top + ')');

