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
  colorVar: '',
  legendText: '',
};



/*************************************
D3 Config
*************************************/
var margin = {top: 20, right: 20, bottom: 30, left: 40};
var width = 960 - margin.left - margin.right;
var height = 500 - margin.top - margin.bottom;

//setup x
var xValue = function(d)  {return currentData.xVar;}; // data -> value
var xScale = d3.scale.linear().range([0, width]); // value -> display
var xMap = function(d) { return xScale(xValue(d));}; // data -> display
var xAxis = d3.svg.axis().scale(xScale).orient("bottom");

// setup y
var yValue = function(d) { return currentData.yVar;}; // data -> value
var yScale = d3.scale.linear().range([height, 0]); // value -> display
var yMap = function(d) { return yScale(yValue(d));}; // data -> display
var yAxis = d3.svg.axis().scale(yScale).orient("left");

xScale.domain([d3.min(fakeData, xValue)-1, d3.max(fakeData, xValue)+1]);
yScale.domain([d3.min(fakeData, yValue)-1, d3.max(fakeData, yValue)+1]);

//setup colors
var cValue = function(d) { return currentData.colorVar;};
var color = d3.scale.category10();

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

  var tooltip = d3.select('body')
                  .append('div')
                  .attr('class', 'tooltip')
                  .style('opacity', 0);

/*************************************
Legend
*************************************/
var updateLegend = function(data) {
  console.log(data, 'what');
  var legend = svg.selectAll(".legend")
      .data(data)
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
      .text(currentData.legendText)
};

/*************************************
Axes
*************************************/
var updateAxes = function() {
  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
    .append("text")
      .attr("class", "label")
      .attr("x", width)
      .attr("y", -6)
      .style("text-anchor", "end")
      .text(currentData.xLabel);

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
      .text(currentData.yLabel);
};

/*************************************
Data Config
*************************************/
var renderFakeData = function() {

  currentData.data = fakeData;
  currentData.xLabel =  'Population';
  currentData.yLabel = 'Water Use';
  currentData.xUnit = 'Millions of People';
  currentData.yUnit = 'Alot of water';
  currentData.xVar = 'population';
  currentData.yVar = 'waterUse';
  currentData.colorVar = 'waterUse';
  currentData.legendText = function(d) {return d.county + ' ' + d.year;};


  var xValue = function(d)  {return d[currentData.xVar];}; // data -> value
  var xScale = d3.scale.linear().range([0, width]); // value -> display
  var xMap = function(d) { return xScale(xValue(d));}; // data -> display

  // setup y
  var yValue = function(d) { return d[currentData.yVar];}; // data -> value
  var yScale = d3.scale.linear().range([height, 0]); // value -> display
  var yMap = function(d) { return yScale(yValue(d));}; // data -> display

  xScale.domain([d3.min(fakeData, xValue)-1, d3.max(fakeData, xValue)+1]);
  yScale.domain([d3.min(fakeData, yValue)-1, d3.max(fakeData, yValue)+1]);


  svg.selectAll(".dot")
      .data(fakeData)
      .enter()
      .append("circle")
      .attr("class", "dot")
      .attr("r", function(d) {return 1 * d[currentData.xVar];})
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
      updateLegend(fakeData);
      updateAxes();
};

var renderCSVData = function(fileName, x, y, xLabel, yLabel, colorVar, legendText, xUnit, yUnit) {
    d3.csv(fileName, function(error, csv) {

      currentData.data = csv;
      currentData.xLabel =  xLabel;
      currentData.yLabel = yLabel;
      currentData.xUnit = xUnit;
      currentData.yUnit = yUnit;
      currentData.xVar = x;
      currentData.yVar = y;
      currentData.colorVar = colorVar;
      currentData.legendText = legendText;


      currentData.data.forEach(function(dataPoint) { //ensure numeric
        dataPoint[currentData.xVar] = +dataPoint[currentData.xVar]
        dataPoint[currentData.yVar] = +dataPoint[currentData.yVar]
      });


      var xValue = function(d)  {return d[currentData.xVar];}; // data -> value
      var xScale = d3.scale.linear().range([0, width]); // value -> display
      var xMap = function(d) { return xScale(xValue(d));}; // data -> display

      // setup y
      var yValue = function(d) { return d[currentData.yVar];}; // data -> value
      var yScale = d3.scale.linear().range([height, 0]); // value -> display
      var yMap = function(d) { return yScale(yValue(d));}; // data -> display

      xScale.domain([d3.min(currentData.data, xValue)-1, d3.max(currentData.data, xValue)+1]);
      yScale.domain([d3.min(currentData.data, yValue)-1, d3.max(currentData.data, yValue)+1]);

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
          updateLegend(csv);
          updateAxes();
  });

};

renderFakeData();
// renderCSVData('Cereal.csv', 'Calories', 'Protein (g)', 'Calories', 'Protein (g)', 'Sodium', 'Food Name', 'g', 'kcal');
renderCSVData('waterUseCSV.csv',"Total Population total population of area, in thousands","Public Supply population served by groundwater, in thousands", "Total Population total population of area, in thousands","Public Supply population served by groundwater, in thousands","Public Supply total population served, in thousands" );
