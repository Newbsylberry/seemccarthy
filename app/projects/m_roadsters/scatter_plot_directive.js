angular.module('seemccarthyApp')
  .directive('mRoadsterScatterPlot', function () {
  // constants
    var margin = {top: 20, right: 20, bottom: 30, left: 40},
      width = 900 - margin.left - margin.right,
      height = 300;
    var color = d3.interpolateRgb("#f77", "#77f");

  return {
    restrict: 'E',
    scope: {
      roadsters: '='
    },
    link: function (scope, element, attrs) {
      // set up initial svg object
      var svg = d3.select(element[0])
        .append("svg")
        .attr("width", width)
        .attr("class", "roadster_graph")
        .attr("height", height);
      var xValue = function(d) { return d.mileage;}, // data -> value
        xScale = d3.scale.linear().range([50, width]), // value -> display
        xMap = function(d) { return xScale(xValue(d));}, // data -> display
        xAxis = d3.svg.axis().scale(xScale).orient("bottom");

      var tooltip = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);

// setup y
      var yValue = function(d) { return d.price;}, // data -> value
        yScale = d3.scale.linear().range([height, 0]), // value -> display
        yMap = function(d) { return yScale(yValue(d));}, // data -> display
        yAxis = d3.svg.axis().scale(yScale).orient("left");

// setup fill color
      var cValue = function(d) { return d.year;},
        color = d3.scale.category10();

      var dispatch = d3.dispatch('unhighlightAll','toggleSingle')



      scope.$watch('roadsters', function (newVal, oldVal) {
        if (!newVal) {
          return;
        }

        svg.selectAll('*').remove();

        angular.forEach(newVal, function(roadster){
          xScale.domain([d3.min(newVal, xValue)-1, d3.max(newVal, xValue)+1]);
          yScale.domain([d3.min(newVal, yValue)-1, d3.max(newVal, yValue)+1]);

          // draw dots
          svg.selectAll(".dot")
            .data(newVal)
            .enter().append("circle")
            .attr("class", "dot")
            .attr("r", 5)
            .attr("cx", xMap)
            .attr("cy", yMap)
            .style("fill", function(d) { return color(cValue(d));})
            .on("click", function(d) {
              tooltip.transition()
                .duration(200)
                .style("opacity", .9);
              tooltip.html('<a target="_blank" href=' + roadster.listing_url + '>' + d["year"] + "</a>" + "<br/>" + xValue(d) + " miles"
                  + "<br/>" + "$" + yValue(d))
                .style("left", (d3.event.pageX + 5) + "px")
                .style("top", (d3.event.pageY - 28) + "px");
            })
            //.on("mouseout", function(d) {
            //  tooltip.transition()
            //    .duration(500)
            //    .style("opacity", 0);
            //});
        })

        // x-axis
        svg.append("g")
          .attr("class", "x_axis")
          .attr("transform", "translate(0," + 300  + ")")
          .call(xAxis)
          .append("text")
          .attr("class", "label")
          .attr("x", width)
          .attr("y", -6)
          .style("text-anchor", "end")
          .text("Mileage");

        // y-axis
        svg.append("g")
          .attr("class", "y_axis")
          .call(yAxis)
          .append("text")
          .attr("class", "label")
          .attr("transform", "rotate(-90)")
          .attr("y", 6)
          .attr("dy", ".71em")
          .style("text-anchor", "end")
          .text("Price");
        // setup x

// draw legend
        var legend = svg.selectAll(".legend")
          .data(color.domain())
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
          .text(function(d) { console.log(d); return d;})

      });
    }
  }
});
