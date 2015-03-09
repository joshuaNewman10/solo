/*************************************
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


/*************************************
D3 Config
*************************************/
var config = {
  margin: {top: 20, right: 20, bottom:30, left: 40},
};
config.width = 960 - config.margin.left - config.margin.right;
config.height = 500 - config.margin.top - config.margin.bottom;



var xValue = function(d) {return d.waterUse.agriculture;}// data-->value
var xScale = d3.scale.linear().range([0, config.width]); //value-->display
var xMap = function(d) {return xScale(xValue(d))}; //data-->display
var xAxis = d3.svg.axis().scale(xScale).orient('bottom');

var yValue = function(d) {return d.waterUse.people;};// data-->value
var yScale = d3.scale.linear().range([config.height, 0]); //value-->display
var yMap = function(d) {return yScale(yValue(d))}; //data-->display
var yAxis = d3.svg.axis().scale(yScale).orient('left');

var cValue = function(d) {return d.waterUse.agriculture;};
// var color = d3.scaleCategory10();


/*************************************
SVG Config
*************************************/
var svg = d3.select('.chart').append('svg')
            .attr('width', config.width + config.margin.left + config.margin.right)
            .attr('height', config.height + config.margin.top + config.margin.bottom);
            // .append('g')
            // .attr('transform', 'translate(' + config.margin.left + ',' + config.margin.top + ')');


/*************************************
Tooltip Config
*************************************/

var tooltip = d3.select('.chart')
                .append('div')
                .attr('class', 'tooltip')
                .style('opacity', 0);



/*************************************
Data Config
*************************************/
var dataPoints = svg.selectAll('.dot')
                    .data(fakeData)
                    .enter()
                    .append('circle')
                    .attr('r', 3.5 + 'px')
                    .attr('cx', 800 + 'px')
                    .attr('cy', 600 + 'px');

/*************************************
Axes Config
*************************************/
// xScale.domain([d3.min(fakeData, xValue)-1, d3.max(fakeData, xValue)+1]);
// yScale.domain([d3.min(fakeData, yValue)-1, d3.max(fakeData, yValue)+1]);

// x-axis
  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(40," + config.height + ")")
      .call(xAxis)
    .append("text")
      .attr("class", "label")
      .attr("x", config.width)
      .attr("y", -6)
      .style("text-anchor", "end")
      .text("X Axis");

  // y-axis
  svg.append("g")
      .attr("class", "y axis")
      .attr('transform', 'translate(40,0)')
      .call(yAxis)
    .append("text")
      .attr("class", "label")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Y Axis");

/*************************************
Legend Config
*************************************/


