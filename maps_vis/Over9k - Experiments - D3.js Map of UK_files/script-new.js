jQuery(document).ready(function($) {
    (function() {

        var width = 999,
            height = 999,
            minArea = 1;

        var svg = d3.select("#map").append("svg")
            .attr("width", width)
            .attr("height", height);

        var area = d3.select("#area");

        var g = svg.append("g");

        var shape = svg.append("path");

        var projection = d3.geo.mercator()
            .scale(22000)
            .translate([700, 4550]);

        var path = d3.geo.path()
            .projection(null);

        var simplify = d3.simplify()
            .topology(true)
            .area(0)
            .projection(projection);

        d3.json("maps.json", function(uk) {

            var geography = simplify.project(uk);

            d3.select("#map h1").remove();

            redraw();

            area.on("change", function() {
                minArea = area.node().value;
                redraw();
            });

            function redraw() {
                shape.attr("d", path(simplify.area(minArea)(geography)));
            }

        });

    });


});
