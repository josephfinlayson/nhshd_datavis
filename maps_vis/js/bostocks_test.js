jQuery(document).ready(function($) {
    var width = 960,
        height = 1160;

    var projection = d3.geo.albers()
        .center([0, 55.4])
        .rotate([4.4, 0])
        .parallels([50, 60])
        .scale(6000)
        .translate([width / 2, height / 2])
    vac_rates = [];
    var n = 0;

    data_redux = d3.tsv("data_redux", function(d) {
        // console.log(d);
        return {
            mapped_to_map: d.mapped_to_map, //   "Barking and Dagenham"
            time: d.time, //"Barking_Havering"
            y1998_mmr: d.y1998_mmr, //   "92"
            y1998_num: d.y1998_num, //   "4746"
            y1999_mmr: d.y1999_mmr, //   "95"
            y1999_num: d.y1999_num, //   "4876"
            y2000_mmr: d.y1998_mmr, //   "94"
            y2000_num: d.y2000_num, //   "4899"
            y2001_mmr: d.y2001_mmr, //   "94"
            y2001_num: d.y2001_num //  "4917"
        };
    }, function(err, rows) {
        console.log(rows);
        vac_rates = rows;
        d3.json("maps_topo.json", function(error, uk) {
            var filtered = [];
            to_filter = svg.selectAll(".subunit").data(topojson.feature(uk, uk.objects.maps).features);
            this.uk = uk;
            svg.selectAll(".subunit")

            to_filter
            // filter(function(index) {
            //     console.log(index)
            // })
            // // .data(topojson.feature(uk, uk.objects.maps).features)
            .enter().append('path')
                .filter(function(d) {
                    // console.log(d);
                    if (d.properties.NAME_1 === "England") {
                        return true;
                    }
                }).attr('data-deaths', function(d) {
                    rows.forEach(function(row) {
                        if (d.properties.NAME_2 == row.mapped_to_map) {
                            // console.log("asdsa");
                            return row.y2000_mmr;
                        }
                    })
                })
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
                    if (d.properties.NAME_1 !== "England") {
                        return d3.rgb(255, 255, 255);
                    }
                    return d3.rgb(rand(), rand(), rand())
                }).style('path', function(d) {
                    if (d.properties.NAME_1 !== "England") {
                        return d3.rgb(255, 255, 255);
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
    })

    // data_redux = d3.tsv.parse(data_redux);

    // function(error, d) {
    //     // console.log

    // });

    //         // // data.forEach(function(d) {
    //         //         d.geog_region = d.geog_region;
    //         //         d[97_98_number_children] += d[97_98_number_children];
    //         //     });
    //     },
    //     function(error, rows) {
    //         console.log(rows);
    //         console.log(error);
    //         console.log("error");


    //         console.log("rows");

    //         vac_rates[n] = rows
    //         n++

    //     }
    // );

    var path =
        d3.geo.path()
        .projection(projection);

    svg = d3.select("#map").append("svg")
        .attr("width", width)
        .attr("height", height);

    rand = function() {
        return Math.floor(Math.random() * 100);
    }





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
