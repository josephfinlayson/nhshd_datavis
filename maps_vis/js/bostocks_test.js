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

    svg = d3.select("#map").append("svg")
        .attr("width", width)
        .attr("height", height);

    rand = function() {
        return Math.floor(Math.random() * 100);
    }
    d3.json("maps_topo.json", function(error, uk) {
        this.uk = uk;
        svg.selectAll(".subunit")
            .data(topojson.feature(uk, uk.objects.maps).features)
            .enter()
            .append("path")
            .attr("class", function(d) {
                return "subunit " + d.id;
            }).text(function(d) {
                // console.log(d);
            }).attr('data-county', function(d) {
                // console.log(d.properties.NAME_2)
                return d.properties.NAME_2

            })
            .attr("d", path)
            .style('fill', function(d) {
                if (d.properties.NAME_1 === "England") {
                    console.log(d.properties.NAME_2)
                }
                return d3.rgb(rand(), rand(), rand())
            })
            .on("mouseover", function(d) {
                console.log(d.properties.NAME_2);
                $('#county').html(d.properties.NAME_2)
            })
            .on("mouseout", function(d) {
                console.log("path mouseout");
            })
            .on("mousemove", function(d) {
                console.log("path mouseout");
            })
            .on("touchmove", function(d) {
                console.log("path mouseout");
            })
            .on("click", function(d) {
                console.log("path click");
            });
    });




    // d3.json("maps.json", function(error, uk) {
    //     svg.append("path")
    //         .datum({
    //             type: "FeatureCollection",
    //             features: uk.features
    //         })//.forEach(function(a) {
    //             .attr("d", path);
    //         //})
    // });

});

// a.attr("class", function(d) {
//     console.log(d);
//     return "subunit " + d.id;
// })
