/*************************************
Data Specifics Config
*************************************/
var current = {
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
D3 Page Config
*************************************/
var margin = {top: 20, right: 20, bottom: 30, left: 40};
var width = 960 - margin.left - margin.right;
var height = 500 - margin.top - margin.bottom;



var renderNewCSVData = function(fileName, x, y, xLabel, yLabel, colorVar, toolText, radiusVar, xUnit, yUnit) {
  d3.select('svg').remove();

  var svg = d3.select("body").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


    d3.csv(fileName, function(error, csv) {

      current.data = csv;
      current.xLabel =  xLabel;
      current.yLabel = yLabel;
      current.xUnit = xUnit;
      current.yUnit = yUnit;
      current.xVar = x;
      current.yVar = y;
      current.radiusVar = radiusVar;
      current.colorVar = colorVar;
      current.toolText = toolText;
      

      current.data.forEach(function(dataPoint) { //ensure numeric
        dataPoint[current.xVar] = +dataPoint[current.xVar];
        dataPoint[current.yVar] = +dataPoint[current.yVar];
      });

      //setup x
      var xValue = function(d)  {return d[current.xVar];}; // data -> value
      var xScale = d3.scale.linear().range([0, width]); // value -> display
      var xMap = function(d) { return xScale(xValue(d));}; // data -> display
      var xAxis = d3.svg.axis().scale(xScale).orient("bottom");

      // setup y
      var yValue = function(d) { return d[current.yVar];}; // data -> value
      var yScale = d3.scale.linear().range([height, 0]); // value -> display
      var yMap = function(d) { return yScale(yValue(d));}; // data -> display
      var yAxis = d3.svg.axis().scale(yScale).orient("left");

      xScale.domain([d3.min(current.data, xValue)-1, d3.max(current.data, xValue)+1]);
      yScale.domain([d3.min(current.data, yValue)-1, d3.max(current.data, yValue)+1]);

      //setup colors
      var cValue = function(d) { return current.colorVar;};
      var color = d3.scale.category10();

      var tooltip = d3.select('body')
                        .append('div')
                        .attr('class', 'tooltip')
                        .style('opacity', 0);

      svg.append("g")
          .attr("class", "x axis")
          .attr("transform", "translate(0," + height + ")")
          .call(xAxis)
        .append("text")
          .attr("class", "label")
          .attr("x", width)
          .attr("y", -6)
          .style("text-anchor", "end")
          .text(current.xLabel);

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
          .text(current.yLabel);

      svg.selectAll(".dot")
          .data(current.data)
        .enter().append("circle")
          .attr("class", "dot")
          .attr("r", function(d) {return d[current.radiusVar]* 0.25;})
          .attr("cx", xMap)
          .attr("cy", yMap)
          .style("fill", function(d) { return color(cValue(d));})
          .on("mouseover", function(d) {
              tooltip.transition()
                   .duration(200)
                   .style("opacity", .9);
              tooltip.html(d[current.toolText])
                   .style("left", (d3.event.pageX + 5) + "px")
                   .style("top", (d3.event.pageY - 28) + "px")
          })
          .on('mouseout', function(d) {
              tooltip.transition()
                   .duration(500)
                   .style('opacity', 0);
          });
  });
};

renderNewCSVData('Cereal.csv', 'Calories', 'Protein (g)', 'Calories', 'Protein (g)', 'Sodium', 'Cereal Name', 'Calories', 'kcal');
// renderNewCSVData('waterUse.csv',"Total Population total population of area, in thousands","Public Supply population served by groundwater, in thousands", "Total Population total population of area, in thousands","Public Supply population served by groundwater, in thousands","Public Supply total population served, in thousands", "county_nm","Public Supply total population served, in thousands");
