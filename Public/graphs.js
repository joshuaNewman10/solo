/*************************************
Data
*************************************/
var fakeData = [
  {county: 'San Francisco', year: 2000, waterUse: 200, population: 10},
  {county: 'San Francisco', year: 2005, waterUse: 217, population: 20},
  {county: 'Los Angeles', year: 2000, waterUse: 222, population: 5},
  {county: 'Los Angeles', year: 2005, waterUse: 300, population: 8},
  {county: 'Sacramento', year: 2000, waterUse: 476, population: 17},
  {county: 'Sacramento', year: 2005, waterUse: 520, population: 26}
];


/*************************************
Data Specifics Config
*************************************/
var currentData = {
  data: undefined,
  xLabel: '',
  yLabel: '',
  xUnit: '',
  yUnit: '',
  xVar: '',
  yVar: '',
  colorVar: ''
};

/*************************************
D3 Config
*************************************/
var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var xValue = function(d) { return d.population;}, // data -> value
    xScale = d3.scale.linear().range([0, width]), // value -> display
    xMap = function(d) { return xScale(xValue(d));}, // data -> display
    xAxis = d3.svg.axis().scale(xScale).orient("bottom");

// setup y
var yValue = function(d) { return d.waterUse;}, // data -> value
    yScale = d3.scale.linear().range([height, 0]), // value -> display
    yMap = function(d) { return yScale(yValue(d));}, // data -> display
    yAxis = d3.svg.axis().scale(yScale).orient("left");

var cValue = function(d) { return d.year;},
    color = d3.scale.category10();

/*************************************
SVG Config
*************************************/
var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


/*************************************
Tooltip Config
*************************************/

var tooltip = d3.select('.chart')
                .append('div')
                .attr('class', 'tooltip')
                .style('opacity', 0);




/*************************************
Axes Config
*************************************/
xScale.domain([d3.min(fakeData, xValue)-1, d3.max(fakeData, xValue)+1]);
yScale.domain([d3.min(fakeData, yValue)-1, d3.max(fakeData, yValue)+1]);


/*************************************
Data Config
*************************************/
var renderFakeData = function() {
  svg.selectAll(".dot")
      .data(fakeData)
    .enter().append("circle")
      .attr("class", "dot")
      .attr("r", function(d) {return 0.1 * d.waterUse;})
      .attr("cx", xMap)
      .attr("cy", yMap)
      .style("fill", function(d) { return color(cValue(d));})
      .on("mouseover", function(d) {
          tooltip.transition()
               .duration(200)
               .style("opacity", .9);
          tooltip.html(d.county + "<br/> (" + xValue(d)
          + ", " + yValue(d) + ")")
               .style("left", (d3.event.pageX + 5) + "px")
               .style("top", (d3.event.pageY - 28) + "px");
      })
      .on("mouseout", function(d) {
          tooltip.transition()
               .duration(500)
               .style("opacity", 0);
      });
};

var renderTempData = function(fileName, x, y, xLabel, yLabel, colorVar) {
    d3.csv(fileName, function(error, csv) {
      currentData.data = csv;
      currentData.xVar = x;
      currentData.yVar = y;
      csv.forEach(function(dataPoint) { //ensure numeric
        dataPoint[x] = +dataPoint[x]
        dataPoint[y] = +dataPoint[y];
      });

      xScale.domain([d3.min(csv, xValue) -1, d3.max(csv, xValue) +1]);
      yScale.domain([d3.min(csv, yValue) -1], d3.max(csv, yValue) +1);

      svg.selectAll(".dot")
          .data(csv)
        .enter().append("circle")
          .attr("class", "dot")
          .attr("r", 3.5)
          .attr("cx", xMap)
          .attr("cy", yMap)
          .style("fill", function(d) { return color(cValue(d));})
          .on("mouseover", function(d) {
              tooltip.transition()
                   .duration(200)
                   .style("opacity", .9);
              tooltip.html(d['Cereal Name'] + "<br/> (" + xValue(d)
              + ", " + yValue(d) + ")")
                   .style("left", (d3.event.pageX + 5) + "px")
                   .style("top", (d3.event.pageY - 28) + "px");
          })
          .on('mouseout', function(d) {
              tooltip.transition()
                   .duration(500)
                   .style('opacity', 0);
          });
  });
};
/*************************************
Legend
*************************************/
  var legend = svg.selectAll(".legend")
      .data(fakeData)
    .enter().append("g")
      .attr("class", "legend")
      .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

  // draw legend colored rectangles
  legend.append("rect")
      .attr("x", width - 18)
      .attr("width", 18)
      .attr("height", 18)
      .style("fill", color);

  // draw legend text
  legend.append("text")
      .attr("x", width - 24)
      .attr("y", 9)
      .attr("dy", ".35em")
      .style("text-anchor", "end")
      .text(function(d) { return d.county + ' ' + d.year;});

/*************************************
Axes
*************************************/
  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
    .append("text")
      .attr("class", "label")
      .attr("x", width)
      .attr("y", -6)
      .style("text-anchor", "end")
      .text("Population");

  // y-axis
  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("class", "label")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Water Use");
