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
var margin = {top: 20, right: 20, bottom: 30, left: 200};
var width = 960 - margin.left - margin.right;
var height = 500 - margin.top - margin.bottom;


/*************************************
Render Data From CSV
*************************************/
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
      current.rVar = radiusVar;
      current.colorVar = colorVar;
      current.toolText = toolText;
      

      current.data.forEach(function(dataPoint) { //ensure numeric
        dataPoint[current.xVar] = +dataPoint[current.xVar];
        dataPoint[current.yVar] = +dataPoint[current.yVar];
        dataPoint[current.rVar] = +dataPoint[current.rVar];
      });
     
      var minRadius = d3.min(current.data, function(d) {
        return d[current.rVar];
      });
      var maxRadius = d3.max(current.data, function(d) {
        return d[current.rVar];
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

      var rValue = function(d) {return d[current.rVar];};
      var rMap = function(d) {return rScale(rValue(d));};
      var rScale = d3.scale.linear()
                           .domain([minRadius, maxRadius])
                           .range([4, 20]); 

      xScale.domain([d3.min(current.data, xValue)-1, d3.max(current.data, xValue)+1]);
      yScale.domain([d3.min(current.data, yValue)-1, d3.max(current.data, yValue)+1]);

      //setup colors
      var cValue = function(d) { return d[current.colorVar];};
      // var color = d3.scale.category10();
      var color = d3.scale.linear()
          .domain([minRadius, (minRadius + maxRadius)/2, maxRadius])
          .range(["lightblue", "blue", "red"]);
          console.log(minRadius, (minRadius + maxRadius)/2, maxRadius);
          // .range(["lightblue", "blue", "red"]);

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
          .attr("r", rMap)
          .attr("cx", 0)
          .attr("cy", 400)
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
          svg.selectAll(".dot").transition().duration(1000)
                      .attr("cx", xMap)
                      .attr("cy", yMap);

  });

};

/*************************************
Render Data From Server
*************************************/
var renderServerData = function(fileName, x, y, xLabel, yLabel, colorVar, toolText, radiusVar, xUnit, yUnit) {
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
      current.rVar = radiusVar;
      current.colorVar = colorVar;
      current.toolText = toolText;
      

      current.data.forEach(function(dataPoint) { //ensure numeric
        dataPoint[current.xVar] = +dataPoint[current.xVar];
        dataPoint[current.yVar] = +dataPoint[current.yVar];
        dataPoint[current.rVar] = +dataPoint[current.rVar];
      });
     
      var minRadius = d3.min(current.data, function(d) {
        return d[current.rVar];
      });
      var maxRadius = d3.max(current.data, function(d) {
        return d[current.rVar];
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

      var rValue = function(d) {return d[current.rVar];};
      var rMap = function(d) {return rScale(rValue(d));};
      var rScale = d3.scale.linear()
                           .domain([minRadius, maxRadius])
                           .range([4, 20]); 

      xScale.domain([d3.min(current.data, xValue)-1, d3.max(current.data, xValue)+1]);
      yScale.domain([d3.min(current.data, yValue)-1, d3.max(current.data, yValue)+1]);

      //setup colors
      var cValue = function(d) { return d[current.colorVar];};
      // var color = d3.scale.category10();
      var color = d3.scale.linear()
          .domain([minRadius, (minRadius + maxRadius)/2, maxRadius])
          .range(["lightblue", "blue", "red"]);
          console.log(minRadius, (minRadius + maxRadius)/2, maxRadius);
          // .range(["lightblue", "blue", "red"]);

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
          .attr("r", rMap)
          .attr("cx", 0)
          .attr("cy", 400)
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
          svg.selectAll(".dot").transition().duration(1000)
                      .attr("cx", xMap)
                      .attr("cy", yMap);

  });

};
/*************************************
Specific CSV Rendering
*************************************/
var loadDataWithoutLA = function() {
  setTimeout(function() {renderNewCSVData('SansLA.csv',"Total Population total population of area, in thousands","Public Supply population served by groundwater, in thousands", "Total Population total population of area, in thousands","Public Supply population served by groundwater, in thousands","Public Supply total population served, in thousands", "county_nm","Public Supply total population served, in thousands"); hideLoading(); }, 5000);
};
var renderLACSVData = function(fileName, x, y, xLabel, yLabel, colorVar, toolText, radiusVar, xUnit, yUnit) {
  setTimeout(function() {renderNewCSVData('LA.csv',"Total Population total population of area, in thousands","Public Supply population served by groundwater, in thousands", "Total Population total population of area, in thousands","Public Supply population served by groundwater, in thousands","Public Supply total population served, in thousands", "county_nm","Public Supply total population served, in thousands"); hideLoading(); }, 5000);
};

var renderSFCSVData = function(fileName, x, y, xLabel, yLabel, colorVar, toolText, radiusVar, xUnit, yUnit) {
  setTimeout(function() {renderNewCSVData('SF.csv',"Total Population total population of area, in thousands","Public Supply population served by groundwater, in thousands", "Total Population total population of area, in thousands","Public Supply population served by groundwater, in thousands","Public Supply total population served, in thousands", "county_nm","Public Supply total population served, in thousands"); hideLoading(); }, 5000);
};
// renderNewCSVData('Cereal.csv', 'Calories', 'Protein (g)', 'Calories', 'Protein (g)', 'Sodium', 'Cereal Name', 'Calories', 'kcal');
var render1985CSVData = function(fileName, x, y, xLabel, yLabel, colorVar, toolText, radiusVar, xUnit, yUnit) {
  showLoading();
  setTimeout(function() {renderNewCSVData('1985.csv',"Total Population total population of area, in thousands","Public Supply population served by groundwater, in thousands", "Total Population total population of area, in thousands","Public Supply population served by groundwater, in thousands","Public Supply total population served, in thousands", "county_nm","Public Supply total population served, in thousands"); hideLoading(); }, 5000);
};

var render2010CSVData = function(fileName, x, y, xLabel, yLabel, colorVar, toolText, radiusVar, xUnit, yUnit) {
  showLoading();
  setTimeout(function() {renderNewCSVData('2010.csv',"Total Population total population of area, in thousands","Public Supply population served by groundwater, in thousands", "Total Population total population of area, in thousands","Public Supply population served by groundwater, in thousands","Public Supply total population served, in thousands", "county_nm","Public Supply total population served, in thousands"); hideLoading(); }, 5000);
};

var renderAgricultureData = function(yVar) {
  showLoading();
  setTimeout(function() {renderNewCSVData('2010.csv',"Total Population total population of area, in thousands",yVar, "Total Population total population of area, in thousands",yVar,"Public Supply total population served, in thousands", "county_nm","Public Supply total population served, in thousands"); hideLoading(); }, 5000);
};

var renderCommercialData = function(yVar) {
  showLoading();
  setTimeout(function() {renderNewCSVData('2010.csv',"Total Population total population of area, in thousands",yVar, "Total Population total population of area, in thousands",yVar,"Public Supply total population served, in thousands", "county_nm","Public Supply total population served, in thousands"); hideLoading(); }, 5000);
};

var renderIndustryData = function(yVar) {
  showLoading();
  setTimeout(function() {renderNewCSVData('2010.csv',"Total Population total population of area, in thousands",yVar, "Total Population total population of area, in thousands",yVar,"Public Supply total population served, in thousands", "county_nm","Public Supply total population served, in thousands"); hideLoading(); }, 5000);
};

var renderPerCapitaData = function(yVar) {
  showLoading();
  setTimeout(function() {renderNewCSVData('2010.csv',"Total Population total population of area, in thousands",yVar, "Total Population total population of area, in thousands",yVar,"Public Supply total population served, in thousands", "county_nm","Public Supply total population served, in thousands"); hideLoading(); }, 5000);
};

var initialize = function() {
  setTimeout(function() {renderNewCSVData('waterUse.csv',"Total Population total population of area, in thousands","Public Supply population served by groundwater, in thousands", "Total Population total population of area, in thousands","Public Supply population served by groundwater, in thousands","Public Supply total population served, in thousands", "county_nm","Public Supply total population served, in thousands"); hideLoading(); }, 2000);
};

var uploadData= function(serverData) {
  setTimeout(function() {renderServerData(serverData); hideLoading(); }, 5000);
};

/*************************************
Initial Data Set Load
*************************************/
initialize();

