jQuery(document).ready(function($) {
    var width = 960,
        height = 1160;

    var projection = d3.geo.albers()
        .center([0, 55.4])
        .rotate([4.4, 0])
        .parallels([50, 60])
        .scale(6000)
        .translate([width / 2, height / 2])

    var path =
        d3.geo.path()
        .projection(projection);
    map = $('#map');
    var svg = d3.select("#map").append("svg")
        .attr("width", width)
        .attr("height", height);

    d3.json("maps.json", function(error, uk) {
        svg.append("path")
            .datum({
                type: "FeatureCollection",
                features: uk.features
            })
            .attr("d", path);
    });

});
