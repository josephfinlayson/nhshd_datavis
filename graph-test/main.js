/*global d3 console */
/*jslint es5:true indent:4 */

window.onload = function () {
    console.log('foo');
    var margin = {top: 40, right: 20, bottom: 30, left: 100};
    var width = 960 - margin.left - margin.right;
    var height = 500 - margin.top - margin.bottom;

    var formatPercent = d3.format(".0%");

    // geog mapping
    var x = d3.scale.ordinal()
        .rangeRoundBands([0, width], 0.1);

    var y = d3.scale.linear()
        .range([height, 0]);

    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom");

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left")
        .tickFormat(formatPercent);

    var svg = d3.select("body").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    d3.tsv("data_redux", function (error, data) {
        x.domain(data.map(function (d) { return d['97_98_mmr']; }));
        y.domain(data.map(function (d) { return d['97_98_number_children']; }));

        svg.append("g")
          .attr("class", "x axis")
          .attr("transform", "translate(0," + height + ")")
          .call(xAxis);

        svg.append("g")
          .attr("class", "y axis")
          .call(yAxis)
        .append("text")
          .attr("transform", "rotate(-90)")
          .attr("y", 6)
          .attr("dy", ".71em")
          .style("text-anchor", "end")
          .text("HerpDerp");

        svg.selectAll(".bar")
          .data(data)
        .enter().append("rect")
          .attr("class", "bar")
          // .attr("x", function (d) { return x(d.letter); })
          // .attr("width", x.rangeBand())
          // .attr("y", function (d) { return y(d.frequency); })
          // .attr("height", function (d) { return height - y(d.frequency); });
          .attr("x", 10)
          .attr("width", 10)
          .attr("y", 100)
          .attr("height", 100);
    });
};
